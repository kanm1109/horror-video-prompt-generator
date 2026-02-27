# 📖 HƯỚNG DẪN CHO NGƯỜI MỚI - SETUP USER TRACKING

## 🎯 MỤC TIÊU:
Sau khi làm theo hướng dẫn này, bạn sẽ:
- ✅ Biết được ai vào xem website của bạn
- ✅ Xem được IP, thiết bị, thời gian của họ
- ✅ Tất cả tự động, không cần làm gì thêm

---

## ⏱️ THỜI GIAN: 10 PHÚT

---

## 📋 PHẦN 1: TẠO GOOGLE SHEET (5 PHÚT)

### Bước 1.1: Mở Google Sheets
1. **Mở trình duyệt** (Chrome, Edge, v.v.)
2. **Vào:** https://sheets.google.com
3. **Đăng nhập** Google (nếu chưa đăng nhập)

### Bước 1.2: Tạo Sheet Mới
1. **Thấy màn hình Google Sheets**
2. **Tìm nút "Blank"** (ô trắng với dấu +)
   ```
   [+] Blank    ← Click vào đây
   ```
3. **Click vào "Blank"**
4. **Một sheet mới mở ra**

### Bước 1.3: Đặt Tên Sheet
1. **Góc trên bên trái**, thấy "Untitled spreadsheet"
2. **Click vào "Untitled spreadsheet"**
3. **Đổi tên thành:** `Horror App Tracking`
4. **Enter** (hoặc click ra ngoài)

### Bước 1.4: Tạo Tab "UserLogs"
1. **Dưới cùng màn hình**, thấy tab "Sheet1"
2. **Click chuột phải vào "Sheet1"**
3. **Chọn "Rename"**
4. **Đổi tên thành:** `UserLogs`
5. **Enter**

### Bước 1.5: Nhập Header (Tiêu đề cột)
**Bây giờ bạn ở tab "UserLogs". Nhập vào các ô như sau:**

| Ô | Nhập gì |
|---|---------|
| **A1** | `Timestamp` |
| **B1** | `IP Address` |
| **C1** | `User Agent` |
| **D1** | `Screen` |
| **E1** | `Language` |
| **F1** | `Referrer` |
| **G1** | `Action` |

**Cách nhập:**
1. Click vào ô **A1**
2. Gõ: `Timestamp`
3. Nhấn **Tab** (sang ô B1)
4. Gõ: `IP Address`
5. Nhấn **Tab** (sang ô C1)
6. Tiếp tục cho đến G1

**Kết quả:** 
```
Row 1: | Timestamp | IP Address | User Agent | Screen | Language | Referrer | Action |
```

### Bước 1.6: Share Sheet (Quan Trọng!)
1. **Góc phải trên**, tìm nút **"Share"**
2. **Click "Share"**
3. **Thấy popup "Share 'Horror App Tracking'"**
4. **Phần "General access":**
   - Click vào **"Restricted"**
   - Chọn **"Anyone with the link"**
5. **Dropdown bên phải:**
   - Chọn **"Editor"** (không phải Viewer!)
6. **Click "Done"**

### Bước 1.7: Copy Sheet ID (Rất Quan Trọng!)
1. **Nhìn thanh địa chỉ (URL bar) trên cùng**
2. **URL có dạng:**
   ```
   https://docs.google.com/spreadsheets/d/1abc123xyz456789/edit
   ```
3. **Phần giữa `d/` và `/edit` là SHEET ID**
   ```
   1abc123xyz456789  ← ĐÂY LÀ SHEET ID
   ```
4. **Copy Sheet ID này:**
   - Bôi đen: `1abc123xyz456789`
   - Ctrl+C (hoặc chuột phải → Copy)
5. **Paste vào Notepad** để lưu tạm

**✅ XONG PHẦN 1! Bạn đã có Google Sheet!**

---

## 📋 PHẦN 2: TẠO GOOGLE CLOUD PROJECT & API KEY (5 PHÚT)

### Bước 2.1: Vào Google Cloud Console
1. **Mở tab mới trong trình duyệt**
2. **Vào:** https://console.cloud.google.com
3. **Đăng nhập** Google (cùng account với Google Sheets)

### Bước 2.2: Tạo Project Mới
1. **Góc trên bên trái**, thấy "Select a project"
2. **Click vào "Select a project"**
3. **Popup hiện ra, click "NEW PROJECT"** (góc phải trên popup)
4. **Điền form:**
   - Project name: `Horror App` (hoặc tên gì cũng được)
   - Location: Để mặc định
5. **Click "CREATE"**
6. **Đợi 30 giây** (có loading indicator)
7. **Thấy "Project created"**

