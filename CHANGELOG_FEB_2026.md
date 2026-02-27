# 📋 CHANGELOG - February 2026

## [v2.1.0] - 2026-02-27

### 🎯 Major Updates

#### ✅ FREE & PAID API Support
- **Added:** Auto-detection cho FREE và PAID API keys
- **Added:** Tier indicator (🆓 FREE / 💎 PAID) khi test API key
- **Improved:** Model selection logic với fallback thông minh

#### 🔧 Bug Fixes

##### Fix #1: Button không hoạt động
**Vấn đề:**
- Nút "Tạo Prompt" không phản hồi khi click
- Model names outdated (`gemini-2.0-flash-exp`, `gemini-2.5-flash`)

**Giải pháp:**
- Cập nhật model list với các models ổn định
- Thêm FREE tier models: `gemini-1.5-flash`, `gemini-1.5-pro`
- Thêm PAID tier models: `gemini-2.0-flash-exp`

**Files changed:**
- `src/services/geminiService.ts`
- `src/services/sceneSplitter.ts`

##### Fix #2: FREE API Key không hoạt động
**Vấn đề:**
- Error: "Không tìm thấy model phù hợp"
- Models với prefix `models/` không work với FREE tier

**Giải pháp:**
- Thử models không có prefix trước: `gemini-1.5-flash`
- Fallback sang models có prefix nếu cần
- Ưu tiên FREE models trước PAID models

### 📝 Model Priority Order

#### Test API Key:
```javascript
[
  // FREE TIER (Try first)
  'gemini-1.5-flash',      // ← Recommended for FREE
  'gemini-1.5-pro',
  'gemini-pro',
  
  // PAID TIER
  'gemini-2.0-flash-exp',
  'models/gemini-2.0-flash-exp',
  
  // FALLBACK
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro',
  // ... more
]
```

#### Generate Prompt:
- Same order as Test API Key
- Cache working model for faster subsequent calls
- Smart fallback if cached model fails

### 🎨 UI/UX Improvements
- Added tier indicator in success message
- Better error messages
- Improved model selection feedback

### 📚 Documentation
- **Added:** `FREE_AND_PAID_SUPPORT.md` - Chi tiết về FREE vs PAID
- **Added:** `FREE_TIER_FIX.md` - Hướng dẫn sửa lỗi FREE tier
- **Added:** `HƯỚNG_DẪN_SỬ_DỤNG.md` - Hướng dẫn tiếng Việt đầy đủ
- **Updated:** `FIX_SUMMARY.md` - Tóm tắt các sửa đổi

### 🧪 Testing
- Tested với FREE API keys ✅
- Tested với PAID API keys ✅
- Auto-detection working ✅
- Model fallback working ✅

### 🔄 Breaking Changes
- None! Backward compatible 100%

### 📊 Performance
- Faster model selection với cache
- Reduce API calls với smart retry
- Better error handling

---

## [v2.0.0] - Previous Version

### Features
- Multi-scene support
- Long script splitting
- Image generation with Imagen
- Timeline export (JSON, CSV, TXT)
- History tracking
- Project save/load

---

## Migration Guide

### From v2.0.0 to v2.1.0

**No action needed!** Update is automatic.

**Benefits:**
- FREE API keys now work perfectly
- PAID API keys get better performance
- Auto-detection of tier
- Better error messages

**If you have issues:**
1. Clear browser cache (Ctrl + F5)
2. Restart dev server
3. Test API key again

---

## Known Issues

### TypeScript Warnings (Non-breaking):
- Some unused imports
- Optional chaining warnings
- Does NOT affect functionality

### Future Improvements:
- [ ] Add more models when available
- [ ] Improve tier detection
- [ ] Add usage statistics
- [ ] Better quota management

---

**Contributors:** RovoDev AI  
**Date:** 2026-02-27  
**Version:** 2.1.0
