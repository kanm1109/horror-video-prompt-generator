# 📖 HƯỚNG DẪN CHI TIẾT - TIẾNG VIỆT

## 🎯 Mục Đích App

App này giúp bạn chuyển đổi kịch bản video kinh dị/bí ẩn từ **tiếng Việt** sang **prompt tiếng Anh chuyên nghiệp** để tạo video bằng **Sora AI**.

Phù hợp cho: YouTubers làm nội dung kinh dị, bí ẩn, creepypasta.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT (CHI TIẾT)

### Bước 1: Cài Node.js

1. Truy cập: https://nodejs.org/
2. Tải bản **LTS** (khuyến nghị)
3. Chạy file cài đặt
4. Nhấn "Next" cho đến hết
5. Kiểm tra: Mở **Command Prompt** và gõ:
   ```
   node --version
   ```
   Nếu hiện số version → OK!

### Bước 2: Tải App

**Cách 1: Nếu có Git**
```bash
git clone <link-repo>
cd horror-video-prompt-generator
```

**Cách 2: Không có Git**
1. Download file ZIP từ GitHub
2. Giải nén vào thư mục bất kỳ
3. Mở **Command Prompt** tại thư mục đó

### Bước 3: Cài Dependencies

Mở Command Prompt tại thư mục app, gõ:
```bash
npm install
```

Đợi 2-5 phút cho nó tải về (tùy mạng).

### Bước 4: Lấy Gemini API Key

**Chi tiết từng bước:**

1. **Mở trình duyệt**, truy cập:
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Đăng nhập** bằng tài khoản Google (Gmail)

3. Nhìn sang bên trái, tìm nút **"Get API key"** hoặc **"Create API key"**

4. Click vào đó, chọn:
   - **"Create API key in new project"** (tạo key mới)
   - HOẶC chọn project có sẵn nếu bạn đã có

