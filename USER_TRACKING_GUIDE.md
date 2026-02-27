# 🕵️ HƯỚNG DẪN USER TRACKING

## 🎯 MỤC ĐÍCH:
Track người dùng khi họ vào web (IP, thời gian, thiết bị) vào Google Sheets để bạn biết ai đang dùng app.

---

## ✅ ĐÃ THỰC HIỆN:

### 1. **Giấu Google Sheets Sync UI**
- ❌ Không hiển thị trên giao diện mặc định
- ✅ Chỉ bạn (owner) mới biết cách hiện ra
- 🔐 **Cách hiện:** Nhấn **Ctrl + Shift + S** (keyboard shortcut)

### 2. **Auto User Tracking**
- ✅ Tự động log khi user vào trang
- ✅ Ghi vào Google Sheets
- ✅ Thông tin log: IP, User Agent, Screen, Language, Referrer, Timestamp

---

## 📋 SETUP USER TRACKING:

### Bước 1: Tạo Google Sheet cho Logs

1. **Vào:** https://sheets.google.com
2. **Tạo sheet mới** hoặc dùng sheet hiện tại
3. **Tạo tab mới tên:** `UserLogs` (quan trọng!)
4. **Tạo header row:**
   ```
   A1: Timestamp
   B1: IP Address
   C1: User Agent
   D1: Screen
   E1: Language
   F1: Referrer
   G1: Action
   ```

5. **Share sheet:**
   - "Anyone with link" + "Editor"

6. **Copy Sheet ID** từ URL

---

### Bước 2: Tạo Google Sheets API Key (nếu chưa có)

1. **Vào:** https://console.cloud.google.com
2. **Enable:** Google Sheets API
3. **Create Credentials:** API Key
4. **Restrict Key:** Chỉ cho Sheets API
5. **Copy API Key**

---

### Bước 3: Cấu hình trong Code

**File:** `src/services/userTrackingService.ts`

**Dòng 17-18:** Thay thế:
```typescript
private readonly SHEET_ID = 'YOUR_SHEET_ID_HERE'; // ← Paste Sheet ID
private readonly API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY_HERE'; // ← Paste API Key
```

**Ví dụ:**
```typescript
private readonly SHEET_ID = '1abc123xyz456';
private readonly API_KEY = 'AIzaSyXXXXXXXXXXXXXXXXXXX';
```

---

### Bước 4: Build và Deploy

```bash
cd horror-video-prompt-generator

# Sửa file userTrackingService.ts (như Bước 3)

# Commit và push
git add .
git commit -m "Enable user tracking"
git push

# Vercel tự động deploy!
```

---

## 🎉 HOẠT ĐỘNG NHƯ THẾ NÀO:

### Khi có user vào web:

1. **User mở:** https://horror-video-prompt-generator.vercel.app
2. **App tự động:**
   - Lấy IP address (qua api.ipify.org)
   - Lấy User Agent (browser, OS)
   - Lấy Screen resolution
   - Lấy Language, Referrer
   - Ghi tất cả vào Google Sheets tab `UserLogs`

3. **Bạn thấy trong Sheet:**
   ```
   | Timestamp           | IP Address  | User Agent        | Screen    | Language | Referrer | Action     |
   |---------------------|-------------|-------------------|-----------|----------|----------|------------|
   | 2026-02-27 14:30:00 | 1.2.3.4     | Chrome/Windows 11 | 1920x1080 | vi-VN    | Google   | page_visit |
   | 2026-02-27 14:35:12 | 5.6.7.8     | Safari/Mac        | 1440x900  | en-US    | Direct   | page_visit |
   ```

---

## 🔐 BẢO MẬT:

### Google Sheets Sync (Chỉ bạn dùng):
- ❌ **Ẩn** trên UI (người dùng không thấy)
- ✅ **Hiện** bằng: **Ctrl + Shift + S**
- ✅ Chỉ bạn biết shortcut này!

### User không biết bị track:
- ✅ Không có UI nào hiển thị
- ✅ Log chạy silent trong background
- ✅ Không ảnh hưởng performance

