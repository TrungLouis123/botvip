module.exports.config = {
  name: "ai",
  version: "4.0.0",
  hasPermssion: 0,
  credits: "Fumio & Dgk ",
  description: "GPT4",
  commandCategory: "Người dùng",
  usages: "[Script]",
  cooldowns: 5,
  usePrefix: true,
};

const axios = require("axios");

async function chat(prompt) {
  try {
    const response = await axios.get(`https://api.hamanhhung.site/ai/gemini?prompt=${encodeURIComponent(prompt)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching response:", error);
    throw error;
  }
}

module.exports.run = async function ({
  api,
  event: e,
  args,
}) {
  try {
    const query =
      e.type === "message_reply"
        ? args.join(" ") + ' "' + e.messageReply.body + '"'
        : args.join(" ");

    const response = await chat(query);
    const result = response.text;  // Lấy phần "text" từ JSON trả về

    api.sendMessage(
      result,
      e.threadID,
      (err, res) => {
        if (!err) {
          global.client.handleReply.push({
            name: exports.config.name,
            messageID: res.messageID,
            messages: [{ role: "user", content: query }, { role: "assistant", content: result }]
          });
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports.handleReply = async function (o) {
  try {
    const messages = o.handleReply.messages;
    const userMessage = o.event.body;
    messages.push({ role: "user", content: userMessage });

    const response = await chat(userMessage);
    const result = response.text;  // Lấy phần "text" từ JSON trả về

    o.api.sendMessage(
      result,
      o.event.threadID,
      (err, res) => {
        if (!err) {
          messages.push({ role: "assistant", content: result });
          global.client.handleReply.push({
            name: exports.config.name,
            messageID: res.messageID,
            messages: messages
          });
        }
      },
      o.event.messageID
    );
  } catch (error) {
    console.error("Error:", error);
  }
};