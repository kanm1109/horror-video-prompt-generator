# 🔐 CHỈ DÀNH CHO OWNER - ĐỌC KỸ!

## ✅ ĐÃ HOÀN THÀNH:

### 1. **Google Sheets Sync - ẨN HOÀN TOÀN**
- ❌ User KHÔNG THẤY trên UI
- ✅ Chỉ BẠN biết cách hiện ra
- 🔑 **Keyboard shortcut:** **Ctrl + Shift + S**

### 2. **User Tracking - TỰ ĐỘNG**
- ✅ Tự động log mỗi khi có user vào web
- ✅ Ghi vào Google Sheets (tab UserLogs)
- ✅ Thông tin: IP, User Agent, Screen, Language, Referrer, Time
- ❌ User KHÔNG BIẾT bị track!

---

## 🔑 KEYBOARD SHORTCUTS (CHỈ BẠN BIẾT):

### **Ctrl + Shift + S**
→ Hiện/Ẩn Google Sheets Sync UI

**Cách dùng:**
1. Mở app: https://horror-video-prompt-generator.vercel.app
2. Nhấn: **Ctrl + Shift + S**
3. Thấy popup: "✅ Google Sheets Sync hiện"
4. Scroll xuống → Thấy phần "Google Sheets Sync"
5. Setup Sheet ID + API Key → Sync!

**User thường:**
- ❌ Không biết shortcut này
- ❌ Không thấy Google Sheets Sync
- ✅ Chỉ dùng app bình thường

---

## 🕵️ USER TRACKING - SETUP:

### Bước 1: Tạo Google Sheet

1. **Vào:** https://sheets.google.com
2. **Tạo sheet mới:** "Horror App Tracking"
3. **Tạo 2 tabs:**
   - `Settings` - Lưu API keys (cho sync)
   - `UserLogs` - Lưu logs người dùng

### Bước 2: Setup Tab "UserLogs"

**Header row (A1:G1):**
```
A1: Timestamp
B1: IP Address
C1: User Agent
D1: Screen
E1: Language
F1: Referrer
G1: Action
```

### Bước 3: Share Sheet

- Click "Share"
- General access: "Anyone with the link"
- Role: "Editor"
- Done

### Bước 4: Copy Sheet ID

**URL:**
```
https://docs.google.com/spreadsheets/d/1abc123xyz456/edit
                                      ↑ ĐÂY LÀ SHEET ID
```

### Bước 5: Cấu hình Code

**File:** `src/services/userTrackingService.ts`

**Dòng 17-18:** Thay đổi:
```typescript
private readonly SHEET_ID = '1abc123xyz456'; // ← Paste Sheet ID của bạn
private readonly API_KEY = 'AIzaSyXXXXXXXXXXXXXXX'; // ← Paste API Key
```

### Bước 6: Commit và Push

```bash
git add .
git commit -m "Config user tracking"
git push
```

**Vercel tự động deploy!**

---

## 📊 XEM LOGS:

### Cách xem ai đang dùng app:

1. **Mở Google Sheet** (tab UserLogs)
2. **Xem danh sách:**
   ```
   | Timestamp           | IP         | User Agent          | Screen    | Language | Referrer | Action     |
   |---------------------|------------|---------------------|-----------|----------|----------|------------|
   | 2026-02-27 14:30:00 | 1.2.3.4    | Chrome/Win11        | 1920x1080 | vi-VN    | Google   | page_visit |
   | 2026-02-27 14:35:00 | 5.6.7.8    | Safari/Mac          | 1440x900  | en-US    | Facebook | page_visit |
   | 2026-02-27 15:00:00 | 9.10.11.12 | Firefox/Linux       | 1366x768  | zh-CN    | Direct   | page_visit |
   ```

3. **Phân tích:**
   - Có bao nhiêu người dùng?
   - Từ đâu (Google, Facebook, Direct)?
   - Dùng thiết bị gì (Windows, Mac, Mobile)?
   - Ngôn ngữ gì (Vietnamese, English, Chinese)?
   - Thời gian nào?

