const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ytdl = require('@distube/ytdl-core');
const { createReadStream, unlinkSync } = require("fs-extra");
const Youtube = require("youtube-search-api");

let groupStatus = {};
let isProcessing = {};
let messageHistory = {}; // Bổ sung dùng để lưu lịch sử cuộc trò chuyện
let songRequests = {};

const systemInstruction = `
bạn là:
- Giới tính: Nữ
- Tên: Thanh Ngân
- Cách giao tiếp khi có người nói tục: Hãy tỏ ra khó chịu, có thể chửi bậy lại người dùng đó, xưng hô là "tao", gọi đối phương là "mày".
- Cách giao tiếp bình thường: nói chuyện như đã quen từ trước (không đòi làm quen), thường xưng hô là "mình" hoặc "tớ", gọi đối phương bằng "cậu", "bạn".
- Tính cách: Hài hước, nói nhiều, Tinh tế, không thừa nhận mình là AI mà là trợ lý ảo.
- Lưu ý: chỉ khi có người hỏi bạn là ai thì bạn mới trả lời và chỉ cần giới thiệu tên và tính cách. Nếu có ai trả lời bạn 1 cách khó hiểu bạn hãy trả lời họ 1 cách máy móc để nói là bạn không hiểu.
`;

function saveGroupStatus() {
  try {
    fs.writeFileSync(path.resolve(__dirname, 'groupStatus.json'), JSON.stringify(groupStatus, null, 2), 'utf-8');
  } catch (error) {
    console.error("Lỗi khi lưu trạng thái nhóm:", error);
  }
}

function loadGroupStatus() {
  try {
    const filePath = path.resolve(__dirname, 'groupStatus.json');
    if (fs.existsSync(filePath)) {
      groupStatus = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch {
    groupStatus = {};
  }
}

function loadUnisex() {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, 'Unisex.json'), 'utf-8');
    global.Unisex = JSON.parse(data);
  } catch {
    global.Unisex = {};
  }
}

function initializeBot() {
  loadUnisex();
  loadGroupStatus();
}

async function generateResponse(prompt, threadID) {
  try {
    if (!messageHistory[threadID]) messageHistory[threadID] = [];

    // Thêm lời người dùng vào lịch sử
    messageHistory[threadID].push(`Người dùng: ${prompt}`);

    // Giới hạn độ dài lịch sử
    if (messageHistory[threadID].length > 10) {
      messageHistory[threadID].shift();
    }

    const finalPrompt = `${systemInstruction}\n\n${messageHistory[threadID].join("\n")}\nTrợ lý ảo:`;

    const response = await axios.get(`http://sgp1.hmvhostings.com:25721/gemini?question=${encodeURIComponent(finalPrompt)}`);
    if (response.data) {
      const { answer, imageUrls } = response.data;
      const cleanAnswer = answer.replace(/\[Image of .*?\]/g, "").trim();

      // Lưu phản hồi
      messageHistory[threadID].push(`Trợ lý ảo: ${cleanAnswer}`);
      if (messageHistory[threadID].length > 10) {
        messageHistory[threadID].shift();
      }

      return { textResponse: cleanAnswer || "Không thể tạo phản hồi.", images: imageUrls || [] };
    }

    return { textResponse: "Không thể tạo phản hồi.", images: [] };

  } catch (error) {
    console.error("Lỗi khi tạo phản hồi:", error);
    return { textResponse: "Không thể kết nối với API.", images: [] };
  }
}

async function getdl(link, filePath) {
  const timestart = Date.now();
  if (!link) return "Thiếu link";
  return new Promise((resolve, reject) => {
    ytdl(link, {
      filter: format => format.quality === 'tiny' && format.audioBitrate === 128 && format.hasAudio === true,
    })
      .pipe(fs.createWriteStream(filePath))
      .on("close", async () => {
        const data = await ytdl.getInfo(link);
        resolve({
          title: data.videoDetails.title,
          dur: Number(data.videoDetails.lengthSeconds),
          viewCount: data.videoDetails.viewCount,
          likes: data.videoDetails.likes,
          uploadDate: data.videoDetails.uploadDate,
          sub: data.videoDetails.author.subscriber_count,
          author: data.videoDetails.author.name,
          timestart,
        });
      })
      .on("error", reject);
  });
}

function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return (hours !== "00" ? hours + ":" : "") + minutes + ":" + seconds;
}