### Bước 2.3: Chọn Project Vừa Tạo
1. **Lại click "Select a project"** (góc trên trái)
2. **Tìm "Horror App"** trong danh sách
3. **Click vào "Horror App"**
4. **Góc trên trái giờ hiển thị: "Horror App"**

### Bước 2.4: Enable Google Sheets API
1. **Thanh search (góc trên giữa)**, gõ: `Sheets API`
2. **Kết quả hiện ra, click vào "Google Sheets API"**
3. **Trang mới mở ra, thấy nút "ENABLE"**
4. **Click "ENABLE"**
5. **Đợi 30 giây**
6. **Thấy "API enabled"**

### Bước 2.5: Tạo API Key
1. **Left sidebar (menu bên trái):**
   - Click "APIs & Services"
   - Click "Credentials"
2. **Góc trên, click "CREATE CREDENTIALS"**
3. **Chọn "API key"**
4. **Popup hiện API key:**
   ```
   AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
5. **Click "COPY"** để copy API key
6. **Paste vào Notepad** (cùng chỗ với Sheet ID)

### Bước 2.6: Restrict API Key (Bảo Mật)
1. **Trong popup vừa copy API key, click "RESTRICT KEY"**
2. **Hoặc trong trang Credentials, tìm API key vừa tạo, click vào nó**
3. **Phần "API restrictions":**
   - Chọn: **"Restrict key"**
4. **Dropdown "Select APIs":**
   - Tìm: `Google Sheets API`
   - ✅ **Tick vào "Google Sheets API"**
5. **Scroll xuống, click "SAVE"**
6. **Đợi vài giây**

**✅ XONG PHẦN 2! Bạn đã có API Key!**

---

## 📋 PHẦN 3: CẬP NHẬT CODE (2 PHÚT)

### Bước 3.1: Mở VS Code (hoặc Text Editor)
1. **Mở VS Code** (hoặc Notepad++, Sublime, v.v.)
2. **File → Open Folder**
3. **Chọn folder:** `horror-video-prompt-generator`
4. **Click "Select Folder"**

### Bước 3.2: Mở File cần sửa
1. **Left sidebar (File Explorer)**
2. **Mở folder:** `src` → `services`
3. **Click vào file:** `userTrackingService.ts`
4. **File mở ra**

### Bước 3.3: Tìm Dòng Cần Sửa
1. **Ctrl+F** (Find)
2. **Search:** `YOUR_SHEET_ID_HERE`
3. **Thấy dòng 17:**
   ```typescript
   private readonly SHEET_ID = 'YOUR_SHEET_ID_HERE';
   ```

### Bước 3.4: Thay Thế Sheet ID
1. **Mở Notepad** (nơi lưu Sheet ID)
2. **Copy Sheet ID:** `1abc123xyz456789`
3. **Quay lại VS Code**
4. **Thay thế:**
   - **Cũ:** `'YOUR_SHEET_ID_HERE'`
   - **Mới:** `'1abc123xyz456789'` (paste Sheet ID của bạn, GIỮ NGUYÊN dấu nháy '')
5. **Kết quả:**
   ```typescript
   private readonly SHEET_ID = '1abc123xyz456789';
   ```

### Bước 3.5: Thay Thế API Key
1. **Tìm dòng 18:**
   ```typescript
   private readonly API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY_HERE';
   ```
2. **Mở Notepad** (nơi lưu API Key)
3. **Copy API Key:** `AIzaSyXXXXXXXXXXXXXXXXXX`
4. **Thay thế:**
   - **Cũ:** `'YOUR_GOOGLE_SHEETS_API_KEY_HERE'`
   - **Mới:** `'AIzaSyXXXXXXXXXXXXXXXXXX'` (paste API key của bạn, GIỮ NGUYÊN dấu nháy '')
5. **Kết quả:**
   ```typescript
   private readonly API_KEY = 'AIzaSyXXXXXXXXXXXXXXXXXX';
   ```

### Bước 3.6: Lưu File
1. **Ctrl+S** (Save)
2. **Hoặc File → Save**

**✅ XONG PHẦN 3! Code đã cập nhật!**

---

## 📋 PHẦN 4: PUSH CODE LÊN GITHUB (2 PHÚT)

### Bước 4.1: Mở Terminal
1. **Trong VS Code:**
   - Menu: Terminal → New Terminal
   - Hoặc: Ctrl+` (dấu backtick)
2. **Terminal mở ở dưới màn hình**

### Bước 4.2: Chạy Git Commands
**Copy và paste từng dòng này vào Terminal, nhấn Enter sau mỗi dòng:**

```bash
git add .
```
**Nhấn Enter, đợi 1 giây**

```bash
git commit -m "Enable user tracking with Google Sheets"
```
**Nhấn Enter, đợi 2 giây**

```bash
git push
```
**Nhấn Enter**

