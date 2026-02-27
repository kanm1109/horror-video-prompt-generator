# 🔑 Hướng Dẫn Lấy Gemini API Key (MIỄN PHÍ)

## 📝 TL;DR (Tóm Tắt Nhanh)

1. Vào: https://aistudio.google.com/app/apikey
2. Đăng nhập Google
3. Click "Create API key"
4. Copy key
5. Dùng trong app!

---

## 📖 Hướng Dẫn Chi Tiết (Có Hình Ảnh)

### Bước 1: Truy Cập Google AI Studio

**Link:** https://aistudio.google.com/app/apikey

Mở link này trong trình duyệt (Chrome, Edge, Firefox, v.v.)

### Bước 2: Đăng Nhập

- Sử dụng tài khoản **Google** (Gmail) của bạn
- Nếu chưa có Gmail → Tạo miễn phí tại https://gmail.com
- Đăng nhập bình thường như các dịch vụ Google khác

### Bước 3: Tạo API Key

Sau khi đăng nhập, bạn sẽ thấy giao diện **Google AI Studio**.

**Tìm nút tạo key:**
- Bên trái màn hình, tìm menu **"Get API key"**
- Hoặc nhìn ở giữa màn hình có nút lớn **"Create API key"**

**Click vào nút đó!**

### Bước 4: Chọn Project

Một popup sẽ hiện ra với 2 options:

1. **"Create API key in new project"** (Khuyến nghị)
   - Tạo API key mới trong project mới
   - Chọn cái này nếu bạn chưa có project nào

2. **"Create API key in existing project"**
   - Nếu bạn đã có project Google Cloud
   - Chọn project từ dropdown

**→ Chọn "Create API key in new project"** (dễ nhất)

### Bước 5: Copy API Key

