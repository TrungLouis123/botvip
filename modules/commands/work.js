exports.config = {
  name: "work",
  version: "0.0.9",
    hasPermssion: 0,
    credits: "Hải harin", 
    description: "Làm việc để có tiền, có làm thì mới có ăn",
    commandCategory: "Game",
    usages: "[prefix]work",
  countdown: 5,
  envConfig: { cooldownTime: 10 },
  usePrefix: true 
};
exports.run = async function (o){
  const { threadID: t, messageID: m, senderID: s } = o.event;
  const send = (msg, callback) => o.api.sendMessage(msg, t, callback, m) 
  let name = await o.Users.getNameUser(s)
  let data = (await o.Threads.getData(t)).data || {}
  let cooldown = this.config.envConfig.cooldownTime
  if (data["workTime"] && data["workTime"][s] && data["workTime"][s] != "undefined" && cooldown - (Date.now() - data["workTime"][s]) > 0) {
  var time = cooldown - (Date.now() - data["workTime"][s]),
  hours = Math.floor((time / (60000 * 60000 ))/24),
  minutes = Math.floor(time / 60000),
  seconds = ((time % 60000) / 1000).toFixed(0); 
  send(`[ CÔNG CỤ KIẾM TIỀN ]
━━━━━━━━━━━━━━━━

📌 Bạn đã hết lượt dùng, hãy quay lại sau ${hours} giờ ${minutes} phút ${seconds} giây`)
  } else {
  send({ body: `[ CÔNG CỤ KIẾM TIỀN ]
━━━━━━━━━━━━━━━━

[ 1 | 🎣 ] Câu cá
[ 2 | 🦅 ] Bắn chim
[ 3 | 🏹 ] Săn thú 
[ 4 | 🍳 ] Nấu ăn
[ 5 | 🪓 ] Chặt cây
[ 6 | 🌾 ] Trồng cây
[ 7 | ⛏️ ] Đào đá
[ 8 | ⚓ ] Kéo thùng

📌Thả cảm xúc or reply tương ứng vào tin nhắn này với những công việc trên để kiếm tiền`, attachment: (await require("axios").get("https://i.imgur.com/3PlJX3a.png", { responseType: "stream"})).data }, (e, i) => {
  global.client.handleReply.push({
  name: this.config.name,
  messageID: i.messageID,
  author: s,
  name_author: name
  }),
 global.client.handleReaction.push({
  name: this.config.name,
  messageID: i.messageID,
  author: s,
  name_author: name
  })
  })
  }
  }
