module.exports.config = {
	name: "getlink",
	version: "1.0.4",
	hasPermssion: 0,
	credits: "Mirai Team và bố khánh",
	description: "Lấy url download từ video, audio và ảnh gửi từ nhóm, hoặc lấy link Facebook.",
	commandCategory: "Tiện ích",
	usages: "getLink [fb]",
	cooldowns: 5,
};

module.exports.languages = {
	"vi": {
		"invaidFormat": "❌ Tin nhắn bạn phản hồi phải là một audio, video hoặc ảnh nào đó",
		"fbLink": "🔗 Liên kết Facebook: "
	},
	"en": {
		"invaidFormat": "❌ Your need reply a message have contain an audio, video or picture",
		"fbLink": "🔗 Facebook link: "
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
	const axios = require('axios');
	let fbLink = `https://www.facebook.com/profile.php?id=${event.senderID}`;

	// Nếu có đối số 'fb' thì trả về link Facebook
	if (args[0] && args[0].toLowerCase() === "fb") {
		return api.sendMessage(fbLink, event.threadID, event.messageID);
	}

	// Nếu là tin nhắn trả lời
	if (event.type === "message_reply") {
		const uid = event.messageReply.senderID;
		fbLink = `https://www.facebook.com/profile.php?id=${uid}`;
		
		// Kiểm tra các tệp đính kèm trong tin nhắn trả lời
		if (!event.messageReply.attachments || event.messageReply.attachments.length === 0) {
			return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
		}

		if (event.messageReply.attachments.length > 1) {
			return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
		}

		const attachment = event.messageReply.attachments[0];

		// Trả về link tệp đính kèm nếu là video, audio hoặc ảnh
		if (["video", "audio", "photo"].includes(attachment.type)) {
			return api.sendMessage(attachment.url, event.threadID, event.messageID);
		}

		return api.sendMessage(getText("invaidFormat"), event.threadID, event.messageID);
	}

	// Nếu không có đối số và không phải tin nhắn trả lời
	if (!args[0]) {
		return api.sendMessage(fbLink, event.threadID, event.messageID);
	} else {
		if (args[0].indexOf(".com/") !== -1) {
			const res_ID = await api.getUID(args[0]);
			return api.sendMessage(`${res_ID}`, event.threadID, event.messageID);
		} else {
			for (let mentionID of Object.keys(event.mentions)) {
				const mentionName = event.mentions[mentionID].replace('@', '');
				const profileLink = `https://www.facebook.com/profile.php?id=${mentionID}`;
				api.sendMessage(`${mentionName}\n→ Link: ${profileLink}`, event.threadID);
			}
			return;
		}
	}
}