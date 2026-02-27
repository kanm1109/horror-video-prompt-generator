# 🚀 GOOGLE SHEETS SYNC - QUICK START

## ✅ ĐÃ HOÀN THÀNH:

Tính năng sync API key qua Google Sheets đã được thêm vào app!

---

## 🎯 LỢI ÍCH:

- ✅ **Sync API key giữa nhiều thiết bị** (PC, laptop, tablet)
- ✅ **Backup API key** trên cloud
- ✅ **Tự động cập nhật** khi thay đổi
- ✅ **Miễn phí 100%** (Google Sheets free)

---

## 🚀 CÁCH SỬ DỤNG NHANH:

### Bước 1: Tạo Google Sheet (2 phút)

1. **Vào:** https://sheets.google.com
2. **Tạo sheet mới** (Blank)
3. **Đặt tên:** `Horror App Settings`
4. **Tạo tab tên:** `Settings` (quan trọng!)
5. **Nhập dữ liệu:**
   ```
   A1: api_key     | B1: [Paste Gemini API key vào đây]
   A2: selected_model | B2: auto
   ```
6. **Share sheet:**
   - Click "Share" (góc phải)
   - General access: "Anyone with the link"
   - Role: "Editor" (để ghi được)
   - Copy URL

7. **Copy Sheet ID:**
   ```
   URL: https://docs.google.com/spreadsheets/d/1abc123xyz/edit
                                                  ↑ ĐÂY LÀ SHEET ID
   ```

---

### Bước 2: Tạo Google Sheets API Key (3 phút)

1. **Vào:** https://console.cloud.google.com
2. **Tạo project mới:**
   - "Select a project" → "New Project"
   - Name: `Horror App`
   - Create

3. **Enable API:**
   - Search: "Google Sheets API"
   - Click → Enable
   - Đợi 30 giây

4. **Tạo API Key:**
   - Left menu: "APIs & Services" → "Credentials"
   - "Create Credentials" → "API key"
   - Copy API key: `AIzaSy...`

5. **Restrict key (quan trọng!):**
   - Click "Restrict Key"
   - API restrictions: "Restrict key"
   - Select APIs: ✅ Google Sheets API
   - Save

---

### Bước 3: Setup trong App (1 phút)

1. **Mở app:** http://localhost:5173 (hoặc Vercel URL)

2. **Scroll xuống phần "Google Sheets Sync"**

3. **Click "Setup"**

4. **Nhập thông tin:**
   - Google Sheet ID: `1abc123xyz` (từ Bước 1.7)
   - Google Sheets API Key: `AIzaSy...` (từ Bước 2.4)

5. **Click "✓ Kết nối"**

6. **Thấy:** `✅ Kết nối Google Sheets thành công!`

7. **Click "Sync API Key từ Sheet"**

8. **Done!** API key đã được sync!

---

## 🎉 HOÀN TẤT!

### Bây giờ:
- ✅ API key lưu trong Google Sheets
- ✅ Sync tự động giữa các thiết bị
- ✅ Mở app trên máy khác → Click "Sync" → API key tự động điền!

### Test sync:
1. **Máy 1:** Setup Google Sheets
2. **Máy 2:** Mở app → Setup với cùng Sheet ID + API Key
3. **Máy 2:** Click "Sync" → API key tự động điền! ✨

---

## 📊 ĐÃ THÊM VÀO APP:

### Files mới:
1. ✅ `src/services/googleSheetsService.ts` - Service xử lý sync
2. ✅ `src/components/GoogleSheetsSync.tsx` - UI component
3. ✅ `GOOGLE_SHEETS_SETUP.md` - Hướng dẫn chi tiết
4. ✅ `GOOGLE_SHEETS_QUICK_START.md` - Hướng dẫn nhanh (file này)

### Features:
- ✅ Setup UI với validation
- ✅ Test connection
- ✅ Read/Write Google Sheets
- ✅ Auto sync API key
- ✅ Disconnect option
- ✅ Status messages
- ✅ Error handling

---

## ⚠️ LƯU Ý:

### Bảo mật:
- ⚠️ Sheet phải public ("Anyone with link") để app đọc được
- ⚠️ Nếu muốn private hơn → Dùng Service Account (phức tạp)
- ✅ Google Sheets API Key đã restrict chỉ cho Sheets API
- ✅ Gemini API Key lưu trong sheet (không commit vào Git)

### Google Sheets API Free Limits:
- ✅ 60 requests/phút
- ✅ Unlimited sheets
- ✅ Đủ cho app cá nhân!

### Nếu lỗi:
1. **"Lỗi đọc sheet"** → Check Sheet ID có đúng không
2. **"Permission denied"** → Sheet chưa public
3. **"API key invalid"** → Check API key và restrict settings
4. **"Sheet not found"** → Tab phải tên "Settings"

---

## 🎯 CÁCH DÙNG SAU KHI SETUP:

### Mỗi lần mở app:
1. App tự động load config từ localStorage
2. Thấy icon Cloud 🟢 (đã kết nối)
3. Click "Sync API Key từ Sheet"
4. API key tự động điền!

### Thay đổi API key:
1. **Cách 1:** Đổi trong Google Sheet → Click "Sync"
2. **Cách 2:** Đổi trong app → Tự động ghi vào sheet

### Ngắt kết nối:
1. Click "Cài đặt"
2. Click "Ngắt"
3. Config bị xóa khỏi localStorage

---

## 📖 DOCUMENTATION ĐẦY ĐỦ:

- **Quick Start:** `GOOGLE_SHEETS_QUICK_START.md` (file này)
- **Chi tiết setup:** `GOOGLE_SHEETS_SETUP.md`
- **Code:** `src/services/googleSheetsService.ts`

---

## ✅ CHECKLIST HOÀN CHỈNH:

- [ ] 1. Tạo Google Sheet với tab "Settings"
- [ ] 2. Nhập api_key vào A1:B1
- [ ] 3. Share sheet "Anyone with link" + "Editor"
- [ ] 4. Copy Sheet ID
- [ ] 5. Tạo Google Cloud Project
- [ ] 6. Enable Google Sheets API
- [ ] 7. Tạo API Key
- [ ] 8. Restrict key cho Sheets API
- [ ] 9. Mở app → Setup → Nhập Sheet ID + API Key
- [ ] 10. Click "Kết nối"
- [ ] 11. Click "Sync API Key từ Sheet"
- [ ] 12. ✅ DONE!

---

**Thời gian tổng:** ~6 phút  
**Kết quả:** API key sync tự động giữa các thiết bị! 🎉

---

**Có vấn đề?** Đọc `GOOGLE_SHEETS_SETUP.md` để biết thêm chi tiết!
