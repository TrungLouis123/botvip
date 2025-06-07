module.exports.config = {
    name: "weather",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "YourName",
    description: "Thông báo thời tiết tự động mỗi giờ cho tất cả các nhóm",
    commandCategory: "Người dùng",
    usages: "",
    usePrefix: true,
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

// Hàm onload được thực thi ngay khi module được tải lên
module.exports.onLoad = async function ({ api }) => {
    const apiUrl = 'https://forecast-finder.giize.com'; // Thay thế bằng URL API của bạn
    const location = "Hanoi"; // Địa điểm mặc định

    // Hàm lấy dữ liệu thời tiết và gửi thông báo
    const sendWeatherNotification = async () => {
        try {
            const response = await axios.get(`${apiUrl}/forecast`, {
                params: { location }
            });
            const weatherData = response.data;

            // Định dạng tin nhắn thông báo thời tiết
            const message = `
                Thời tiết tại ${location}:
                - Nhiệt độ: ${weatherData.temperature}°C
                - Tình trạng: ${weatherData.condition}
                - Độ ẩm: ${weatherData.humidity}%
                - Tốc độ gió: ${weatherData.windSpeed} km/h
            `;

            // Lấy danh sách tất cả các nhóm bot có quyền truy cập
            api.getThreadList(100, null, ["INBOX"], (err, list) => {
                if (err) return console.error("Lỗi khi lấy danh sách nhóm:", err);

                // Gửi thông báo đến từng nhóm
                list.forEach(thread => {
                    if (thread.isGroup) {
                        api.sendMessage(message, thread.threadID);
                    }
                });
            });
        } catch (error) {
            console.error("Lỗi khi gọi API thời tiết:", error.message);
        }
    };

    // Thiết lập gửi thông báo mỗi 1 giờ (3600000 milliseconds)
    setInterval(sendWeatherNotification, 3600000);

    // Gọi hàm lần đầu khi bot khởi động
    sendWeatherNotification();
};