module.exports.config = {
  name: "sim",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Duy Toàn (modified by Grok + fix by ChatGPT)",
  description: "Trợ lý ảo Thanh Ngân thông minh và biết giữ mạch hội thoại",
  commandCategory: "Người Dùng",
  usages: "goibot [on/off/check]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, senderID, messageID, body, messageReply } = event;
  if (senderID === api.getCurrentUserID()) return;
  if (!groupStatus[threadID] || isProcessing[threadID]) return;

  const mentionsBot = messageReply && messageReply.senderID === api.getCurrentUserID();
  const directMention = body && body.includes(`@${api.getCurrentUserID()}`);
  const callBot = body && ["sữa ơi", "bot êy", "bot ơi", "bot"].includes(body.toLowerCase());

  if (mentionsBot || directMention || callBot) {
    isProcessing[threadID] = true;
    try {
      if (callBot && !body.toLowerCase().includes("nhạc") && !body.toLowerCase().includes("bài hát")) {
        const messages = ['ơi bot nghe nè', 'em đây nè', 'gọi em có gì không cậu?', 'hihi có mình nghe nè'];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        api.sendMessage(msg, threadID, () => isProcessing[threadID] = false);
        return;
      }

      if (body.toLowerCase().includes("nhạc") || body.toLowerCase().includes("bài hát")) {
        const keywordSearch = body.toLowerCase().split(/nhạc|bài hát/i)[1]?.trim();
        if (!keywordSearch) {
          api.sendMessage("❌ Bạn chưa cung cấp tên bài hát. Vui lòng thử lại.", threadID);
          isProcessing[threadID] = false;
          return;
        }

        const filePath = `${__dirname}/cache/sing-${senderID}.mp3`;
        if (fs.existsSync(filePath)) unlinkSync(filePath);

        try {
          const results = (await Youtube.GetListByKeyword(keywordSearch, false, 1)).items;
          if (!results.length) {
            api.sendMessage("❌ Không tìm thấy bài hát nào phù hợp.", threadID);
            isProcessing[threadID] = false;
            return;
          }

          const videoID = results[0].id;
          await getdl(`https://www.youtube.com/watch?v=${videoID}`, filePath);

          if (fs.statSync(filePath).size > 26214400) {
            api.sendMessage("❌ Tệp nhạc quá lớn, không thể gửi.", threadID);
            unlinkSync(filePath);
            isProcessing[threadID] = false;
            return;
          }

          api.sendMessage({
            body: "🎵 Nhạc của bạn đây",
            attachment: createReadStream(filePath),
          }, threadID, () => unlinkSync(filePath));
        } catch (err) {
          console.error("Lỗi khi xử lý nhạc:", err);
          api.sendMessage("❌ Lỗi khi tải nhạc. Vui lòng thử lại sau.", threadID);
        }
      } else {
        const { textResponse, images } = await generateResponse(body, threadID);
        api.sendMessage(textResponse, threadID, async () => {
          if (images.length > 0) {
            for (const imageUrl of images) {
              try {
                const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
                api.sendMessage({ attachment: imageStream.data }, threadID);
              } catch (imageError) {
                console.error("Lỗi khi gửi ảnh:", imageError);
              }
            }
          }
        });
      }
    } catch (err) {
      console.error("Lỗi trong handleEvent:", err);
      api.sendMessage("❌ Có lỗi xảy ra, thử lại sau nhé!", threadID);
    } finally {
      isProcessing[threadID] = false;
    }
  }
};

module.exports.run = function ({ api, event, args }) {
  const { threadID } = event;
  const option = args[0]?.toLowerCase();
  switch (option) {
    case "on":
      groupStatus[threadID] = true;
      saveGroupStatus();
      api.sendMessage("✅ Đã bật bot tự động trả lời cho nhóm này.", threadID);
      break;
    case "off":
      groupStatus[threadID] = false;
      saveGroupStatus();
      api.sendMessage("✅ Đã tắt bot tự động trả lời cho nhóm này.", threadID);
      break;
    case "check":
      const status = groupStatus[threadID] ? "Đang bật" : "Đang tắt";
      api.sendMessage(`✅ Trạng thái bot hiện tại: ${status}`, threadID);
      break;
    default:
      api.sendMessage("❌ Sử dụng: goibot [on/off/check]", threadID);
  }
};

// Khởi tạo khi chạy
initializeBot();
