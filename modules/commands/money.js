module.exports.config = {
  name: "money",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Niio-team (Vtuan)", 
  Rent: 2,
  description: "Kiểm tra tiền",
commandCategory: "Tiền/Kiếm Tiền",
  cooldowns: 5,
  envConfig: {
      cooldownTime: 1800000
  }
};

function Number(number) {
  let strNumber = number.toString();
  let parts = strNumber.split('.');
  let int = parts[0];
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(int)) {
      int = int.replace(pattern, '$1,$2');
  }
  return int + decimalPart;
}

module.exports.run = async ({ event, api, Currencies, Users }) => {
  const { messageReply, mentions, threadID, messageID, senderID } = event;
  const uid = messageReply?.senderID || (mentions && Object.keys(mentions).length > 0 ? Object.keys(mentions)[0] : senderID);
  api.sendMessage(`Tên: ${(await Users.getData(uid)).name}\nSố tiền đang có: ${Number((await Currencies.getData(uid)).money)} VNĐ`,threadID)
}