# 🎬👻 Horror Video Prompt Generator

Desktop app để tạo prompt video kinh dị/bí ẩn cho **Sora AI** - Chuyên dụng cho YouTube creators!

![Version](https://img.shields.io/badge/version-1.0.0-red)
![Platform](https://img.shields.io/badge/platform-Windows-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Tính Năng

- 🎯 **Nhập kịch bản tiếng Việt** → Tạo prompt tiếng Anh chuyên nghiệp
- 👻 **Tối ưu cho Horror/Mystery** - Phù hợp video kinh dị, bí ẩn
- 🤖 **Powered by Google Gemini AI** - Miễn phí!
- 💾 **Lưu lịch sử** - Không mất prompts đã tạo
- 📋 **Copy/Export dễ dàng** - JSON format chuẩn cho Sora
- 🎨 **Giao diện theme kinh dị** - Phù hợp với chủ đề
- ⚡ **Desktop app** - Không cần mở browser

## 📋 Yêu Cầu

- **Windows** 10/11
- **Node.js** 18+ ([Tải tại đây](https://nodejs.org/))
- **Gemini API Key** (miễn phí - hướng dẫn bên dưới)

## 🚀 Cài Đặt & Chạy

### Bước 1: Clone hoặc Download project

```bash
# Nếu có git
git clone <repo-url>
cd horror-video-prompt-generator

# Hoặc download ZIP và giải nén
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Lấy Gemini API Key (MIỄN PHÍ)

1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Nhấn **"Get API key"** hoặc **"Create API key"**
4. Chọn **"Create API key in new project"**
5. Copy API key (dạng: `AIza...`)
6. Lưu lại để dùng trong app

### Bước 4: Chạy app

```bash
npm run dev
```

App sẽ mở tự động! 🎉

## 🎮 Cách Sử Dụng

### 1️⃣ Nhập API Key (Lần đầu tiên)
- Paste API key vừa lấy
- Nhấn **"Test API Key"**
- Đợi xác nhận ✅

### 2️⃣ Viết Kịch Bản
- Nhập kịch bản video kinh dị/bí ẩn (tiếng Việt)
- Hoặc chọn ví dụ có sẵn
- Mô tả chi tiết: cảnh quay, ánh sáng, chuyển động

**Ví dụ:**
```
Một căn phòng tối tăm, chỉ có ánh nến le lói. 
Bóng người từ từ hiện ra sau tấm gương cổ, 
đôi mắt nhìn thẳng vào camera.
```

### 3️⃣ Tạo Prompt
- Nhấn **"Tạo Prompt"**
- Đợi AI xử lý (5-10 giây)
- Prompt tiếng Anh sẽ hiện ra!

### 4️⃣ Sử Dụng Prompt
- **Copy** prompt để paste vào Sora
- **Download JSON** để lưu trữ
- Xem chi tiết: style, mood, camera, lighting, sound

### 5️⃣ Lịch Sử
- Tất cả prompts được lưu tự động
- Click vào item cũ để tải lại
- Xóa lịch sử nếu muốn

## 📦 Build App (Tạo file .exe)

Để tạo file .exe cài đặt cho Windows:

```bash
npm run build:win
```

File .exe sẽ ở trong thư mục `dist/` hoặc `release/`

## 🎨 Tính Năng Nổi Bật

### Prompt Tối Ưu Cho Horror/Mystery
AI được train để tạo prompt với:
- ✅ Ánh sáng: dim, shadows, flickering
- ✅ Góc máy: dutch angle, slow zoom, POV
- ✅ Màu sắc: desaturated, dark palette, red accents
- ✅ Chuyển động: slow motion, creepy reveals
- ✅ Âm thanh: eerie silence, whispers, ambient horror

### JSON Output Chuẩn
```json
{
  "prompt": "Detailed English prompt...",
  "duration": 5,
  "style": "cinematic horror",
  "mood": "eerie, terrifying",
  "camera": "slow zoom in",
  "lighting": "dim moonlight, shadows",
  "soundSuggestion": "creaking door, whispers"
}
```

## 💰 Chi Phí

- **App**: MIỄN PHÍ
- **Gemini API**: MIỄN PHÍ (15 requests/phút)
- **Total**: **$0/tháng** 🎉

## ⚠️ Lưu Ý

- API key được lưu LOCAL trên máy bạn (không gửi đi đâu)
- Cần kết nối internet để dùng Gemini API
- Gemini free tier: 15 requests/phút (đủ dùng cho cá nhân)

## 🐛 Gặp Lỗi?

### "API key invalid"
→ Kiểm tra lại key, đảm bảo copy đúng và đầy đủ

### "Quota exceeded"
→ Đợi 1 phút rồi thử lại (free tier có giới hạn)

### App không mở
→ Kiểm tra đã cài Node.js chưa, chạy `npm install` lại

## 🎯 Roadmap

- [ ] Thêm nhiều theme (sci-fi, fantasy, etc)
- [ ] Export video timeline
- [ ] Tích hợp thêm AI models
- [ ] Template library
- [ ] Multi-language support

## 📄 License

MIT License - Tự do sử dụng cho cá nhân và thương mại

## 👨‍💻 Author

Made with 💀 by a Full Stack Dev with 20 years experience

---

**Chúc bạn tạo được những video kinh dị đỉnh cao! 🎬👻**
