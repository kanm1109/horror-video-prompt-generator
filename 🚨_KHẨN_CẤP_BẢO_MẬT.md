# 🚨 KHẨN CẤP - API KEY BỊ LỘ!

## ⚠️ VẤN ĐỀ:

GitHub phát hiện API key trong code public và gửi cảnh báo!

**API key bị lộ:**
```
AIzaSyDVXPbUXJmwL9eYcBu7T77XZ54ytRfjymk
```

**Nguy cơ:**
- Ai cũng xem được code trên GitHub
- Có thể copy API key và dùng
- Tốn quota Google Sheets của bạn
- Có thể đọc/ghi sheets của bạn

---

## 🔧 GIẢI PHÁP - LÀM NGAY (10 PHÚT):

### BƯỚC 1: REVOKE (XÓA) API KEY CŨ (2 phút)

1. **Vào:** https://console.cloud.google.com/apis/credentials
2. **Select project:** Horror App (hoặc project bạn dùng)
3. **Tìm API key:** `AIzaSyDVXPbUXJmwL9eYcBu7T77XZ54ytRfjymk`
4. **Click vào API key đó**
5. **Click "DELETE"** (hoặc dấu thùng rác)
6. **Confirm Delete**

**✅ API key cũ đã vô hiệu hóa!**

---

### BƯỚC 2: TẠO API KEY MỚI (2 phút)

1. **Vẫn trong trang Credentials**
2. **Click "CREATE CREDENTIALS"**
3. **Chọn "API key"**
4. **Copy API key mới:**
   ```
   AIza... [KEY MỚI]
   ```
5. **Paste vào Notepad tạm**

6. **Click "RESTRICT KEY"**
7. **API restrictions:**
   - Chọn: "Restrict key"
   - Select APIs: ✅ Google Sheets API
8. **Click "SAVE"**

**✅ Có API key mới!**

---

### BƯỚC 3: DÙNG VERCEL ENVIRONMENT VARIABLES (5 phút)

**Thay vì hardcode API key trong code → Dùng env vars!**

#### 3.1: Setup trên Vercel

1. **Vào:** https://vercel.com/dashboard
2. **Click project:** horror-video-prompt-generator
3. **Settings → Environment Variables**
4. **Add variables:**

**Variable 1:**
```
Name: VITE_TRACKING_SHEET_ID
Value: 1vGltPpOHvqaLlddGM5gDYpCmswJ7lY9Pfg743nkSY0M
```

**Variable 2:**
```
Name: VITE_SETTINGS_SHEET_ID
Value: 121Z5sBziIk6Dh6XuFFJ_FsNUEUWNDTm3tFT_PW42QXw
```

**Variable 3:**
```
Name: VITE_GOOGLE_SHEETS_API_KEY
Value: [PASTE API KEY MỚI]
```

5. **Click "Save" cho mỗi variable**

#### 3.2: Cập nhật Code

**Sửa file:** `src/services/userTrackingService.ts`

**Từ:**
```typescript
private readonly SHEET_ID = '1vGltPpOHvqaLlddGM5gDYpCmswJ7lY9Pfg743nkSY0M';
private readonly API_KEY = 'AIzaSyDVXPbUXJmwL9eYcBu7T77XZ54ytRfjymk';
```

**Sang:**
```typescript
private readonly SHEET_ID = import.meta.env.VITE_TRACKING_SHEET_ID || '';
private readonly API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
```

**Sửa file:** `src/services/googleSheetsService.ts`

**Từ:**
```typescript
private readonly OWNER_SHEET_ID = '121Z5sBziIk6Dh6XuFFJ_FsNUEUWNDTm3tFT_PW42QXw';
private readonly OWNER_API_KEY = 'AIzaSyDVXPbUXJmwL9eYcBu7T77XZ54ytRfjymk';
```

**Sang:**
```typescript
private readonly OWNER_SHEET_ID = import.meta.env.VITE_SETTINGS_SHEET_ID || '';
private readonly OWNER_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
```

