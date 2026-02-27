# 🔐 VERCEL ENVIRONMENT VARIABLES SETUP

## ✅ ĐÃ HOÀN THÀNH:

### 1. Code đã sửa ✅
- Không còn hardcode API key
- Dùng `import.meta.env.VITE_*` để đọc từ env vars
- File `.env.local` đã tạo (cho local dev)

### 2. Code đã push lên GitHub ✅
- Commit: "Security fix: Use environment variables"
- Không chứa API key trong code

---

## 🚀 BƯỚC CUỐI: SETUP VERCEL ENV VARS (3 PHÚT)

### Bạn cần làm:

#### Bước 1: Vào Vercel Dashboard
```
https://vercel.com/dashboard
```

#### Bước 2: Chọn Project
- Click vào project: **horror-video-prompt-generator**

#### Bước 3: Vào Settings
- Tab: **Settings** (góc trên)
- Left menu: **Environment Variables**

#### Bước 4: Add 3 Variables

**Variable 1:**
```
Name: VITE_TRACKING_SHEET_ID
Value: 1vGltPpOHvqaLlddGM5gDYpCmswJ7lY9Pfg743nkSY0M
Environment: Production, Preview, Development (tick cả 3)
```
→ Click **"Save"**

**Variable 2:**
```
Name: VITE_SETTINGS_SHEET_ID
Value: 121Z5sBziIk6Dh6XuFFJ_FsNUEUWNDTm3tFT_PW42QXw
Environment: Production, Preview, Development (tick cả 3)
```
→ Click **"Save"**

**Variable 3:**
```
Name: VITE_GOOGLE_SHEETS_API_KEY
Value: AIzaSyByyShr0VzNX2TUNGs7vbF6UmNdJ7bSBEs
Environment: Production, Preview, Development (tick cả 3)
```
→ Click **"Save"**

#### Bước 5: Redeploy
- Tab: **Deployments**
- Click vào deployment mới nhất
- Click **"... "** (3 dots) → **"Redeploy"**
- Confirm

#### Bước 6: Đợi Deploy (2 phút)
- Xem progress
- Đợi "✅ Ready"

---

## ✅ SAU KHI SETUP:

### Kiểm tra:
1. **Vào:** https://horror-video-prompt-generator.vercel.app
2. **Mở trang** → Đợi 5 giây
3. **Check Google Sheet** (UserLogs) → Thấy log mới? ✅
4. **Test API key** → Check sheet (UnknownAPIs) → Thấy log? ✅

### Nếu thành công:
- ✅ App hoạt động bình thường
- ✅ Tracking vẫn chạy
- ✅ API key logging vẫn work
- ✅ **NHƯNG** code không chứa secrets!

### Nếu không work:
- ❌ Check Vercel env vars đã add đúng chưa?
- ❌ Check spelling: `VITE_TRACKING_SHEET_ID`, `VITE_SETTINGS_SHEET_ID`, `VITE_GOOGLE_SHEETS_API_KEY`
- ❌ Check đã tick cả 3 environments?
- ❌ Check đã redeploy?

---

## 🔐 BẢO MẬT:

### Bây giờ:
- ✅ **Code trên GitHub:** Không chứa API key
- ✅ **API key:** Chỉ trong Vercel env vars (private)
- ✅ **Ai fork repo:** Không có API key của bạn
- ✅ **GitHub cảnh báo:** Không còn nữa (vì revoked key cũ)

### Local Development:
- ✅ File `.env.local` chứa API key
- ✅ File này trong `.gitignore` → Không commit
- ✅ Chỉ trên máy bạn

---

## 📊 CÁCH HOẠT ĐỘNG:

### Local (npm run dev):
```
Vite đọc .env.local
→ import.meta.env.VITE_GOOGLE_SHEETS_API_KEY = "AIza..."
→ App dùng API key này
```

### Production (Vercel):
```
Vercel inject env vars từ Settings
→ import.meta.env.VITE_GOOGLE_SHEETS_API_KEY = "AIza..."
→ App dùng API key này
```

### GitHub:
```
Code: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY
→ Không thấy value thực tế
→ An toàn!
```

---

## ✅ CHECKLIST:

- [ ] 1. Vào Vercel Dashboard
- [ ] 2. Chọn project horror-video-prompt-generator
- [ ] 3. Settings → Environment Variables
- [ ] 4. Add VITE_TRACKING_SHEET_ID
- [ ] 5. Add VITE_SETTINGS_SHEET_ID
- [ ] 6. Add VITE_GOOGLE_SHEETS_API_KEY
- [ ] 7. Tick cả 3 environments cho mỗi var
- [ ] 8. Redeploy
- [ ] 9. Đợi deploy xong
- [ ] 10. Test website
- [ ] 11. Check logs trong sheets
- [ ] 12. ✅ DONE!

---

## 🎉 HOÀN TẤT!

Sau khi setup env vars trên Vercel:
- ✅ App sẽ hoạt động bình thường
- ✅ Tracking vẫn chạy
- ✅ Nhưng code an toàn, không chứa secrets
- ✅ GitHub không cảnh báo nữa!

---

**LÀM THEO TỪNG BƯỚC Ở TRÊN!**

Xong rồi báo tôi nhé! 😊