5. API key sẽ hiện ra dạng:
   ```
   AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

6. **QUAN TRỌNG:** Click **Copy** ngay! Key này chỉ hiện 1 lần.

7. Paste vào Notepad và lưu lại để dùng sau.

### Bước 5: Chạy App

Trong Command Prompt, gõ:
```bash
npm run dev
```

App sẽ tự động mở! 🎉

---

## 🎮 HƯỚNG DẪN SỬ DỤNG

### Lần Đầu Tiên Mở App

1. **Màn hình đầu tiên**: Nhập API Key
   - Paste API key bạn vừa copy
   - Click **"Test API Key"**
   - Đợi 2-3 giây
   - Thấy ✅ "API Key hợp lệ!" → OK!

2. **Sau khi test thành công**:
   - App sẽ tự động lưu key
   - Lần sau không cần nhập lại
   - Key được lưu LOCAL (trên máy bạn)

### Tạo Prompt Video

#### 1️⃣ Viết Kịch Bản

Ở ô **"Kịch Bản Video"** (bên trái), nhập kịch bản tiếng Việt.

**Tips viết kịch bản hay:**
- Mô tả chi tiết cảnh quay
- Nói rõ ánh sáng (tối, mờ, le lói, v.v.)
- Mô tả chuyển động (từ từ, đột ngột, v.v.)
- Góc máy (zoom in, từ xa, góc lệch, v.v.)

**Ví dụ TỐT:**
```
Căn phòng tối tăm, chỉ có ngọn nến nhấp nháy ở góc bàn.
Camera từ từ zoom vào tấm gương cổ treo tường.
Trong gương, bóng người từ từ hiện ra phía sau, 
nhưng khi quay lại thì không có ai.
Đôi mắt trong gương nhìn thẳng ra ngoài.
```

**Ví dụ KHÔNG TốT (quá ngắn):**
```
Có ma trong gương.
```

#### 2️⃣ Tạo Prompt

- Click nút **"Tạo Prompt"** (nút đỏ lớn)
- Đợi 5-10 giây
- AI sẽ phân tích và tạo prompt

#### 3️⃣ Xem Kết Quả

Ở ô **"Prompt Sora"** (bên phải), bạn sẽ thấy:

- **Main Prompt**: Prompt tiếng Anh chi tiết
- **Style**: Phong cách (vd: cinematic horror)
- **Mood**: Tâm trạng (vd: eerie, terrifying)
- **Camera**: Góc máy (vd: slow zoom)
- **Lighting**: Ánh sáng (vd: dim shadows)
- **Sound**: Gợi ý âm thanh (vd: whispers)
- **Full JSON**: Format JSON hoàn chỉnh

#### 4️⃣ Sử Dụng Prompt

**Copy Prompt:**
- Click nút **"Copy"** bên cạnh prompt
- Paste vào Sora AI

**Download JSON:**
- Click nút **"JSON"** ở góc trên
- File JSON sẽ được tải về

### Lịch Sử

- Tất cả prompts được lưu tự động
- Xem ở phần **"Lịch Sử"** bên dưới
- Click vào item cũ để tải lại
- Click **"Xóa Tất Cả"** để xóa lịch sử

---

## 🎨 MẸO TẠO PROMPT HAY

### 1. Mô Tả Chi Tiết Ánh Sáng

**Tốt:**
```
Ánh nến le lói tạo bóng đổ rợn người trên tường
```

**Không tốt:**
```
Tối
```

### 2. Mô Tả Chuyển Động

**Tốt:**
```
Camera từ từ zoom vào đôi mắt búp bê, 
đột ngột đầu búp bê xoay 90 độ nhìn thẳng vào camera
```

**Không tốt:**
```
Búp bê động
```

### 3. Thêm Chi Tiết Bối Cảnh

**Tốt:**
```
Hành lang bệnh viện bỏ hoang, sơn bong tróc,
đèn huỳnh quang nhấp nháy, tiếng bước chân vọng lại
```

**Không tốt:**
```
Bệnh viện ma
```

### 4. Sử Dụng Từ Gợi Cảm

Dùng từ như:
- Rợn người, ghê rợn, lạnh gáy
- Từ từ, âm thầm, lặng lẽ
- Đột ngột, bất ngờ, giật mình
- Mờ ảo, mơ hồ, không rõ

---

## 💰 CHI PHÍ

### Hoàn Toàn MIỄN PHÍ! 🎉

- **App**: Miễn phí 100%
- **Gemini API**: Miễn phí
  - 15 requests/phút
  - Không giới hạn số lượng mỗi ngày
  - Không cần thẻ tín dụng

**So sánh với các giải pháp khác:**
- OpenAI GPT-4: $0.03/request (~600đ)
- Claude: $0.024/request (~500đ)
- **Gemini: $0** ✅

---

## ⚠️ XỬ LÝ LỖI

### Lỗi: "API key invalid"

**Nguyên nhân:**
- API key sai
- Copy không đủ (thiếu ký tự)

**Cách fix:**
1. Quay lại https://aistudio.google.com/app/apikey
2. Copy lại key, chắc chắn copy HẾT
3. Paste lại vào app

### Lỗi: "Quota exceeded" hoặc "429"

**Nguyên nhân:**
- Bạn dùng quá 15 requests trong 1 phút

**Cách fix:**
- Đợi 1 phút rồi thử lại
- Hoặc tạo API key mới (email khác)

### App không mở

**Kiểm tra:**
1. Đã cài Node.js chưa? (`node --version`)
2. Đã chạy `npm install` chưa?
3. Có lỗi gì khi chạy `npm run dev`?

**Cách fix:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
npm run dev
```

### Lỗi "Cannot find module"

**Cách fix:**
```bash
npm install
```

---

## 🎯 CÂU HỎI THƯỜNG GẶP

### 1. API key có bị mất không?
**Không.** Key được lưu trên máy bạn (localStorage), không gửi đi đâu.

### 2. Có giới hạn số lượng prompt không?
**Không.** Gemini free tier cho phép tạo không giới hạn, chỉ giới hạn 15 requests/phút.

### 3. Có thể dùng offline không?
**Không.** App cần internet để kết nối Gemini API.

### 4. Prompt có được lưu đâu?
**Có.** Tất cả prompts lưu trong **Lịch Sử**, và được lưu LOCAL trên máy.

### 5. Tôi có thể chỉnh sửa prompt không?
**Có.** Sau khi tạo, bạn copy ra và sửa tùy ý.

### 6. Làm video bao lâu?
**5 giây.** Prompt được tối ưu cho video 5 giây.

### 7. Tôi có thể dùng cho chủ đề khác không?
**Có thể**, nhưng app được tối ưu cho horror/mystery. Các thể loại khác có thể không tốt bằng.

---

## 🚀 NEXT STEPS

Sau khi tạo prompt:

1. **Copy prompt** từ app
2. Truy cập **Sora AI** (khi có quyền truy cập)
3. Paste prompt vào
4. Chọn settings (nếu cần)
5. Generate video!
6. Download và edit thêm nếu muốn
7. Upload lên YouTube! 🎬

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Đọc lại phần "Xử Lý Lỗi"
2. Đảm bảo làm đúng các bước
3. Kiểm tra internet connection
4. Tạo issue trên GitHub

---

**Chúc bạn thành công với kênh YouTube kinh dị! 👻🎬**
