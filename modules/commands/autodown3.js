const axios = require('axios');
const fs = require('fs');
const path = require('path');

let is_douyin_url = url => /(^https:\/\/)((vm|vt|www|v)\.)?(douyin)\.com\//.test(url);
let is_weibo_url = url => /^https?:\/\/(www\.)?weibo\.com\/\d+\/[A-Za-z0-9]+$/.test(url);
let is_xhslink_url = url => /http:\/\/xhslink\.com\/a\/[A-Za-z0-9]+/.test(url);
let is_twitter_url = url => /^https?:\/\/x\.com\/[A-Za-z0-9_]+\/status\/\d+(\?t=[A-Za-z0-9_-]+)?(&s=\d+)?$/.test(url);
let is_instagram_url = url => /^https?:\/\/(www\.)?instagram\.com\/(p|tv|reel|stories)\/[A-Za-z0-9._%-]+(\/[0-9]+)?(\/)?(\?[A-Za-z0-9=&_-]+)?$/.test(url);
let is_threads_url = url => /https:\/\/(www\.)?threads\.net\/@[A-Za-z0-9._%-]+\/(post|status)\/[A-Za-z0-9_-]+(\?xmt=[A-Za-z0-9_-]+)?/.test(url);

let extractUrls = (text) => {
    let urlPattern = /(https?:\/\/[^\s]+)/g;
    let foundUrls = text.match(urlPattern) || [];
    return foundUrls.filter(url => 
        is_douyin_url(url) || 
        is_weibo_url(url) || 
        is_xhslink_url(url) || 
        is_twitter_url(url) ||
        is_instagram_url(url) ||
        is_threads_url(url)
    );
};

let stream_url = (url, type) => axios.get(url, {
    responseType: 'arraybuffer'
}).then(res => {
    let filePath = path.join(__dirname, 'cache', Date.now() + '.' + type);
    fs.writeFileSync(filePath, res.data);
    setTimeout(() => fs.unlinkSync(filePath), 1000 * 60);
    return fs.createReadStream(filePath);
}).catch(err => console.error("Lỗi khi tải file:", err));

const downloadThreadsMedia = async (mediaData) => {
    let attachments = [];
    for (let media of mediaData.medias) {
        if (media.url) {
            if (media.type === 'video') {
                try {
                    let fileStream = await stream_url(media.url, media.extension || 'mp4');
                    attachments.push(fileStream);
                } catch (error) {
                    console.error("Lỗi khi tải video từ Threads:", error);
                }
            } else if (media.type === 'image') {
                try {
                    let fileStream = await stream_url(media.url, media.extension || 'jpg');
                    attachments.push(fileStream);
                } catch (error) {
                    console.error("Lỗi khi tải hình ảnh từ Threads:", error);
                }
            }
        }
    }
    return attachments;
};

exports.config = {
    name: 'mediaDownloader',
    version: '0.0.8',
    hasPermssion: 0,
    credits: 'DGK',
    description: 'Tự động tải video và hình ảnh từ Douyin, Weibo, xhslink, Twitter, Instagram, Threads.',
    commandCategory: 'Tiện ích',
    usages: 'autodown',
    cooldowns: 0
};

exports.run = function(o) {};

exports.handleEvent = async function(o) {
    let text = o.event.body;
    console.log("Văn bản đầu vào:", text);

    // Tìm kiếm link xhslink
    const regexXhslink = /http:\/\/xhslink\.com\/a\/[A-Za-z0-9]+/;
    const matchXhslink = text.match(regexXhslink);
    if (matchXhslink) {
        console.log("Link xhslink đã tìm thấy:", matchXhslink[0]);
    } else {
        console.log("Không tìm thấy link xhslink.");
    }

    let urls = extractUrls(text);
    console.log("URL tìm thấy:", urls);

    let douyinUrl = urls.find(is_douyin_url);
    let weiboUrl = urls.find(is_weibo_url);
    let xhslinkUrl = urls.find(is_xhslink_url);
    let twitterUrl = urls.find(is_twitter_url);
    let instagramUrl = urls.find(is_instagram_url);
    let threadsUrl = urls.find(is_threads_url);

    if (!douyinUrl && !weiboUrl && !xhslinkUrl && !twitterUrl && !instagramUrl && !threadsUrl) {
        console.log("Không tìm thấy URL hợp lệ.");
        return;
    }

    let mediaUrl = douyinUrl || weiboUrl || xhslinkUrl || twitterUrl || instagramUrl || threadsUrl;
    console.log("URL được xử lý:", mediaUrl);

    try {
        let res = await axios.get(`http://sv.gamehosting.vn:31217/media?url=${encodeURIComponent(mediaUrl)}`);
        console.log("Dữ liệu nhận từ API:", res.data);

        if (!res.data || !res.data.medias) {
            console.error('Lỗi phân tích dữ liệu API.');
            return;
        }

        let { author, title, medias } = res.data;
        let attachments = [];

        // Download media từ Threads
        if (threadsUrl) {
            attachments = await downloadThreadsMedia(res.data);
        } else {
            for (let media of medias) {
                if (media.type === 'image' && media.url) {
                    attachments.push(await stream_url(media.url, 'jpg'));
                }
            }

            // Tải video từ các nguồn
            if (douyinUrl) {
                let videoMedia = medias.find(media => media.type === 'video' && media.quality === 'HD No Watermark') || 
                                 medias.find(media => media.type === 'video');
                if (videoMedia && videoMedia.url) {
                    attachments.push(await stream_url(videoMedia.url, videoMedia.extension));
                }
            } 
            else if (weiboUrl) {
                let videoMedia = medias.find(media => media.type === 'video');
                if (videoMedia && videoMedia.url) {
                    attachments.push(await stream_url(videoMedia.url, videoMedia.extension));
                }
            } 
            else if (xhslinkUrl) {
    let videoMedia = medias.find(media => media.type === 'video');
    if (videoMedia && videoMedia.url) {
        attachments.push(await stream_url(videoMedia.url, videoMedia.extension));
    }

    // Check for JPG images
    let imageMedia = medias.find(media => media.type === 'image' && media.extension === 'jpg');
    if (imageMedia && imageMedia.url) {
        attachments.push(await stream_url(imageMedia.url, imageMedia.extension));
    }
}
            else if (twitterUrl) {
                for (let media of medias) {
                    if (media.type === 'video' && media.url) {
                        attachments.push(await stream_url(media.url, media.extension));
                    }
                }
            } else if (instagramUrl) {
                let videoMedia = medias.find(media => media.type === 'video');
                if (videoMedia && videoMedia.url) {
                    try {
                        attachments.push(await stream_url(videoMedia.url, videoMedia.extension));
                    } catch (error) {
                        console.error("Lỗi khi tải video từ Instagram:", error);
                    }
                } else {
                    console.log("Không tìm thấy video trong dữ liệu Instagram.");
                }
            }
        }

        if (attachments.length > 0) {
            const messageBody = 
`📝 Tiêu đề: ${title || "Không có tiêu đề"}
🗿 Tác giả: ${author || "Không có tác giả"}
`;

            await o.api.sendMessage({
                body: messageBody,
                attachment: attachments
            }, o.event.threadID);
        }
    } catch (err) {
        console.error("Lỗi khi gọi API hoặc xử lý dữ liệu:", err);
    }
};