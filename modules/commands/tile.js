module.exports.config = {
    name: "tile", //tỉ lệ hợp nhau
    version: "1.0.2",
    hasPermssion: 2,
    credits: "⚡️D-Jukie",
    description: "Xem tỉ lệ hợp đôi giữa 2 người",
    commandCategory: "Game",
    usages: "[tag1] [tag2]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    
    var mentions = Object.keys(event.mentions);
    if (mentions.length < 2) return api.sendMessage("Cần phải tag 2 người bạn muốn xem tỉ lệ hợp nhau", event.threadID);

    var mention1 = mentions[0];
    var mention2 = mentions[1];

    var name1 = (await Users.getData(mention1)).name;
    var name2 = (await Users.getData(mention2)).name;
    
    var tle = Math.floor(Math.random() * 101);

    var arraytag = [];
    arraytag.push({id: mention1, tag: name1});
    arraytag.push({id: mention2, tag: name2});

    let avatar1 = (await axios.get(`https://graph.facebook.com/${mention1}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt1.png", Buffer.from(avatar1, "utf-8"));

    let avatar2 = (await axios.get(`https://graph.facebook.com/${mention2}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(avatar2, "utf-8"));

    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + "/cache/avt1.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

    var msg = {
        body: `⚡️𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗼̛̣𝗽 𝘆𝗲̂𝘂 𝗴𝗶𝘂̛̃𝗮 ${name1} 𝘃𝗮̀ ${name2} 𝗹𝗮̀ ${tle}% 🥰`,
        mentions: arraytag,
        attachment: imglove
    };

    return api.sendMessage(msg, event.threadID, event.messageID);
}