### Bước 4.3: Đợi Push Xong
**Sẽ thấy:**
```
Enumerating objects: ...
Writing objects: 100% ...
To https://github.com/kanm1109/horror-video-prompt-generator.git
   xxx..xxx  main -> main
```

**✅ Code đã lên GitHub!**

**✅ XONG PHẦN 4!**

---

## 📋 PHẦN 5: ĐỢI VERCEL DEPLOY (2 PHÚT)

### Bước 5.1: Vào Vercel Dashboard
1. **Mở trình duyệt**
2. **Vào:** https://vercel.com/dashboard
3. **Login** (nếu chưa login)

### Bước 5.2: Xem Deploy Status
1. **Thấy project:** `horror-video-prompt-generator`
2. **Thấy status:** "Building..." hoặc "Deploying..."
3. **Click vào project** để xem chi tiết

### Bước 5.3: Đợi Deploy Xong
**Đợi 1-2 phút, sẽ thấy:**
```
✅ Ready
Production: https://horror-video-prompt-generator.vercel.app
```

**✅ XONG! APP ĐÃ LIVE!**

---

## 📋 PHẦN 6: TEST TRACKING (1 PHÚT)

### Bước 6.1: Mở Website
1. **Click vào URL:** https://horror-video-prompt-generator.vercel.app
2. **Website mở ra**

### Bước 6.2: Đợi 5 Giây
**Chỉ cần mở website, không cần làm gì cả!**
- Tracking tự động chạy
- Ghi log vào Google Sheets

### Bước 6.3: Kiểm Tra Google Sheet
1. **Mở tab Google Sheets** (Horror App Tracking)
2. **Tab "UserLogs"**
3. **Thấy dòng mới (row 2):**
   ```
   | 2026-02-27... | 1.2.3.4 | Chrome/Windows | 1920x1080 | vi-VN | Direct | page_visit |
   ```

**✅ NẾU THẤY DÒNG MỚI → THÀNH CÔNG!**

---

## 🎉 HOÀN TẤT!

### Bạn đã có:
- ✅ Google Sheet để xem logs
- ✅ User tracking tự động
- ✅ Mỗi khi có người vào web → Tự động ghi log
- ✅ Bạn biết được: IP, thiết bị, thời gian

### Cách xem logs:
1. **Mở Google Sheet: Horror App Tracking**
2. **Tab: UserLogs**
3. **Xem danh sách người đã vào!**

---

## 🔑 BÍ MẬT CHỈ BẠN BIẾT:

### Hiện Google Sheets Sync:
- **Mở website**
- **Nhấn:** **Ctrl + Shift + S**
- **Thấy phần "Google Sheets Sync"**
- **Setup để sync API key giữa các thiết bị!**

---

## ❓ NẾU GẶP LỖI:

### Không thấy log trong Sheet:
**Check:**
1. ✅ Sheet ID đã đúng chưa? (dòng 17 trong code)
2. ✅ API Key đã đúng chưa? (dòng 18 trong code)
3. ✅ Sheet có tab tên "UserLogs" chưa? (chính xác tên)
4. ✅ Sheet đã share "Anyone with link + Editor"?

### Sửa lại:
1. **Quay lại Phần 3** (Cập nhật code)
2. **Check lại Sheet ID và API Key**
3. **Lưu file (Ctrl+S)**
4. **Quay lại Phần 4** (Push code)

### Vẫn lỗi:
**Mở website → F12 (Developer Console) → Tab "Console" → Xem có lỗi gì không**

**Copy lỗi và tìm tôi giúp!**

---

## 📖 TÀI LIỆU THÊM:

- `🔐_CHỈ_DÀNH_CHO_OWNER.md` - Thông tin bảo mật
- `USER_TRACKING_GUIDE.md` - Hướng dẫn chi tiết
- `GOOGLE_SHEETS_SETUP.md` - Setup Google Sheets

---

## ✅ CHECKLIST HOÀN CHỈNH:

- [ ] 1. Tạo Google Sheet
- [ ] 2. Đổi tab thành "UserLogs"
- [ ] 3. Nhập header (A1:G1)
- [ ] 4. Share sheet "Anyone with link + Editor"
- [ ] 5. Copy Sheet ID
- [ ] 6. Tạo Google Cloud Project
- [ ] 7. Enable Google Sheets API
- [ ] 8. Tạo API Key
- [ ] 9. Restrict API Key
- [ ] 10. Sửa code (Sheet ID + API Key)
- [ ] 11. Lưu file (Ctrl+S)
- [ ] 12. Git add, commit, push
- [ ] 13. Đợi Vercel deploy
- [ ] 14. Test website
- [ ] 15. Check logs trong Sheet
- [ ] 16. ✅ DONE!

---

**Làm từng bước, không vội, sẽ thành công!** 🎉

**Có vấn đề gì cứ hỏi tôi!** 💬
