# 🚀 DEPLOY LÊN WEB MIỄN PHÍ - HƯỚNG DẪN CHI TIẾT

## ✅ CHUẨN BỊ (5 PHÚT)

### 1. Tài khoản cần có:
- ✅ GitHub account (miễn phí): https://github.com
- ✅ Vercel account (miễn phí): https://vercel.com

### 2. Tools cần cài:
- ✅ Git (nếu chưa có): https://git-scm.com/downloads
- ✅ Code đã có sẵn trong folder này!

---

## 📦 BƯỚC 1: PUSH CODE LÊN GITHUB (10 PHÚT)

### Option A: Dùng GitHub Desktop (Dễ nhất - Khuyên dùng)

**Download GitHub Desktop:**
```
https://desktop.github.com
→ Download và cài đặt
```

**Các bước:**

1. **Mở GitHub Desktop**
   - Login GitHub account

2. **Add repository**
   - File → Add Local Repository
   - Chọn folder: `horror-video-prompt-generator`
   - Click "Add Repository"

3. **Create repository on GitHub**
   - GitHub Desktop sẽ hỏi: "This directory does not appear to be a Git repository"
   - Click "Create a Repository"
   - Fill in:
     - Name: `horror-video-prompt-generator`
     - Description: `Horror video prompt generator for Sora AI`
     - ✅ Keep "Keep this code private" (nếu muốn private)
   - Click "Create Repository"

4. **Publish to GitHub**
   - Click "Publish repository" ở góc trên
   - ✅ Uncheck "Keep this code private" nếu muốn public
   - Click "Publish Repository"

5. **✅ XONG!**
   - Code đã lên GitHub!
   - URL dạng: `https://github.com/your-username/horror-video-prompt-generator`

---

### Option B: Dùng Command Line (Nhanh hơn nếu biết Git)

**Mở Terminal/CMD trong folder `horror-video-prompt-generator`:**

```bash
# 1. Khởi tạo Git repository
git init

# 2. Add tất cả files
git add .

# 3. Commit
git commit -m "Initial commit - Horror Video Prompt Generator"

# 4. Tạo repo trên GitHub
# → Vào https://github.com/new
# → Tạo repo tên: horror-video-prompt-generator
# → Không tick gì cả
# → Copy URL (dạng: https://github.com/username/horror-video-prompt-generator.git)

# 5. Link local repo với GitHub
git remote add origin https://github.com/YOUR_USERNAME/horror-video-prompt-generator.git

# 6. Push lên GitHub
git branch -M main
git push -u origin main

# ✅ XONG! Code đã lên GitHub!
```

---

## 🌐 BƯỚC 2: DEPLOY LÊN VERCEL (5 PHÚT)

### 1. Vào Vercel
```
https://vercel.com
→ Click "Sign Up" (nếu chưa có account)
→ Hoặc "Login"
```

### 2. Login bằng GitHub
```
→ Click "Continue with GitHub"
→ Authorize Vercel
```

### 3. Import GitHub Repository
```
→ Click "Add New..." → "Project"
→ Click "Import Git Repository"
→ Tìm repo: "horror-video-prompt-generator"
→ Click "Import"
```

### 4. Configure Project
```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install

→ GIỮ NGUYÊN settings mặc định!
→ Click "Deploy"
```

### 5. Đợi deploy (1-2 phút)
```
Vercel sẽ:
✅ Install dependencies
✅ Build app
✅ Deploy lên web

Xem progress realtime!
```

### 6. ✅ XONG!
```
→ Thấy "Congratulations!" với confetti 🎉
→ Click "Visit" để xem app
→ URL dạng: https://horror-video-prompt-generator.vercel.app
```

---

## 🎉 APP ĐÃ LIVE!

### URL của bạn:
```
https://YOUR_PROJECT_NAME.vercel.app
hoặc
https://YOUR_PROJECT_NAME-YOUR_USERNAME.vercel.app
```

### Bạn có thể:
- ✅ Mở từ bất kỳ device nào (PC, phone, tablet)
- ✅ Share link cho người khác
- ✅ Bookmark để dùng hàng ngày
- ✅ Không cần chạy `npm run dev` nữa!

---

## 🔄 CẬP NHẬT APP (SAU KHI DEPLOY)

