const { createCanvas, loadImage } = require('canvas');

this.config = {
    name: "help",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam mod by Niio-team",
    description: "Xem danh sách lệnh và info",
    commandCategory: "Người dùng",
    usages: "[tên lệnh/all]",
    cooldowns: 0
};

this.run = async function({ api, event, args }) {
    const { threadID: tid, messageID: mid, senderID: sid } = event;
    const cmds = global.client.commands;
    const type = args[0] ? args[0].toLowerCase() : "";
    let msg = "";

    if (type) {
        const command = Array.from(cmds.values()).find(cmd => cmd.config.name.toLowerCase() === type);
        if (!command) {
            msg = `⚠️ Không tìm thấy lệnh '${type}' trong hệ thống.`;
            return api.sendMessage(msg, tid, mid);
        }
        const cmd = command.config;

        // Tạo canvas để hiển thị thông tin lệnh
        const canvas = createCanvas(600, 400);
        const ctx = canvas.getContext('2d');

        // Đặt nền
        ctx.fillStyle = '#ffffff'; // Màu nền trắng
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Vẽ thông tin lệnh lên canvas
        ctx.fillStyle = '#000000'; // Màu chữ đen
        ctx.font = '20px Arial';
        ctx.fillText(`📜 Tên lệnh: ${cmd.name}`, 20, 50);
        ctx.fillText(`🕹️ Phiên bản: ${cmd.version}`, 20, 100);
        ctx.fillText(`🔑 Quyền Hạn: ${TextPr(cmd.hasPermssion)}`, 20, 150);
        ctx.fillText(`📝 Mô Tả: ${cmd.description}`, 20, 200);
        ctx.fillText(`🏘️ Nhóm: ${cmd.commandCategory}`, 20, 250);
        ctx.fillText(`📌 Cách Dùng: ${cmd.usages}`, 20, 300);
        ctx.fillText(`⏳ Cooldowns: ${cmd.cooldowns}s`, 20, 350);

        const buffer = canvas.toBuffer();
        return api.sendMessage({ body: `Hướng dẫn sử dụng lệnh ${cmd.name}`, attachment: buffer }, tid, mid);
    } else {
        // Nếu không có tên lệnh, hiển thị danh sách lệnh
        // ... (Phần này không thay đổi)
    }
};

function TextPr(permission) {
    return permission === 0 ? "Thành Viên" : 
           permission === 1 ? "Quản Trị Viên" : 
           permission === 2 ? "Admin Bot" : 
           "Toàn Quyền";
}