#### 3.3: Tạo file `.env.local` (cho local dev)

**File:** `.env.local` (đã có trong .gitignore)

```env
VITE_TRACKING_SHEET_ID=1vGltPpOHvqaLlddGM5gDYpCmswJ7lY9Pfg743nkSY0M
VITE_SETTINGS_SHEET_ID=121Z5sBziIk6Dh6XuFFJ_FsNUEUWNDTm3tFT_PW42QXw
VITE_GOOGLE_SHEETS_API_KEY=[API KEY MỚI]
```

**Lưu file này!**

#### 3.4: Commit và Push

```bash
git add .
git commit -m "Use environment variables for API keys (security fix)"
git push
```

**✅ Code không còn chứa API key!**

---

### BƯỚC 4: REDEPLOY VERCEL (1 phút)

1. **Vercel tự động deploy** sau khi push
2. **Hoặc:** Vào Vercel Dashboard → Deployments → Click "Redeploy"
3. **Đợi 2 phút**
4. **✅ App live với API key mới từ env vars!**

---

## 🔐 TẠI SAO AN TOÀN HƠN:

### Trước (Hardcode):
```typescript
private readonly API_KEY = 'AIza123...'; // ❌ Ai cũng thấy trong code
```
→ Push lên GitHub → Ai cũng xem được!

### Sau (Env Vars):
```typescript
private readonly API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
```
→ Push lên GitHub → Không thấy API key!
→ API key chỉ lưu trong Vercel Dashboard (private)

---

## ✅ SAU KHI HOÀN THÀNH:

### Kiểm tra:
1. ✅ API key cũ đã deleted?
2. ✅ API key mới đã tạo?
3. ✅ Vercel env vars đã setup?
4. ✅ Code đã sửa (dùng import.meta.env)?
5. ✅ File .env.local đã tạo?
6. ✅ Code đã push?
7. ✅ Vercel đã redeploy?

### Test:
1. Mở web: https://horror-video-prompt-generator.vercel.app
2. Vào trang → Check sheet UserLogs → Thấy log mới?
3. Test API key → Check sheet UnknownAPIs → Thấy log mới?
4. **Nếu CÓ → Thành công!** ✅

---

## 📖 LƯU Ý:

### File `.env.local`:
- ✅ Đã có trong `.gitignore`
- ✅ KHÔNG bao giờ commit lên Git
- ✅ Chỉ dùng local development

### Vercel Environment Variables:
- ✅ Lưu trên Vercel (private)
- ✅ Tự động inject vào app khi build
- ✅ An toàn, không ai thấy được

### GitHub:
- ⚠️ API key cũ vẫn trong Git history
- ⚠️ Nhưng đã revoke → Không dùng được nữa
- ✅ Code mới không chứa secrets

---

## 🚨 QUAN TRỌNG:

**LÀM NGAY:**
1. ✅ Revoke API key cũ (Bước 1)
2. ✅ Tạo API key mới (Bước 2)
3. ✅ Setup env vars (Bước 3)
4. ✅ Redeploy (Bước 4)

**KHÔNG DELAY!** API key đang public, ai cũng dùng được!

---

## ❓ CÂU HỎI:

**Q: Có nguy hiểm không?**
A: Có! Ai cũng có thể dùng API key của bạn.

**Q: Họ làm được gì?**
A: Đọc/ghi Google Sheets của bạn (đã restrict chỉ Sheets API).

**Q: Mất tiền không?**
A: Google Sheets API free, nhưng có quota limit. Họ có thể làm hết quota.

**Q: Sau khi revoke, app có chạy không?**
A: KHÔNG! Phải tạo API key mới và update (Bước 2-4).

**Q: Env vars có bị lộ không?**
A: KHÔNG! Chỉ bạn thấy trong Vercel Dashboard.

---

**LÀM NGAY ĐỂ BẢO VỆ APP!** 🚨
