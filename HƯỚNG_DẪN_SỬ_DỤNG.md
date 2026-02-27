# 🎬 HƯỚNG DẪN SỬ DỤNG - Horror Video Prompt Generator

## 🚀 CÁCH CHẠY APP

### Bước 1: Mở Terminal/Command Prompt
```bash
cd horror-video-prompt-generator
npm run dev
```

### Bước 2: Mở trình duyệt
App sẽ tự động mở hoặc vào: **http://localhost:5173**

---

## 🔑 CÀI ĐẶT API KEY

### Lấy API Key MIỄN PHÍ:
1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google
3. Nhấn **"Create API key"** 
4. Copy API key (dạng: `AIza...`)

### Nhập vào App:
1. Paste API key vào ô
2. Nhấn **"Test API Key"**
3. Chờ kết quả:
   - ✅ **Thành công (FREE):** `✅ API Key hợp lệ! 🆓 (FREE Tier)`
   - ✅ **Thành công (PAID):** `✅ API Key hợp lệ! 💎 (PAID Tier)`
   - ❌ **Thất bại:** Kiểm tra lại key

---

## 📝 TẠO PROMPT

### Tab 1: Kịch Bản Ngắn (1 Prompt)

**Cách 1: Dùng ví dụ có sẵn**
- Click vào 1 trong 4 ví dụ
- Nhấn **"Tạo Prompt"**

**Cách 2: Tự viết kịch bản**
```
Ví dụ:
Căn phòng tối tăm, chỉ có ngọn nến le lói. 
Bóng người từ từ hiện ra sau gương cổ, 
đôi mắt nhìn thẳng vào camera.
```

**Kết quả:**
- Prompt tiếng Anh cho Sora AI
- Thời lượng: 5 giây
- Style, mood, camera, lighting, sound suggestions
- Copy và dùng trong Sora!

### Tab 2: Kịch Bản Dài (Nhiều Prompts)

**Dành cho video dài:**
1. Nhập kịch bản đầy đủ (có thể nhiều đoạn)
2. Chọn thời lượng mỗi scene: 5/10/15/20 giây
3. Chọn tốc độ đọc: Slow/Standard/Fast
4. Nhấn **"Chia Thành Scenes"**
5. Nhấn **"Tạo Tất Cả Prompts"**
6. Export: Timeline JSON / CSV / TXT

---

## 🆓 vs 💎 FREE vs PAID API

### 🆓 FREE TIER (Khuyên dùng!)
**Đủ dùng cho app này!**

**Models sử dụng:**
- `gemini-1.5-flash` - Nhanh, ổn định
- `gemini-1.5-pro` - Chất lượng cao

**Giới hạn:**
- 15 requests/phút
- 1,500 requests/ngày

**Ưu điểm:**
- ✅ Miễn phí 100%
- ✅ Không cần thẻ
- ✅ Chất lượng tốt

### 💎 PAID TIER (Tùy chọn)
**Chỉ cần nếu muốn nhanh hơn**

**Models sử dụng:**
- `gemini-2.0-flash-exp` - Nhanh hơn, mới nhất

**Ưu điểm:**
- ✅ Tốc độ cao hơn
- ✅ Ít bị rate limit
- ✅ Models thử nghiệm

**App tự động nhận biết và dùng model phù hợp!**

---

## 🎯 TÍNH NĂNG

### ✅ Kịch Bản Ngắn
- Tạo 1 prompt từ kịch bản
- Lịch sử 50 prompts gần nhất
- Copy nhanh
- Lưu tự động

### ✅ Kịch Bản Dài
- Tự động chia scenes
- Tạo nhiều prompts cùng lúc
- Tạo ảnh minh họa (Imagen)
- Export nhiều định dạng
- Lưu/Load project

### ✅ Thông Minh
- Auto-detect FREE/PAID API
- Cache model đã hoạt động
- Retry tự động nếu lỗi
- Quota tracking

---

## 💡 TIPS

### Viết kịch bản tốt:
1. ✅ **Chi tiết:** Mô tả rõ cảnh quay, ánh sáng
2. ✅ **Cụ thể:** "Ánh nến le lói" tốt hơn "tối"
3. ✅ **Hành động:** "Bóng người từ từ hiện ra" tốt hơn "có bóng người"
4. ✅ **Góc máy:** "Camera zoom vào" giúp prompt tốt hơn

### Ví dụ tốt:
```
Hành lang bệnh viện bỏ hoang, đèn huỳnh quang nhấp nháy. 
Camera theo POV người đi, chân bước lảo đảo. 
Tiếng bước chân vọng lại dù không có ai. 
Cuối hành lang, cửa từ từ mở ra.
```

### Ví dụ chưa tốt:
```
Bệnh viện đáng sợ. Có ma.
```

---

## 🐛 XỬ LÝ LỖI

### Lỗi: "Không tìm thấy model phù hợp"
**Nguyên nhân:** API key không đúng hoặc hết quota

**Giải pháp:**
1. Kiểm tra API key
2. Tạo key mới: https://aistudio.google.com/app/apikey
3. Đợi reset quota (1 phút)

### Lỗi: "API đã hết quota"
**Nguyên nhân:** Vượt 15 requests/phút

**Giải pháp:**
1. Đợi 1 phút
2. Hoặc dùng API key khác
3. Hoặc upgrade lên PAID (tùy chọn)

### Nút không bấm được
**Nguyên nhân:** Chưa nhập kịch bản

**Giải pháp:**
1. Nhập text vào ô kịch bản
2. Hoặc click ví dụ có sẵn

---

## 📦 CÁC FILE QUAN TRỌNG

- `FREE_AND_PAID_SUPPORT.md` - Chi tiết FREE vs PAID
- `FREE_TIER_FIX.md` - Sửa lỗi FREE tier
- `FIX_SUMMARY.md` - Tóm tắt các lỗi đã sửa
- `HƯỚNG_DẪN_SỬ_DỤNG.md` - File này!

---

## ❓ FAQ

**Q: App có miễn phí không?**
A: ✅ Hoàn toàn miễn phí! Chỉ cần FREE API key.

**Q: Cần cài gì không?**
A: Đã cài sẵn. Chỉ cần `npm run dev`.

**Q: Có giới hạn gì không?**
A: 15 prompts/phút, 1,500/ngày (FREE API).

**Q: Prompt có tốt không?**
A: ✅ Rất tốt! Được tối ưu cho Sora AI.

**Q: Có lưu lịch sử không?**
A: ✅ Có! Tự động lưu 50 prompts gần nhất.

**Q: Có cần Internet không?**
A: ✅ Cần! Để gọi Gemini API.

**Q: Data có gửi đi đâu không?**
A: ❌ Không! Chỉ gửi tới Google Gemini API. API key lưu local.

---

## 🎉 BẮT ĐẦU NGAY!

```bash
cd horror-video-prompt-generator
npm run dev
```

Mở http://localhost:5173 và tận hưởng! 🎬👻

---

**Made with 💀 for Horror Content Creators**