API key sẽ hiện ra dạng:
```
AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**QUAN TRỌNG:**
- ⚠️ Key này chỉ hiện **1 LẦN DUY NHẤT**
- Click nút **"Copy"** để copy
- Paste vào **Notepad** và lưu lại
- Nếu mất key → Tạo key mới (miễn phí)

### Bước 6: Sử Dụng Trong App

1. Mở app **Horror Video Prompt Generator**
2. Ở màn hình đầu tiên, paste API key vào ô
3. Click **"Test API Key"**
4. Đợi 2-3 giây
5. Thấy ✅ **"API Key hợp lệ!"** → Hoàn tất!

---

## ✅ Kiểm Tra API Key Hoạt Động

App có tính năng **test key tự động**, nhưng bạn cũng có thể test thủ công:

### Cách 1: Test Trong App (Khuyến nghị)
- Paste key vào app
- Click "Test API Key"
- Đợi kết quả

### Cách 2: Test Qua Browser
1. Mở link: https://aistudio.google.com/app/prompts/new_chat
2. Nhập bất kỳ câu hỏi nào
3. Nhấn Enter
4. Nếu có phản hồi → API hoạt động!

---

## ⚠️ Xử Lý Lỗi

### Lỗi: "API_KEY_INVALID"

**Nguyên nhân:**
- Copy key không đủ (thiếu ký tự)
- Có khoảng trắng thừa đầu/cuối key
- Key đã bị revoke/xóa

**Cách fix:**
1. Quay lại Google AI Studio
2. Copy lại key (chắc chắn copy HẾT)
3. Xóa khoảng trắng thừa
4. Paste lại vào app

### Lỗi: "Quota Exceeded" / "429"

**Nguyên nhân:**
- Vượt quá 15 requests/phút (giới hạn free)

**Cách fix:**
- **Option 1:** Đợi 1 phút rồi thử lại
- **Option 2:** Tạo API key mới với Gmail khác

### Không Thấy Nút "Create API Key"

**Nguyên nhân:**
- Chưa đăng nhập
- Dùng sai link

**Cách fix:**
1. Đảm bảo đã đăng nhập Google
2. Dùng đúng link: https://aistudio.google.com/app/apikey
3. Refresh trang (F5)

### Key Bị Mất

**Cách fix:**
- Không sao! Tạo key mới miễn phí
- Google cho phép tạo nhiều keys
- Mỗi Gmail có thể có nhiều keys

---

## 🔒 Bảo Mật API Key

### DO's (Nên):
✅ Lưu key ở nơi an toàn (Notepad, password manager)
✅ Không share key cho người khác
✅ Xóa key nếu không dùng nữa

### DON'Ts (Không nên):
❌ Đăng key lên mạng xã hội
❌ Commit key vào Git/GitHub
❌ Gửi key qua email

### Nếu Key Bị Lộ

1. Vào Google AI Studio
2. Tìm key cũ trong danh sách
3. Click **"Delete"** hoặc **"Revoke"**
4. Tạo key mới

---

## 💰 Chi Phí & Giới Hạn

### Gemini API - Free Tier

**Miễn phí 100%:**
- ✅ Không cần thẻ tín dụng
- ✅ Không cần thanh toán
- ✅ Sử dụng vô thời hạn

**Giới hạn:**
- 📊 **15 requests/phút**
- 📊 **1,500 requests/ngày** (tùy region)
- 📊 **1 triệu tokens/tháng**

**Đủ dùng cho:**
- ✅ Cá nhân
- ✅ Học tập
- ✅ Dự án nhỏ
- ✅ YouTube content creation

**Không đủ cho:**
- ❌ Ứng dụng quy mô lớn
- ❌ Commercial với traffic cao

### Nếu Cần Nhiều Hơn

Google có **Paid tier** với quota cao hơn:
- **Pay-as-you-go**: $0.00025/1K characters
- Cực rẻ so với GPT-4

Nhưng với YouTube content creation → **Free tier là đủ!**

---

## 📊 So Sánh API Keys

| AI | Free Tier | Giới Hạn | Cần Thẻ? |
|---|---|---|---|
| **Gemini** | ✅ Có | 15/phút | ❌ Không |
| GPT-3.5 | ✅ Có | $5 credit | ✅ Có |
| GPT-4 | ❌ Không | - | ✅ Có |
| Claude | ❌ Không | - | ✅ Có |

→ **Gemini là tốt nhất cho beginners!**

---

## 🎯 Tips & Tricks

### Tip 1: Tạo Nhiều Keys
- Bạn có thể tạo nhiều API keys
- Dùng key khác nhau cho projects khác nhau
- Dễ quản lý và theo dõi

### Tip 2: Đặt Tên Key
- Khi tạo key, đặt tên rõ ràng
- VD: "Horror-Video-App", "YouTube-Tools"
- Dễ nhớ, dễ quản lý

### Tip 3: Rotate Keys Định Kỳ
- 3-6 tháng tạo key mới
- Xóa key cũ
- Tăng bảo mật

### Tip 4: Dùng Multiple Gmail
- Nếu vượt quota 1 Gmail
- Tạo Gmail phụ
- Lấy key mới từ Gmail đó

---

## 📞 Liên Hệ Support

### Nếu Vẫn Gặp Vấn Đề

1. **Đọc lại hướng dẫn** (chắc chắn làm đúng)
2. **Google documentation**: https://ai.google.dev/
3. **Tạo issue** trên GitHub của app này
4. **Google AI Studio Help**: Trong app có nút "Help"

---

## 🎓 Tài Liệu Thêm

- **Official Docs**: https://ai.google.dev/tutorials/get_started_web
- **API Reference**: https://ai.google.dev/api
- **Pricing**: https://ai.google.dev/pricing
- **Quota & Limits**: https://ai.google.dev/docs/quota

---

**Chúc bạn lấy API key thành công! 🎉**

Quay lại app và bắt đầu tạo video kinh dị thôi! 👻🎬
