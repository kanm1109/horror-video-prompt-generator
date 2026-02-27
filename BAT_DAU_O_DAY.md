# 🎬 BẮT ĐẦU TẠI ĐÂY! 👻

## 🎉 Chào Mừng Bạn!

App **Horror Video Prompt Generator** đã được build xong 100%!

Đây là desktop app giúp bạn tạo prompt video kinh dị/bí ẩn cho **Sora AI** bằng cách chuyển đổi kịch bản tiếng Việt sang prompt tiếng Anh chuyên nghiệp.

---

## ⚡ CHẠY NGAY (3 BƯỚC)

### 🔴 BƯỚC 1: Cài Đặt

**Cách dễ nhất:**
```
Double-click vào: INSTALL.bat
```

**Hoặc dùng Command Prompt:**
```bash
npm install
```

Đợi 2-5 phút (tùy mạng) → Xong!

---

### 🔴 BƯỚC 2: Lấy API Key (MIỄN PHÍ)

1. Mở link: **https://aistudio.google.com/app/apikey**
2. Đăng nhập Google
3. Click **"Create API key in new project"**
4. Copy key (dạng: `AIza...`)
5. Lưu lại

**Chi tiết:** Đọc file `GEMINI_API_KEY_GUIDE.md`

---

### 🔴 BƯỚC 3: Chạy App

**Cách dễ nhất:**
```
Double-click vào: START.bat
```

**Hoặc dùng Command Prompt:**
```bash
npm run dev
```

App sẽ tự động mở! 🎉

---

## 🎮 SỬ DỤNG APP

### Lần đầu tiên:
1. Paste **API key** vào ô
2. Click **"Test API Key"**
3. Đợi ✅ "API Key hợp lệ!"

### Tạo Prompt:
1. **Nhập kịch bản** kinh dị (tiếng Việt) vào ô bên trái
2. Click **"Tạo Prompt"** (nút đỏ lớn)
3. Đợi 5-10 giây
4. **Copy prompt** bên phải → Dùng trong Sora!

### Ví dụ kịch bản:
```
Căn phòng tối tăm, chỉ có ngọn nến nhấp nháy.
Camera từ từ zoom vào tấm gương cổ.
Bóng người từ từ hiện ra trong gương,
đôi mắt nhìn thẳng ra ngoài.
```

---

## 📚 TÀI LIỆU HƯỚNG DẪN

| File | Nội Dung |
|------|----------|
| **QUICK_START.md** | Hướng dẫn nhanh 5 phút |
| **HUONG_DAN_TIENG_VIET.md** | Hướng dẫn chi tiết tiếng Việt |
| **GEMINI_API_KEY_GUIDE.md** | Cách lấy API key miễn phí |
| **README.md** | Tài liệu tiếng Anh |
| **CHANGELOG.md** | Lịch sử phiên bản |

**Khuyến nghị:** Đọc `HUONG_DAN_TIENG_VIET.md` để hiểu đầy đủ!

---

## ✨ TÍNH NĂNG

✅ Chuyển kịch bản Việt → Prompt Anh  
✅ Tối ưu cho Horror/Mystery  
✅ AI miễn phí (Gemini API)  
✅ Lưu lịch sử tự động  
✅ Copy/Export JSON  
✅ Giao diện theme kinh dị  
✅ Desktop app (không cần browser)  

---

## 💰 CHI PHÍ

**HOÀN TOÀN MIỄN PHÍ!** 🎉

- App: **Miễn phí**
- Gemini API: **Miễn phí** (15 requests/phút)
- Không cần thẻ tín dụng
- **Total: $0/tháng**

---

## ⚠️ YÊU CẦU HỆ THỐNG

- Windows 10/11
- Node.js 18+ ([Tải tại đây](https://nodejs.org/))
- Internet connection
- Gemini API key (miễn phí)

---

## ❓ GẶP VẤN ĐỀ?

### "npm: command not found"
→ Chưa cài Node.js. Tải tại: https://nodejs.org/

### "API key invalid"
→ Copy lại key, đảm bảo copy đầy đủ

### App không mở
→ Chạy: `npm install` rồi `npm run dev`

### Lỗi khác
→ Đọc file `HUONG_DAN_TIENG_VIET.md` phần "Xử Lý Lỗi"

---

## 🎯 QUY TRÌNH LÀM VIDEO

1. **Viết kịch bản** video kinh dị (tiếng Việt)
2. **Chạy app** này → Tạo prompt
3. **Copy prompt** → Paste vào Sora AI
4. **Generate video** bằng Sora
5. **Download** và edit (nếu muốn)
6. **Upload** lên YouTube! 🎬

---

## 🚀 TIPS TẠO PROMPT HAY

### ✅ Mô tả chi tiết:
- Ánh sáng: "Nến le lói", "Đèn nhấp nháy", "Bóng tối"
- Chuyển động: "Từ từ zoom", "Đột ngột xoay", "Camera lắc"
- Chi tiết: "Búp bê cổ", "Gương nứt", "Tường bong tróc"

### ❌ Tránh mơ hồ:
- "Có ma" → Quá chung chung
- "Đáng sợ" → Không rõ ràng
- "Kinh dị" → Cần chi tiết hơn

**Đọc thêm:** `HUONG_DAN_TIENG_VIET.md` phần "Mẹo Tạo Prompt Hay"

---

## 📁 CẤU TRÚC PROJECT

```
horror-video-prompt-generator/
├── 📱 App Files
│   ├── src/              # Source code
│   ├── electron/         # Electron config
│   └── node_modules/     # Dependencies
│
├── 📚 Documentation
│   ├── BAT_DAU_O_DAY.md             # ← BẠN ĐANG ĐỌC
│   ├── QUICK_START.md               # Quick start
│   ├── HUONG_DAN_TIENG_VIET.md     # Chi tiết
│   ├── GEMINI_API_KEY_GUIDE.md     # API guide
│   └── README.md                    # English docs
│
└── 🚀 Quick Scripts
    ├── START.bat         # Chạy app
    └── INSTALL.bat       # Cài đặt
```

---

## 🎓 HỌC THÊM

### Về Sora AI:
- Official: https://openai.com/sora
- Guide: Đợi OpenAI release public

### Về Gemini API:
- Docs: https://ai.google.dev/
- Get Key: https://aistudio.google.com/app/apikey

### Về Prompt Engineering:
- Viết prompt chi tiết hơn = Video đẹp hơn!
- Tham khảo các prompt có sẵn trong app

---

## 💡 GỢI Ý SỬ DỤNG

### Cho YouTube:
- Tạo intro video kinh dị (5s)
- Tạo transition scenes
- Tạo thumbnail động
- Tạo teaser/trailer

### Cho TikTok:
- Video ngắn kinh dị
- Jump scare clips
- Mystery reveals

### Cho Instagram:
- Reels kinh dị
- Story content
- Horror aesthetic posts

---

## 🎉 BẮT ĐẦU NGAY!

1. Chạy `START.bat` hoặc `npm run dev`
2. Nhập API key
3. Viết kịch bản đầu tiên
4. Tạo prompt
5. Làm video! 🎬👻

---

## 📞 HỖ TRỢ

Nếu cần giúp đỡ:
1. Đọc `HUONG_DAN_TIENG_VIET.md` (chi tiết nhất)
2. Đọc phần xử lý lỗi
3. Check internet connection
4. Tạo issue trên GitHub

---

**Chúc bạn thành công với kênh YouTube kinh dị! 🎬👻🔥**

---

<div align="center">
Made with 💀 by Full Stack Dev | v1.0.0
</div>