---

## 📊 DỮ LIỆU THU THẬP:

### Thông tin cơ bản:
- ✅ **Timestamp:** Thời gian truy cập
- ✅ **IP Address:** IP của user
- ✅ **User Agent:** Browser + OS (e.g., Chrome 120.0 / Windows 11)
- ✅ **Screen Resolution:** 1920x1080
- ✅ **Language:** vi-VN, en-US, etc.
- ✅ **Referrer:** Google, Facebook, Direct, etc.
- ✅ **Action:** page_visit, generate_prompt, etc.

### Không thu thập:
- ❌ Tên, email (không có thông tin cá nhân)
- ❌ Password, API keys
- ❌ Nội dung kịch bản, prompts

---

## 🎯 CÁCH SỬ DỤNG:

### Xem logs:
1. **Mở Google Sheet** (tab UserLogs)
2. **Xem danh sách** user đã truy cập
3. **Phân tích:**
   - Có bao nhiêu user?
   - Từ đâu (referrer)?
   - Dùng thiết bị gì?
   - Thời gian nào?

### Track thêm actions:
**File:** `src/App.tsx`

**Thêm tracking khi generate prompt:**
```typescript
const handleGenerate = async () => {
  // ... existing code ...
  
  // Track action
  userTrackingService.logAction('generate_prompt')
  
  // ... rest of code ...
}
```

---

## ⚙️ TÙY CHỈNH:

### Thay đổi sheet name:
**File:** `userTrackingService.ts` dòng 19:
```typescript
private readonly LOG_SHEET_NAME = 'UserLogs'; // Đổi tên nếu muốn
```

### Disable tracking:
**File:** `userTrackingService.ts` dòng 17-18:
```typescript
private readonly SHEET_ID = ''; // ← Để trống
private readonly API_KEY = '';  // ← Để trống
```

### Log thêm thông tin:
Sửa `getUserInfo()` method để thêm fields.

---

## 🔧 TROUBLESHOOTING:

### Không thấy logs trong Sheet:
1. ✅ Check Sheet ID đúng?
2. ✅ Check API Key đúng?
3. ✅ Sheet có tab tên "UserLogs"?
4. ✅ Sheet đã share "Anyone with link + Editor"?
5. ✅ Check console (F12) có lỗi không?

### Lỗi: "Failed to append":
- Sheet chưa có quyền Editor
- API Key sai hoặc bị restrict sai

### IP hiển thị "Unknown":
- Service ipify.org down
- User dùng VPN/Proxy

---

## 📖 KEYBOARD SHORTCUTS:

### Ctrl + Shift + S
- **Hiện/Ẩn** Google Sheets Sync UI
- Chỉ bạn (owner) biết
- User thường không thấy

---

## ✅ CHECKLIST SETUP:

- [ ] 1. Tạo Google Sheet với tab "UserLogs"
- [ ] 2. Thêm header row (A1:G1)
- [ ] 3. Share sheet "Anyone + Editor"
- [ ] 4. Copy Sheet ID
- [ ] 5. Tạo/lấy Google Sheets API Key
- [ ] 6. Sửa `userTrackingService.ts` (SHEET_ID, API_KEY)
- [ ] 7. Git commit + push
- [ ] 8. Vercel deploy
- [ ] 9. Test: Mở web → Check sheet có log mới
- [ ] 10. ✅ DONE!

---

## 🎊 KẾT QUẢ:

### Bạn có:
- ✅ Web app public (GitHub + Vercel)
- ✅ User tracking tự động
- ✅ Google Sheets Sync (ẩn, chỉ bạn dùng)
- ✅ Biết được ai đang dùng app
- ✅ Dữ liệu trong Google Sheets (easy to analyze)

### User chỉ thấy:
- ✅ App hoạt động bình thường
- ❌ Không thấy tracking
- ❌ Không thấy Google Sheets sync
- ✅ Clean UI, professional

---

**Perfect for tracking users without them knowing!** 🕵️👻
