# ✅ Test Checklist - Kiểm Tra App

## 🧪 Trước Khi Giao Cho User

### ✅ Installation Test
- [x] Dependencies cài đặt thành công (`npm install`)
- [x] Không có lỗi fatal trong quá trình cài đặt
- [x] File structure đầy đủ

### ✅ Code Structure
- [x] TypeScript config đúng
- [x] Vite config đúng
- [x] Electron config đúng
- [x] TailwindCSS config đúng
- [x] All components created
- [x] Services created (Gemini integration)
- [x] Types defined

### ✅ Features Implemented
- [x] API Key input & validation
- [x] API Key test function
- [x] Script input section
- [x] Example scripts
- [x] Prompt generation (Gemini AI)
- [x] Output display (JSON format)
- [x] Copy to clipboard
- [x] Download JSON
- [x] History storage (localStorage)
- [x] Load from history
- [x] Clear history
- [x] Error handling

### ✅ UI/UX
- [x] Horror theme styling
- [x] Responsive design
- [x] Loading states
- [x] Error messages
- [x] Success feedback
- [x] Icon integration (lucide-react)

### ✅ Documentation
- [x] README.md (English)
- [x] HUONG_DAN_TIENG_VIET.md (Vietnamese detailed guide)
- [x] GEMINI_API_KEY_GUIDE.md (API key guide)
- [x] QUICK_START.md (Quick start)
- [x] .gitignore
- [x] .env.example

### ✅ Scripts & Utilities
- [x] START.bat (Windows start script)
- [x] INSTALL.bat (Windows install script)
- [x] npm scripts configured
- [x] Build scripts ready

---

## 🚀 User Testing Steps

### Step 1: Installation
```bash
cd horror-video-prompt-generator
npm install
```
**Expected:** No fatal errors, node_modules created

### Step 2: Get API Key
1. Visit https://aistudio.google.com/app/apikey
2. Create API key
3. Copy key

### Step 3: Run App
```bash
npm run dev
```
**Expected:** 
- Vite dev server starts on port 5173
- Electron window opens
- App loads with API key input screen

### Step 4: Test API Key
1. Paste API key
2. Click "Test API Key"
**Expected:** 
- Loading indicator shows
- Success message appears
- App transitions to main screen

### Step 5: Generate Prompt
1. Enter Vietnamese horror script
2. Click "Tạo Prompt"
**Expected:**
- Loading state shows
- English prompt generates
- Output displays with all fields
- History updates

### Step 6: Test Features
- [ ] Copy prompt works
- [ ] Download JSON works
- [ ] Load from history works
- [ ] Clear history works
- [ ] Multiple generations work

---

## ⚠️ Known Issues & Limitations

### Current Limitations:
1. **Requires internet** - Gemini API needs connection
2. **Rate limit** - 15 requests/minute on free tier
3. **English output only** - Sora requires English prompts
4. **5-second videos** - Optimized for short clips

### Not Bugs (By Design):
- Prompt in English (Sora requirement)
- API key required (free but needed)
- Desktop app only (Electron limitation)

---

## 🐛 Debug Commands

### Check Dependencies
```bash
npm list --depth=0
```

### Clear Cache & Reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Test Gemini API Directly
```bash
curl https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY
```

---

## 📝 Notes for User

### First Time Setup:
1. Install Node.js
2. Run `INSTALL.bat` or `npm install`
3. Get Gemini API key
4. Run `START.bat` or `npm run dev`

### Daily Use:
1. Double-click `START.bat`
2. Write script
3. Generate prompt
4. Use in Sora!

---

**App is ready for user! 🎉**