exports.handleReaction = async function (o){
  const { threadID: t, messageID: m, userID: s, reaction: r } = o.event;
  const h = o.handleReaction
  o.api.unsendMessage(h.messageID)
  let data = (await o.Threads.getData(t)).data
  const send = (msg, callback) => o.api.sendMessage(msg, t, callback, m)
  if (s != h.author) return send("❎ Bạn không phải người dùng lệnh");
  switch (r) {
  case "🎣": {   
  var rdca = ['Cá lóc', 'Cá trê', 'Cá hồi', 'Cá diếc', 'Cá trắm', 'Cá kèo', 'Cá rô đồng','Cá mè','Cá hường', 'Cá ngát', 'Cá tra', 'Cá tai tượng','Mực lá','Mực ống','Mực sim','Mực mai','Mực trứng','Tôm sú','Tôm lớt','Tôm thẻ','Tôm hùm','Tôm sắt','Tôm đất','Tôm he'];
  var linkMap = {
        'Cá lóc': 'https://i.imgur.com/9n9TTuw.png',
        'Cá trê': 'https://i.imgur.com/WqciWwv.png',
        'Cá hồi': 'https://i.imgur.com/ib1VHM2.png',
        'Cá diếc': 'https://i.imgur.com/NGsRAt3.png',
        'Cá trắm': 'https://i.imgur.com/E3Wkvsc.png',
        'Cá kèo': 'https://i.imgur.com/etC2pwp.png',
        'Cá rô đồng': 'https://i.imgur.com/N4L2r1h.png',
        'Cá mè': 'https://i.imgur.com/wOCt3is.png',
        'Cá hường': 'https://i.imgur.com/HcKxJca.png',
        'Cá ngát': 'https://i.imgur.com/P2hCxpl.png',
        'Cá tra': 'https://i.imgur.com/fNFszDV.png',
        'Cá tai tượng': 'https://i.imgur.com/8Vig5kM.png',
        'Mực lá': 'https://i.imgur.com/A8AKlME.png',
        'Mực ống': 'https://i.imgur.com/qtO7hdJ.png',
        'Mực sim': 'https://i.imgur.com/Kq42m1p.png',
        'Mực mai': 'https://i.imgur.com/Fvzpfxd.png',
        'Mực trứng': 'https://i.imgur.com/qUVNMnu.png',
        'Tôm sú': 'https://i.imgur.com/KBNW3KT.png',
        'Tôm lớt': 'https://i.imgur.com/itRx8hZ.png',
        'Tôm thẻ': 'https://i.imgur.com/iuPuj6q.png',
        'Tôm hùm': 'https://i.imgur.com/53VNywr.png',
        'Tôm sắt': 'https://i.imgur.com/zVR8eFl.png',
        'Tôm đất': 'https://i.imgur.com/vSLyjG4.png',
        'Tôm he': 'https://i.imgur.com/If7keuk.png'
  };
  var work1 = rdca[Math.floor(Math.random() * rdca.length)];
  var link = linkMap[work1];
  var coins1 = Math.floor(Math.random() * 10000000000000000000000000000) + 200;
  await o.Currencies.increaseMoney(h.author, coins1);
  var image = ['https://i.imgur.com/gMRBv7u.gif', 'https://i.imgur.com/ANpbrx4.gif']
  send({ body: 'Đang Câu Cá...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã câu dính ${work1} và thu về được ${coins1}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "🦅": {
  var rdchim = ['Chim vàng anh','Chim sơn ca','Chim chìa vôi','Chim chào mào','chim cánh cụt','Chim yến phụng','Chim khướu','Chim họa mi','Chim công','Chim sáo','Chim vẹt cảnh','Chim cu gáy','Chim phượng hoàng đất','Chim ói cá','Chim sả rừng','Chim bạc má','Chim hồng hạc','Chim thiên đường','Chim giẻ cùi xanh','Chim kim tước','Chim vành khuyên','Chim trĩ vàng','Chim sẻ đất màu','Chim uyên ương','Chim ruồi'];
  var linkMap = {
  'Chim vàng anh': 'https://i.imgur.com/IODFTZT.png',
  'Chim sơn ca': 'https://i.imgur.com/w18NZ0j.png',
  'Chim chìa vôi': 'https://i.imgur.com/F9t6wIM.png',
  'Chim chào mào': 'https://i.imgur.com/hAjDBb4.png',
  'chim cánh cụt': 'https://i.imgur.com/nYZAo1n.png',
  'Chim yến phụng': 'https://i.imgur.com/w1JpOnb.png',
  'Chim khướu': 'https://i.imgur.com/zq6Uh8i.png',
  'Chim họa mi': 'https://i.imgur.com/2HrqZMw.png',
  'Chim công': 'https://i.imgur.com/KwiSalh.png',
  'Chim sáo': 'https://i.imgur.com/kQHM2QU.png',
  'Chim vẹt cảnh': 'https://i.imgur.com/AJfELUD.png',
  'Chim cu gáy': 'https://i.imgur.com/IT0zskz.png',
  'Chim phượng hoàng đất': 'https://i.imgur.com/8v1reJo.png',
  'Chim ói cá': 'https://i.imgur.com/ZUajQh3.png',
  'Chim sả rừng': 'https://i.imgur.com/kkzif3R.png',
  'Chim bạc má': 'https://i.imgur.com/kySrcN8.png',
  'Chim hồng hạc': 'https://i.imgur.com/8KgmIkT.png',
  'Chim thiên đường': 'https://i.imgur.com/Xit2eQw.png',
  'Chim giẻ cùi xanh': 'https://i.imgur.com/TKFlqDB.png',
  'Chim kim tước': 'https://i.imgur.com/LibmANo.png',
  'Chim vành khuyên': 'https://i.imgur.com/Uvc8Kes.png',
  'Chim trĩ vàng': 'https://i.imgur.com/U29bnyV.png',
  'Chim sẻ đất màu': 'https://i.imgur.com/R21fpw9.png',
  'Chim uyên ương': 'https://i.imgur.com/bErM6kt.png',
  'Chim ruồi': 'https://i.imgur.com/bjI60RY.png'
  };
  var work2 = rdchim[Math.floor(Math.random() * rdchim.length)];
  var link = linkMap[work2];
  var coins2 = Math.floor(Math.random() * 10000000000000000000000000000) + 100;
  await o.Currencies.increaseMoney(h.author, coins2);
  var image = ["https://i.imgur.com/xRsawOT.gif", "https://i.imgur.com/72o6Mur.gif"]
  send({ body: 'Đang Bắn Chim...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã bắn dính ${work2} và nhận thêm được ${coins2}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
} 
  break;
  case "🏹": {
  var rdst = ['Hổ','Sư tử','Voi','Hươu','Khỉ','Gấu','Hải cẩu', 'Hải âu', 'Chó', 'Mèo', 'Lợn', 'Gà','Chồn','Dúi'];
  var linkMap = {
  'Hổ': 'https://i.imgur.com/HoheUlc.png',
  'Sư tử': 'https://i.imgur.com/CUWGb3y.png',
  'Voi': 'https://i.imgur.com/hxKcKKw.png',
  'Hươu': 'https://i.imgur.com/KW6qlDJ.png',
  'Khỉ': 'https://i.imgur.com/dIfRB8i.png',
  'Gấu': 'https://i.imgur.com/Vhi7U57.png',
  'Gấu nâu': 'https://i.imgur.com/rm1EPHp.jpeg',
  'Hải cẩu': 'https://i.imgur.com/f3qPRFx.jpeg',
  'Hải âu': 'https://i.imgur.com/esdBcdc.jpeg',
  'Chó': 'https://i.imgur.com/jSLrQju.jpeg',
  'Mèo': 'https://i.imgur.com/D3xGABL.jpeg',
  'Lợn': 'https://i.imgur.com/Mi65tBI.jpeg',
  'Gà': 'https://i.imgur.com/zeZBOpo.jpeg',
  'Chồn': 'https://i.imgur.com/zdwr15i.jpeg',
  'Dúi': 'https://i.imgur.com/yGl4za2.jpeg'
  };
  var work3 = rdst[Math.floor(Math.random() * rdst.length)];
  var link = linkMap[work3];
  var coins3 = Math.floor(Math.random() * 10000000000000000000000000000) + 400;
  await o.Currencies.increaseMoney(h.author, coins3);
  var image = ["https://i.imgur.com/aKy5VGW.gif","https://i.imgur.com/naUMa61.gif","https://i.imgur.com/KUjTvpc.gif"]
  send({ body: 'Đang Săn Thú...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã săn được ${work3} và húp thêm được ${coins3}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "🍳": {
  var rdna = ['Phở','Chả cá','Bánh xèo','Rau muống','Nem rán/chả giò','Gỏi cuốn','Bún bò Huế','Gà nướng','Bánh cuốn','Pizza','Caesar salad','Hamburger bò phô mai','Khoai tây nghiền','Mỳ Ý sốt cà chua bò bằm - mì sốt spaghetti','Khoai tây đút lò','Bò hầm rau củ kiểu Pháp','Cá hồi sốt chanh dây'];
  var linkMap = {
  'Phở': 'https://i.imgur.com/uPYXvsq.png',
  'Chả cá': 'https://i.imgur.com/kO3xF0x.png',
  'Bánh xèo': 'https://i.imgur.com/NqO1eLY.png',
  'Rau muống': 'https://i.imgur.com/NHrlJpQ.jpeg',
  'Nem rán/chả giò': 'https://i.imgur.com/8kIUE7d.jpeg',
  'Gỏi cuốn': 'https://i.imgur.com/5vPbIQX.jpeg',
  'Bún bò Huế': 'https://i.imgur.com/WmsyFxP.jpeg',
  'Gà nướng': 'https://i.imgur.com/wap9yXx.jpeg',
  'Bánh cuốn': 'https://i.imgur.com/9uWffvI.png',
  'Pizza': 'https://i.imgur.com/DXCUkfH.jpeg',
  'Caesar salad': 'https://i.imgur.com/VYTcz1U.jpeg',
  'Hamburger bò phô mai': 'https://i.imgur.com/rJLL2xy.jpeg',
  'Khoai tây nghiền': 'https://i.imgur.com/qXXpmie.jpeg',
  'Mỳ Ý sốt cà chua bò bằm - mì sốt spaghetti': 'https://i.imgur.com/PhlIgh1.jpeg',
  'Khoai tây đút lò': 'https://i.imgur.com/YpVQM3H.jpeg',
  'Bò hầm rau củ kiểu Pháp': 'https://i.imgur.com/cRkmyUX.jpeg',
  'Cá hồi sốt chanh dây': 'https://i.imgur.com/BiTtiNO.jpeg'
  };
  var work4 = rdna[Math.floor(Math.random() * rdna.length)];
  var link = linkMap[work4];
  var coins4 = Math.floor(Math.random() * 10000000000000000000000000000) + 90;
  var image = "https://i.imgur.com/Tptoq8D.gif"
  send({ body: 'Đang Nấu Ăn...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã nấu được món ${work4} và nhận được ${coins4}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "🪓": {
  var rdcc = ['Gỗ sồi','Gỗ bạch dương','Gỗ keo','Gỗ vân sam','Gỗ lim','Gỗ sưa','Gỗ hương','Gỗ mun','Gỗ gụ','Gỗ trắc','Gỗ cẩm','Gỗ cẩm lai','Gỗ nghiến','Gỗ mít','Gỗ xoan đào'];
  var linkMap = {
  'Gỗ sồi': 'https://i.imgur.com/H8HXVwa.png',
  'Gỗ bạch dương': 'https://i.imgur.com/xw29rr9.png',
  'Gỗ keo': 'https://i.imgur.com/smfz1AY.png',
  'Gỗ vân sam': 'https://i.imgur.com/qWiVr6v.png',
  'Gỗ lim': 'https://i.imgur.com/K7Pd5eF.png',
  'Gỗ sưa': 'https://i.imgur.com/daiGbSc.png',
  'Gỗ hương': 'https://i.imgur.com/UlJGcnW.png',
  'Gỗ mun': 'https://i.imgur.com/1Sidihg.png',
  'Gỗ gụ': 'https://i.imgur.com/cTgBIzh.png',
  'Gỗ trắc': 'https://i.imgur.com/y8O8hqL.png',
  'Gỗ cẩm': 'https://i.imgur.com/G7kbTYu.png',
  'Gỗ cẩm lai': 'https://i.imgur.com/ihXPbsl.png',
  'Gỗ nghiến': 'https://i.imgur.com/b2DWVg5.png',
  'Gỗ mít': 'https://i.imgur.com/viKR8TG.png',
  'Gỗ xoan đào': 'https://i.imgur.com/AC8eush.png'
  };
  var work5 = rdcc[Math.floor(Math.random() * rdcc.length)];
  var link = linkMap[work5];
  var coins5 = Math.floor(Math.random() * 10000000000000000000000000000) + 500;
  await o.Currencies.increaseMoney(h.author, coins5);
  var image = ["https://i.imgur.com/706Rr8j.gif" , "https://i.imgur.com/EN15fDe.gif"]
  send({ body: 'Đang Chặt Cây...', attachment: (await require("axios").get(image[Math.floor(Math.random * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã chặt được ${work5} và bú thêm được ${coins5}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "🌾": {
  var rdtc = ['Cây lúa nước','Cây ngô','Cây khoai tây','Cây lúa mì','Cây sắn','Cây khế','Cây đại mạch','Cây khoai lang','Cây mía','Cây lạc','Cây đậu tương','Cây đậu xanh','Cây bông gòn','Cây vừng ( cây mè)','Cây thuốc lào/thuốc lá','Cây dứa (trái thơm)','Cây đu đủ','Cây cà chua', 'Cây cam', 'Cây quýt', 'Cây bưởi', 'Cây táo', 'Cây chôm chôm', 'Cây dưa hấu', 'Cây nhãn', 'Cây vải'];
  var linkMap = {
  'Cây mía': 'https://i.imgur.com/IaHFRhC.png',
  'Cây lạc': 'https://i.imgur.com/D46xKnp.png',
  'Cây đậu tương': 'https://i.imgur.com/dMnOCOi.png',
  'Cây đậu xanh': 'https://i.imgur.com/xi3OnHj.png',
  'Cây bông gòn': 'https://i.imgur.com/MHcQuwu.png',
  'Cây vừng ( cây mè)': 'https://i.imgur.com/xPoe97R.png',
  'Cây thuốc lào/thuốc lá': 'https://i.imgur.com/aAzpc64.png',
  'Cây dứa (trái thơm)': 'https://i.imgur.com/mZCJt7I.png',
  'Cây đu đủ': 'https://i.imgur.com/vacca7H.png',
  'Cây lúa nước': 'https://i.imgur.com/1uvraj4.png',
  'Cây ngô': 'https://i.imgur.com/8us4Zxb.png',
  'Cây khoai tây': 'https://i.imgur.com/Ld1VqaR.png',
  'Cây lúa mì': 'https://i.imgur.com/DycGgOY.png',
  'Cây sắn': 'https://i.imgur.com/c78qbES.png',
  'Cây khế': 'https://i.imgur.com/Y5GUGmV.png',
  'Cây đại mạch': 'https://i.imgur.com/JmNnwQC.png',
  'Cây khoai lang': 'https://i.imgur.com/pnyKcbF.png',
  'Cây cà chua': 'https://i.imgur.com/LCBH1rf.jpeg',
  'Cây cam': 'https://i.imgur.com/M9ZMwX2.jpeg',
  'Cây quýt': 'https://i.imgur.com/Dv9rA98.jpeg',
  'Cây bưởi': 'https://i.imgur.com/HJP06Ub.jpeg',
  'Cây táo': 'https://i.imgur.com/TSPTQaT.jpeg',
  'Cây chôm chôm': 'https://i.imgur.com/DKQa37x.jpeg',
  'Cây dưa hấu': 'https://i.imgur.com/SuB8ExQ.jpg',
  'Cây nhãn': 'https://i.imgur.com/XPwap6p.jpeg',
  'Cây vải': 'https://i.imgur.com/ViiNwUP.jpeg'
  };
  var work6 = rdtc[Math.floor(Math.random() * rdtc.length)];
  var link = linkMap[work6];
  var coins6 = Math.floor(Math.random() * 10000000000000000000000000000) + 1000;
  await o.Currencies.increaseMoney(h.author, coins6);
  var image = "https://i.imgur.com/HHBF6Yy.gif"
  send({ body: 'Đang Trồng Cây...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã trồng được ${work6} và bán được ${coins6}₫ và nhận vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "⛏️": {
  var rddd = ['Đồng', 'Chì', 'Vàng', 'Kẽm',' Sắt', 'Nhôm', 'Thiếc','Mangan','Đá vôi', 'Đất sét', 'Cát','Ngọc thạch anh','Kim cương','Ngọc lục bảo', 'Hồng ngọc','Đá mã não','Saphia'];
  var linkMap = {
  'Đồng': 'https://i.imgur.com/EghuDew.png',
  'Chì': 'https://i.imgur.com/SuHXtP1.png',
  'Vàng': 'https://i.imgur.com/cxTORIe.png',
  'Kẽm': 'https://i.imgur.com/MujYEyd.png',
  'Sắt': 'https://i.imgur.com/yD5IrG4.png',
  'Nhôm': 'https://i.imgur.com/NJcNYCX.png',
  'Thiếc': 'https://i.imgur.com/yInlgHh.png',
  'Mangan': 'https://i.imgur.com/uyGmRwE.png',
  'Đá vôi': 'https://i.imgur.com/WXaxHot.png',
  'Đất sét': 'https://i.imgur.com/Nlh30Lf.png',
  'Cát': 'https://i.imgur.com/DtOq5hX.png',
  'Ngọc thạch anh': 'https://i.imgur.com/oJoN0j7.png',
  'Kim cương': 'https://i.imgur.com/69QZHLQ.png',
  'Ngọc lục bảo': 'https://i.imgur.com/DJzj1EN.png',
  'Hồng ngọc': 'https://i.imgur.com/lsXUHeJ.png',
  'Đá mã não': 'https://i.imgur.com/bGcW9bN.png',
  'Saphia': 'https://i.imgur.com/JBOaVEW.png'
  };
  var work7 = rddd[Math.floor(Math.random() * rddd.length)];
  var link = linkMap[work7];
  var coins7 = Math.floor(Math.random() * 10000000000000000000000000000) + 420;
  await o.Currencies.increaseMoney(h.author, coins7);
  var image = "https://i.imgur.com/HHzSQSE.gif"
  send({ body: 'Đang Đào Đá...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã đào được ${work7} và bán nhận về được ${coins7}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  case "⚓": {
  var rdt = ["Thùng carton", "Thùng phi", "Thùng sơn", "Thùng nhựa", "Thùng gạo", "Thùng sắt", "Thùng bia", "Thùng nước", "Thùng nuôi cá", "Thùng rác", "Thùng dữ nhiệt", "Thùng xốp", "Thùng nước ngọt", "Thùng contender", "Thùng mì"];
  var linkMap = {
  "Thùng carton": "https://i.imgur.com/Rv3F13u.jpeg",
  "Thùng phi": "https://i.imgur.com/3XK7J4r.jpeg",
  "Thùng sơn": "https://i.imgur.com/9kQB6QF.jpeg",
  "Thùng nhựa": "https://i.imgur.com/JUcaHDq.jpeg",
  "Thùng gạo": "https://i.imgur.com/TxKZP6C.jpeg",
  "Thùng sắt": "https://i.imgur.com/HFPSKX0.jpeg",
  "Thùng bia": "https://i.imgur.com/yNymW9i.jpeg",
  "Thùng nước": "https://i.imgur.com/WVPFdYx.jpeg",
  "Thùng nuôi cá": "https://i.imgur.com/55Etztj.jpeg",
  "Thùng rác": "https://i.imgur.com/9AHLg26.jpeg",
  "Thùng dữ nhiệt": "https://i.imgur.com/R3Z8DWX.jpeg",
  "Thùng xốp": "https://i.imgur.com/8rjxtXU.jpeg",
  "Thùng nước ngọt": "https://i.imgur.com/hqDTCxA.jpeg",
  "Thùng contender": "https://i.imgur.com/TlkGrJ7.jpeg",
  "Thùng mì": "https://i.imgur.com/CJw9Sid.jpeg",
  }
  var work8 = rdt[Math.floor(Math.random() * rdt.length)];
  var link = linkMap[work8];
  var coins8 = Math.floor(Math.random() * 10000000000000000000000000000) + 500;
  await o.Currencies.increaseMoney(h.author, coins8);
  var image = "https://imgur.com/0eCG0xf.gif"
  send({ body: 'Đang Kéo thùng...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã kéo được ${work8} và bán nhận về được ${coins8}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  default: send("❎ Icon này không nằm trong danh sách")
  }
}
exports.handleReply = async function (o){
  const { threadID: t, messageID: m, senderID: s, body: b } = o.event;
  const h = o.handleReply
  o.api.unsendMessage(h.messageID)
  const send = (msg, callback) => o.api.sendMessage(msg, t, callback, m)
  let data = (await o.Threads.getData(t)).data
  if (s != h.author) return send("❎ Bạn không phải người dùng lệnh");
  switch (b) {
  case "1": {   
  var rdca = ['Cá lóc', 'Cá trê', 'Cá hồi', 'Cá diếc', 'Cá trắm', 'Cá kèo', 'Cá rô đồng','Cá mè','Cá hường', 'Cá ngát', 'Cá tra', 'Cá tai tượng','Mực lá','Mực ống','Mực sim','Mực mai','Mực trứng','Tôm sú','Tôm lớt','Tôm thẻ','Tôm hùm','Tôm sắt','Tôm đất','Tôm he'];
  var linkMap = {
        'Cá lóc': 'https://i.imgur.com/9n9TTuw.png',
        'Cá trê': 'https://i.imgur.com/WqciWwv.png',
        'Cá hồi': 'https://i.imgur.com/ib1VHM2.png',
        'Cá diếc': 'https://i.imgur.com/NGsRAt3.png',
        'Cá trắm': 'https://i.imgur.com/E3Wkvsc.png',
        'Cá kèo': 'https://i.imgur.com/etC2pwp.png',
        'Cá rô đồng': 'https://i.imgur.com/N4L2r1h.png',
        'Cá mè': 'https://i.imgur.com/wOCt3is.png',
        'Cá hường': 'https://i.imgur.com/HcKxJca.png',
        'Cá ngát': 'https://i.imgur.com/P2hCxpl.png',
        'Cá tra': 'https://i.imgur.com/fNFszDV.png',
        'Cá tai tượng': 'https://i.imgur.com/8Vig5kM.png',
        'Mực lá': 'https://i.imgur.com/A8AKlME.png',
        'Mực ống': 'https://i.imgur.com/qtO7hdJ.png',
        'Mực sim': 'https://i.imgur.com/Kq42m1p.png',
        'Mực mai': 'https://i.imgur.com/Fvzpfxd.png',
        'Mực trứng': 'https://i.imgur.com/qUVNMnu.png',
        'Tôm sú': 'https://i.imgur.com/KBNW3KT.png',
        'Tôm lớt': 'https://i.imgur.com/itRx8hZ.png',
        'Tôm thẻ': 'https://i.imgur.com/iuPuj6q.png',
        'Tôm hùm': 'https://i.imgur.com/53VNywr.png',
        'Tôm sắt': 'https://i.imgur.com/zVR8eFl.png',
        'Tôm đất': 'https://i.imgur.com/vSLyjG4.png',
        'Tôm he': 'https://i.imgur.com/If7keuk.png'
  };
  var work1 = rdca[Math.floor(Math.random() * rdca.length)];
  var link = linkMap[work1];
  var coins1 = Math.floor(Math.random() * 10000000000000000000000000000) + 200;
  await o.Currencies.increaseMoney(h.author, coins1);
  var image = ['https://i.imgur.com/gMRBv7u.gif', 'https://i.imgur.com/ANpbrx4.gif']
  send({ body: 'Đang Câu Cá...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã câu dính ${work1} và thu về được ${coins1}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "2": {
  var rdchim = ['Chim vàng anh','Chim sơn ca','Chim chìa vôi','Chim chào mào','chim cánh cụt','Chim yến phụng','Chim khướu','Chim họa mi','Chim công','Chim sáo','Chim vẹt cảnh','Chim cu gáy','Chim phượng hoàng đất','Chim ói cá','Chim sả rừng','Chim bạc má','Chim hồng hạc','Chim thiên đường','Chim giẻ cùi xanh','Chim kim tước','Chim vành khuyên','Chim trĩ vàng','Chim sẻ đất màu','Chim uyên ương','Chim ruồi'];
  var linkMap = {
  'Chim vàng anh': 'https://i.imgur.com/IODFTZT.png',
  'Chim sơn ca': 'https://i.imgur.com/w18NZ0j.png',
  'Chim chìa vôi': 'https://i.imgur.com/F9t6wIM.png',
  'Chim chào mào': 'https://i.imgur.com/hAjDBb4.png',
  'chim cánh cụt': 'https://i.imgur.com/nYZAo1n.png',
  'Chim yến phụng': 'https://i.imgur.com/w1JpOnb.png',
  'Chim khướu': 'https://i.imgur.com/zq6Uh8i.png',
  'Chim họa mi': 'https://i.imgur.com/2HrqZMw.png',
  'Chim công': 'https://i.imgur.com/KwiSalh.png',
  'Chim sáo': 'https://i.imgur.com/kQHM2QU.png',
  'Chim vẹt cảnh': 'https://i.imgur.com/AJfELUD.png',
  'Chim cu gáy': 'https://i.imgur.com/IT0zskz.png',
  'Chim phượng hoàng đất': 'https://i.imgur.com/8v1reJo.png',
  'Chim ói cá': 'https://i.imgur.com/ZUajQh3.png',
  'Chim sả rừng': 'https://i.imgur.com/kkzif3R.png',
  'Chim bạc má': 'https://i.imgur.com/kySrcN8.png',
  'Chim hồng hạc': 'https://i.imgur.com/8KgmIkT.png',
  'Chim thiên đường': 'https://i.imgur.com/Xit2eQw.png',
  'Chim giẻ cùi xanh': 'https://i.imgur.com/TKFlqDB.png',
  'Chim kim tước': 'https://i.imgur.com/LibmANo.png',
  'Chim vành khuyên': 'https://i.imgur.com/Uvc8Kes.png',
  'Chim trĩ vàng': 'https://i.imgur.com/U29bnyV.png',
  'Chim sẻ đất màu': 'https://i.imgur.com/R21fpw9.png',
  'Chim uyên ương': 'https://i.imgur.com/bErM6kt.png',
  'Chim ruồi': 'https://i.imgur.com/bjI60RY.png'
  };
  var work2 = rdchim[Math.floor(Math.random() * rdchim.length)];
  var link = linkMap[work2];
  var coins2 = Math.floor(Math.random() * 10000000000000000000000000000) + 100;
  await o.Currencies.increaseMoney(h.author, coins2);
  var image = ["https://i.imgur.com/xRsawOT.gif", "https://i.imgur.com/72o6Mur.gif"]
  send({ body: 'Đang Bắn Chim...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã bắn dính ${work2} và nhận thêm được ${coins2}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
} 
  break;
  case "3": {
  var rdst = ['Hổ','Sư tử','Voi','Hươu','Khỉ','Gấu','Hải cẩu', 'Hải âu', 'Chó', 'Mèo', 'Lợn', 'Gà','Chồn','Dúi'];
  var linkMap = {
  'Hổ': 'https://i.imgur.com/HoheUlc.png',
  'Sư tử': 'https://i.imgur.com/CUWGb3y.png',
  'Voi': 'https://i.imgur.com/hxKcKKw.png',
  'Hươu': 'https://i.imgur.com/KW6qlDJ.png',
  'Khỉ': 'https://i.imgur.com/dIfRB8i.png',
  'Gấu': 'https://i.imgur.com/Vhi7U57.png',
  'Gấu nâu': 'https://i.imgur.com/rm1EPHp.jpeg',
  'Hải cẩu': 'https://i.imgur.com/f3qPRFx.jpeg',
  'Hải âu': 'https://i.imgur.com/esdBcdc.jpeg',
  'Chó': 'https://i.imgur.com/jSLrQju.jpeg',
  'Mèo': 'https://i.imgur.com/D3xGABL.jpeg',
  'Lợn': 'https://i.imgur.com/Mi65tBI.jpeg',
  'Gà': 'https://i.imgur.com/zeZBOpo.jpeg',
  'Chồn': 'https://i.imgur.com/zdwr15i.jpeg',
  'Dúi': 'https://i.imgur.com/yGl4za2.jpeg'
  };
  var work3 = rdst[Math.floor(Math.random() * rdst.length)];
  var link = linkMap[work3];
  var coins3 = Math.floor(Math.random() * 10000000000000000000000000000) + 400;
  await o.Currencies.increaseMoney(h.author, coins3);
  var image = ["https://i.imgur.com/aKy5VGW.gif","https://i.imgur.com/naUMa61.gif","https://i.imgur.com/KUjTvpc.gif"]
  send({ body: 'Đang Săn Thú...', attachment: (await require("axios").get(image[Math.floor(Math.random() * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã săn được ${work3} và húp thêm được ${coins3}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "4": {
  var rdna = ['Phở','Chả cá','Bánh xèo','Rau muống','Nem rán/chả giò','Gỏi cuốn','Bún bò Huế','Gà nướng','Bánh cuốn','Pizza','Caesar salad','Hamburger bò phô mai','Khoai tây nghiền','Mỳ Ý sốt cà chua bò bằm - mì sốt spaghetti','Khoai tây đút lò','Bò hầm rau củ kiểu Pháp','Cá hồi sốt chanh dây'];
  var linkMap = {
  'Phở': 'https://i.imgur.com/uPYXvsq.png',
  'Chả cá': 'https://i.imgur.com/kO3xF0x.png',
  'Bánh xèo': 'https://i.imgur.com/NqO1eLY.png',
  'Rau muống': 'https://i.imgur.com/NHrlJpQ.jpeg',
  'Nem rán/chả giò': 'https://i.imgur.com/8kIUE7d.jpeg',
  'Gỏi cuốn': 'https://i.imgur.com/5vPbIQX.jpeg',
  'Bún bò Huế': 'https://i.imgur.com/WmsyFxP.jpeg',
  'Gà nướng': 'https://i.imgur.com/wap9yXx.jpeg',
  'Bánh cuốn': 'https://i.imgur.com/9uWffvI.png',
  'Pizza': 'https://i.imgur.com/DXCUkfH.jpeg',
  'Caesar salad': 'https://i.imgur.com/VYTcz1U.jpeg',
  'Hamburger bò phô mai': 'https://i.imgur.com/rJLL2xy.jpeg',
  'Khoai tây nghiền': 'https://i.imgur.com/qXXpmie.jpeg',
  'Mỳ Ý sốt cà chua bò bằm - mì sốt spaghetti': 'https://i.imgur.com/PhlIgh1.jpeg',
  'Khoai tây đút lò': 'https://i.imgur.com/YpVQM3H.jpeg',
  'Bò hầm rau củ kiểu Pháp': 'https://i.imgur.com/cRkmyUX.jpeg',
  'Cá hồi sốt chanh dây': 'https://i.imgur.com/BiTtiNO.jpeg'
  };
  var work4 = rdna[Math.floor(Math.random() * rdna.length)];
  var link = linkMap[work4];
  var coins4 = Math.floor(Math.random() * 10000000000000000000000000000) + 90;
  var image = "https://i.imgur.com/Tptoq8D.gif"
  send({ body: 'Đang Nấu Ăn...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã nấu được món ${work4} và nhận được ${coins4}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "5": {
  var rdcc = ['Gỗ sồi','Gỗ bạch dương','Gỗ keo','Gỗ vân sam','Gỗ lim','Gỗ sưa','Gỗ hương','Gỗ mun','Gỗ gụ','Gỗ trắc','Gỗ cẩm','Gỗ cẩm lai','Gỗ nghiến','Gỗ mít','Gỗ xoan đào'];
  var linkMap = {
  'Gỗ sồi': 'https://i.imgur.com/H8HXVwa.png',
  'Gỗ bạch dương': 'https://i.imgur.com/xw29rr9.png',
  'Gỗ keo': 'https://i.imgur.com/smfz1AY.png',
  'Gỗ vân sam': 'https://i.imgur.com/qWiVr6v.png',
  'Gỗ lim': 'https://i.imgur.com/K7Pd5eF.png',
  'Gỗ sưa': 'https://i.imgur.com/daiGbSc.png',
  'Gỗ hương': 'https://i.imgur.com/UlJGcnW.png',
  'Gỗ mun': 'https://i.imgur.com/1Sidihg.png',
  'Gỗ gụ': 'https://i.imgur.com/cTgBIzh.png',
  'Gỗ trắc': 'https://i.imgur.com/y8O8hqL.png',
  'Gỗ cẩm': 'https://i.imgur.com/G7kbTYu.png',
  'Gỗ cẩm lai': 'https://i.imgur.com/ihXPbsl.png',
  'Gỗ nghiến': 'https://i.imgur.com/b2DWVg5.png',
  'Gỗ mít': 'https://i.imgur.com/viKR8TG.png',
  'Gỗ xoan đào': 'https://i.imgur.com/AC8eush.png'
  };
  var work5 = rdcc[Math.floor(Math.random() * rdcc.length)];
  var link = linkMap[work5];
  var coins5 = Math.floor(Math.random() * 10000000000000000000000000000) + 500;
  await o.Currencies.increaseMoney(h.author, coins5);
  var image = ["https://i.imgur.com/706Rr8j.gif" , "https://i.imgur.com/EN15fDe.gif"]
  send({ body: 'Đang Chặt Cây...', attachment: (await require("axios").get(image[Math.floor(Math.random * image.length)], { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã chặt được ${work5} và bú thêm được ${coins5}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "6": {
  var rdtc = ['Cây lúa nước','Cây ngô','Cây khoai tây','Cây lúa mì','Cây sắn','Cây khế','Cây đại mạch','Cây khoai lang','Cây mía','Cây lạc','Cây đậu tương','Cây đậu xanh','Cây bông gòn','Cây vừng ( cây mè)','Cây thuốc lào/thuốc lá','Cây dứa (trái thơm)','Cây đu đủ','Cây cà chua', 'Cây cam', 'Cây quýt', 'Cây bưởi', 'Cây táo', 'Cây chôm chôm', 'Cây dưa hấu', 'Cây nhãn', 'Cây vải'];
  var linkMap = {
  'Cây mía': 'https://i.imgur.com/IaHFRhC.png',
  'Cây lạc': 'https://i.imgur.com/D46xKnp.png',
  'Cây đậu tương': 'https://i.imgur.com/dMnOCOi.png',
  'Cây đậu xanh': 'https://i.imgur.com/xi3OnHj.png',
  'Cây bông gòn': 'https://i.imgur.com/MHcQuwu.png',
  'Cây vừng ( cây mè)': 'https://i.imgur.com/xPoe97R.png',
  'Cây thuốc lào/thuốc lá': 'https://i.imgur.com/aAzpc64.png',
  'Cây dứa (trái thơm)': 'https://i.imgur.com/mZCJt7I.png',
  'Cây đu đủ': 'https://i.imgur.com/vacca7H.png',
  'Cây lúa nước': 'https://i.imgur.com/1uvraj4.png',
  'Cây ngô': 'https://i.imgur.com/8us4Zxb.png',
  'Cây khoai tây': 'https://i.imgur.com/Ld1VqaR.png',
  'Cây lúa mì': 'https://i.imgur.com/DycGgOY.png',
  'Cây sắn': 'https://i.imgur.com/c78qbES.png',
  'Cây khế': 'https://i.imgur.com/Y5GUGmV.png',
  'Cây đại mạch': 'https://i.imgur.com/JmNnwQC.png',
  'Cây khoai lang': 'https://i.imgur.com/pnyKcbF.png',
  'Cây cà chua': 'https://i.imgur.com/LCBH1rf.jpeg',
  'Cây cam': 'https://i.imgur.com/M9ZMwX2.jpeg',
  'Cây quýt': 'https://i.imgur.com/Dv9rA98.jpeg',
  'Cây bưởi': 'https://i.imgur.com/HJP06Ub.jpeg',
  'Cây táo': 'https://i.imgur.com/TSPTQaT.jpeg',
  'Cây chôm chôm': 'https://i.imgur.com/DKQa37x.jpeg',
  'Cây dưa hấu': 'https://i.imgur.com/SuB8ExQ.jpg',
  'Cây nhãn': 'https://i.imgur.com/XPwap6p.jpeg',
  'Cây vải': 'https://i.imgur.com/ViiNwUP.jpeg'
  };
  var work6 = rdtc[Math.floor(Math.random() * rdtc.length)];
  var link = linkMap[work6];
  var coins6 = Math.floor(Math.random() * 10000000000000000000000000000) + 1000;
  await o.Currencies.increaseMoney(h.author, coins6);
  var image = "https://i.imgur.com/HHBF6Yy.gif"
  send({ body: 'Đang Trồng Cây...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã trồng được ${work6} và bán được ${coins6}₫ và nhận vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "7": {
  var rddd = ['Đồng', 'Chì', 'Vàng', 'Kẽm',' Sắt', 'Nhôm', 'Thiếc','Mangan','Đá vôi', 'Đất sét', 'Cát','Ngọc thạch anh','Kim cương','Ngọc lục bảo', 'Hồng ngọc','Đá mã não','Saphia'];
  var linkMap = {
  'Đồng': 'https://i.imgur.com/EghuDew.png',
  'Chì': 'https://i.imgur.com/SuHXtP1.png',
  'Vàng': 'https://i.imgur.com/cxTORIe.png',
  'Kẽm': 'https://i.imgur.com/MujYEyd.png',
  'Sắt': 'https://i.imgur.com/yD5IrG4.png',
  'Nhôm': 'https://i.imgur.com/NJcNYCX.png',
  'Thiếc': 'https://i.imgur.com/yInlgHh.png',
  'Mangan': 'https://i.imgur.com/uyGmRwE.png',
  'Đá vôi': 'https://i.imgur.com/WXaxHot.png',
  'Đất sét': 'https://i.imgur.com/Nlh30Lf.png',
  'Cát': 'https://i.imgur.com/DtOq5hX.png',
  'Ngọc thạch anh': 'https://i.imgur.com/oJoN0j7.png',
  'Kim cương': 'https://i.imgur.com/69QZHLQ.png',
  'Ngọc lục bảo': 'https://i.imgur.com/DJzj1EN.png',
  'Hồng ngọc': 'https://i.imgur.com/lsXUHeJ.png',
  'Đá mã não': 'https://i.imgur.com/bGcW9bN.png',
  'Saphia': 'https://i.imgur.com/JBOaVEW.png'
  };
  var work7 = rddd[Math.floor(Math.random() * rddd.length)];
  var link = linkMap[work7];
  var coins7 = Math.floor(Math.random() * 10000000000000000000000000000) + 420;
  await o.Currencies.increaseMoney(h.author, coins7);
  var image = "https://i.imgur.com/HHzSQSE.gif"
  send({ body: 'Đang Đào Đá...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã đào được ${work7} và bán nhận về được ${coins7}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  case "8": {
  var rdt = ["Thùng carton", "Thùng phi", "Thùng sơn", "Thùng nhựa", "Thùng gạo", "Thùng sắt", "Thùng bia", "Thùng nước", "Thùng nuôi cá", "Thùng rác", "Thùng dữ nhiệt", "Thùng xốp", "Thùng nước ngọt", "Thùng contender", "Thùng mì"];
  var linkMap = {
  "Thùng carton": "https://i.imgur.com/Rv3F13u.jpeg",
  "Thùng phi": "https://i.imgur.com/3XK7J4r.jpeg",
  "Thùng sơn": "https://i.imgur.com/9kQB6QF.jpeg",
  "Thùng nhựa": "https://i.imgur.com/JUcaHDq.jpeg",
  "Thùng gạo": "https://i.imgur.com/TxKZP6C.jpeg",
  "Thùng sắt": "https://i.imgur.com/HFPSKX0.jpeg",
  "Thùng bia": "https://i.imgur.com/yNymW9i.jpeg",
  "Thùng nước": "https://i.imgur.com/WVPFdYx.jpeg",
  "Thùng nuôi cá": "https://i.imgur.com/55Etztj.jpeg",
  "Thùng rác": "https://i.imgur.com/9AHLg26.jpeg",
  "Thùng dữ nhiệt": "https://i.imgur.com/R3Z8DWX.jpeg",
  "Thùng xốp": "https://i.imgur.com/8rjxtXU.jpeg",
  "Thùng nước ngọt": "https://i.imgur.com/hqDTCxA.jpeg",
  "Thùng contender": "https://i.imgur.com/TlkGrJ7.jpeg",
  "Thùng mì": "https://i.imgur.com/CJw9Sid.jpeg",
  }
  var work8 = rdt[Math.floor(Math.random() * rdt.length)];
  var link = linkMap[work8];
  var coins8 = Math.floor(Math.random() * 10000000000000000000000000000) + 500;
  await o.Currencies.increaseMoney(h.author, coins8);
  var image = "https://imgur.com/0eCG0xf.gif"
  send({ body: 'Đang Kéo thùng...', attachment: (await require("axios").get(image, { responseType: "stream"})).data }, async () => send({ body: `Chúc mừng ${h.name_author} đã kéo được ${work8} và bán nhận về được ${coins8}₫ vào ví`, attachment: (await require("axios").get(link, { responseType: "stream"})).data }, async() => {
  data["workTime"] ? data["workTime"] : data["workTime"] = {}
  data["workTime"][h.author] = Date.now()
  await o.Threads.setData(t, { data })
  global.data.threadData.set(t, data)
  }))
  }
  break;
  default: const choose = parseInt(b);
  if (isNaN(b)) return send("𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝟭 𝗰𝗼𝗻 𝘀𝗼̂́");
  if (choose > 8 || choose < 1) return send("𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗮̆̀𝗺 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵."); 
  }
}