### Khi bạn sửa code:

**Option A: GitHub Desktop**
```
1. Mở GitHub Desktop
2. Thấy changes trong app
3. Viết commit message (ví dụ: "Fix bug")
4. Click "Commit to main"
5. Click "Push origin"
→ Vercel tự động deploy lại! (1-2 phút)
```

**Option B: Command Line**
```bash
# 1. Add changes
git add .

# 2. Commit
git commit -m "Your change description"

# 3. Push
git push

# → Vercel tự động deploy! ✅
```

**Vercel tự động:**
- Phát hiện code mới trên GitHub
- Build lại app
- Deploy version mới
- Update URL (vẫn giữ nguyên link)

---

## 🎯 CUSTOM DOMAIN (TÙY CHỌN)

### Nếu muốn domain riêng (ví dụ: myapp.com):

1. Mua domain ở Namecheap/GoDaddy (~$10/năm)
2. Vào Vercel → Settings → Domains
3. Add domain
4. Follow hướng dẫn setup DNS
5. ✅ Done! App chạy trên domain của bạn

**HOẶC dùng free subdomain của Vercel:**
- Mặc định: `your-project.vercel.app`
- Miễn phí mãi mãi!
- Đủ dùng!

---

## 🔧 TROUBLESHOOTING

### Lỗi: Build failed
**Nguyên nhân:** TypeScript errors

**Giải pháp:**
```bash
# Local test build trước:
npm run build

# Fix errors nếu có
# Sau đó push lại
```

### Lỗi: Page shows blank
**Nguyên nhân:** Wrong output directory

**Giải pháp:**
- Vào Vercel Settings → Build & Development
- Output Directory = `dist`
- Redeploy

### Lỗi: 404 on refresh
**Giải pháp:**
- File `vercel.json` đã có rewrites
- Redeploy là OK

---

## 📊 VERCEL FREE TIER LIMITS

### ✅ Bạn được:
- Bandwidth: 100GB/tháng
- Build time: 6000 phút/tháng  
- Deployments: Unlimited
- Domains: Unlimited

### Đủ dùng không?
**✅ QUÁ ĐỦ!** 

Ví dụ với 1000 users/ngày:
- ~30,000 users/tháng
- ~10GB bandwidth
- FAR BELOW limits!

---

## 💡 TIPS

### 1. Enable Analytics (Optional)
```
Vercel Dashboard → Analytics
→ Xem traffic, performance
→ Free tier: 100k events/tháng
```

### 2. Environment Variables
```
Nếu cần lưu secrets:
→ Settings → Environment Variables
→ Add API keys, etc.
→ Không bao giờ commit secrets vào Git!
```

### 3. Preview Deployments
```
Mỗi lần push → Vercel tạo preview URL
→ Test trước khi merge
→ Tự động!
```

---

## 🎊 DONE!

### Bây giờ bạn có:
- ✅ App chạy trên web
- ✅ URL để share
- ✅ Auto-deploy khi sửa code
- ✅ 100% miễn phí
- ✅ Không cần server
- ✅ Không cần quản lý gì cả!

### Next steps:
1. ✅ Bookmark URL
2. ✅ Test app từ phone/tablet
3. ✅ Share với friends
4. ✅ Enjoy! 🎬👻

---

## ❓ FAQ

**Q: Có mất tiền không?**
A: ❌ KHÔNG! 100% miễn phí mãi mãi với Vercel free tier.

**Q: API key có bị lộ không?**
A: ❌ KHÔNG! API key nhập trong browser, không lưu trên server.

**Q: Có giới hạn users không?**
A: ✅ Free tier đủ cho hàng nghìn users/ngày.

**Q: Deploy mất bao lâu?**
A: 1-2 phút mỗi lần.

**Q: Có thể unpublish không?**
A: ✅ CÓ! Delete project trong Vercel dashboard.

**Q: Code có public không?**
A: Tùy bạn! Có thể để GitHub repo private.

**Q: Vercel có đọc được API key không?**
A: ❌ KHÔNG! API key chỉ tồn tại trong browser của user.

---

**Ready to deploy?** Làm theo từng bước là OK! 🚀

Có vấn đề gì cứ hỏi tôi! 💬