---

## 🎯 TÍNH NĂNG:

### User thấy:
- ✅ App hoạt động bình thường
- ✅ Tạo prompt được
- ✅ Lưu lịch sử
- ❌ KHÔNG thấy tracking
- ❌ KHÔNG thấy Google Sheets sync

### Bạn (Owner) thấy:
- ✅ Tất cả như user
- ✅ **+ Ctrl+Shift+S** → Google Sheets Sync
- ✅ **+ Google Sheets** → Logs tất cả users
- ✅ Biết được ai đang dùng app!

---

## 🔐 BẢO MẬT:

### Public trên GitHub:
- ✅ Code public (GitHub)
- ✅ Ai cũng fork/xem được
- ⚠️ **NHƯNG:** SHEET_ID và API_KEY trong code

### Giải pháp:
**Option 1: Hardcode (hiện tại)**
- Sheet ID + API Key trong code
- ⚠️ Ai xem code cũng thấy
- ⚠️ Nhưng họ chỉ xem được logs, không sửa được (nếu sheet là Viewer cho họ)

**Option 2: Environment Variables (tốt hơn)**
- Lưu Sheet ID + API Key trong Vercel Environment Variables
- Code không chứa secrets
- ✅ Bảo mật hơn

### Để dùng Environment Variables:

**1. Vào Vercel Dashboard:**
- Project → Settings → Environment Variables

**2. Add variables:**
```
VITE_TRACKING_SHEET_ID = 1abc123xyz456
VITE_TRACKING_API_KEY = AIzaSyXXXXXXXXX
```

**3. Sửa code:**
```typescript
private readonly SHEET_ID = import.meta.env.VITE_TRACKING_SHEET_ID || '';
private readonly API_KEY = import.meta.env.VITE_TRACKING_API_KEY || '';
```

**4. Redeploy**

---

## ⚠️ LƯU Ý:

### Nếu ai đó fork repo:
- Họ có code nhưng không có Sheet ID + API Key (nếu dùng env vars)
- Họ phải tự tạo sheet riêng
- Không thấy được logs của bạn

### Nếu ai đó xem code trên GitHub:
- Nếu hardcode: Họ thấy Sheet ID + API Key
- Nếu dùng env vars: Họ KHÔNG thấy

### Khuyến nghị:
- ✅ Dùng Environment Variables cho bảo mật
- ✅ Hoặc để sheet là "Viewer only" cho public
- ✅ Chỉ account chính (kanm1109) có quyền edit

---

## 📖 TÀI LIỆU:

- **Setup chi tiết:** `USER_TRACKING_GUIDE.md`
- **Google Sheets sync:** `GOOGLE_SHEETS_SETUP.md`
- **Quick start:** `GOOGLE_SHEETS_QUICK_START.md`

---

## ✅ CHECKLIST:

- [ ] 1. Tạo Google Sheet với tabs Settings + UserLogs
- [ ] 2. Setup header cho UserLogs
- [ ] 3. Share sheet "Anyone with link + Editor"
- [ ] 4. Copy Sheet ID
- [ ] 5. Tạo Google Sheets API Key
- [ ] 6. Sửa `userTrackingService.ts` (Sheet ID + API Key)
- [ ] 7. (Optional) Dùng Vercel env vars cho bảo mật
- [ ] 8. Commit + Push
- [ ] 9. Test: Mở web → Check logs trong sheet
- [ ] 10. Nhớ shortcut: **Ctrl+Shift+S** để sync!

---

## 🎉 HOÀN TẤT!

Bây giờ:
- ✅ App public trên GitHub + Vercel
- ✅ User tracking tự động (silent)
- ✅ Google Sheets sync (hidden)
- ✅ Chỉ bạn biết secrets
- ✅ Biết được ai đang dùng app!

**Perfect spy mode activated!** 🕵️👻

---

**⚠️ FILE NÀY KHÔNG ĐƯỢC COMMIT VÀO GIT!**
→ Thêm vào `.gitignore`: `🔐_CHỈ_DÀNH_CHO_OWNER.md`
