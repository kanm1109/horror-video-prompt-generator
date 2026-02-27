# 🎯 Hỗ Trợ CẢ API FREE & PAID

## ✅ ĐÃ CẬP NHẬT

App hiện hỗ trợ **TỰ ĐỘNG PHÁT HIỆN** và sử dụng cả:
- 🆓 **FREE API Keys** (Gemini 1.5, Gemini Pro)
- 💎 **PAID API Keys** (Gemini 2.0, Experimental models)

## 🔍 LOGIC HOẠT ĐỘNG

### 1. Thứ tự thử models:

**Lần đầu tiên (chưa cache):**
```
1. gemini-1.5-flash          ← FREE tier (thử đầu tiên)
2. gemini-1.5-pro            ← FREE tier
3. gemini-pro                ← FREE tier legacy
4. gemini-2.0-flash-exp      ← PAID/experimental
5. models/gemini-2.0-flash-exp
6. models/gemini-1.5-flash-latest
... (và các variants khác)
```

**Lần sau (đã cache):**
- Dùng ngay model đã hoạt động lần trước
- Nhanh hơn, không cần thử lại

### 2. Auto-detect tier:

Khi test API key thành công, app sẽ hiển thị:
- 🆓 **FREE Tier** - Nếu dùng Gemini 1.5/Pro
- 💎 **PAID Tier** - Nếu dùng Gemini 2.0/Experimental

## 📊 SO SÁNH FREE vs PAID

### 🆓 FREE TIER
**Models:**
- `gemini-1.5-flash` - Nhanh, ổn định
- `gemini-1.5-pro` - Chất lượng cao hơn
- `gemini-pro` - Legacy, vẫn tốt

**Limits:**
- 15 requests/phút
- 1,500 requests/ngày
- ✅ Đủ dùng cho app này!

**Ưu điểm:**
- ✅ Miễn phí 100%
- ✅ Không cần credit card
- ✅ Chất lượng tốt

### 💎 PAID TIER
**Models:**
- `gemini-2.0-flash-exp` - Nhanh hơn, mới nhất
- Các models experimental khác

**Limits:**
- Higher rate limits
- More requests/day
- Access to newer models

**Ưu điểm:**
- ✅ Tốc độ nhanh hơn
- ✅ Models mới nhất
- ✅ Ít bị rate limit

## 🚀 CÁCH SỬ DỤNG

### Với FREE API Key:
1. Lấy key tại: https://aistudio.google.com/app/apikey
2. Paste vào app
3. Test → Sẽ thấy: **"✅ API Key hợp lệ! 🆓 (FREE Tier)"**
4. App tự động dùng `gemini-1.5-flash` hoặc `gemini-1.5-pro`

### Với PAID API Key:
1. Nếu bạn có PAID key (từ Google Cloud)
2. Paste vào app
3. Test → Sẽ thấy: **"✅ API Key hợp lệ! 💎 (PAID Tier)"**
4. App tự động dùng `gemini-2.0-flash-exp` (nhanh hơn)

## 🎯 LỢI ÍCH

### 1. Tự động fallback:
- Thử FREE models trước
- Nếu không được → Thử PAID models
- → Luôn tìm được model phù hợp!

### 2. Tối ưu hiệu năng:
- FREE key → Dùng models FREE (tránh lỗi)
- PAID key → Dùng models PAID (tận dụng tốc độ)

### 3. Cache thông minh:
- Lưu model đã hoạt động
- Lần sau không cần thử lại
- → Nhanh hơn nhiều!

## 📝 FILES ĐÃ CẬP NHẬT

### `src/services/geminiService.ts`:

**Function `testApiKey()`:**
- ✅ Thêm FREE models
- ✅ Thêm PAID models
- ✅ Auto-detect tier
- ✅ Hiển thị thông tin 🆓/💎

**Function `generatePrompt()`:**
- ✅ Thử FREE models trước
- ✅ Fallback sang PAID nếu cần
- ✅ Cache model hoạt động

## 🧪 TEST

### Test với FREE key:
```
✅ API Key hợp lệ! 🆓 (FREE Tier)
Model: gemini-1.5-flash
```

### Test với PAID key:
```
✅ API Key hợp lệ! 💎 (PAID/Experimental Tier)
Model: gemini-2.0-flash-exp
```

## ❓ FAQ

**Q: Tôi có FREE key, có dùng được không?**
A: ✅ Có! App ưu tiên FREE models trước.

**Q: Tôi có PAID key, có tận dụng được không?**
A: ✅ Có! App tự động dùng models nhanh hơn nếu có.

**Q: Cần upgrade lên PAID không?**
A: ❌ KHÔNG CẦN! FREE đủ dùng cho app này.

**Q: Làm sao biết mình đang dùng tier nào?**
A: Nhìn thông báo khi test API key:
- 🆓 = FREE
- 💎 = PAID

## 🎉 KẾT LUẬN

App hiện hỗ trợ **CẢ FREE VÀ PAID** một cách thông minh:
- ✅ FREE users: Hoạt động hoàn hảo
- ✅ PAID users: Tận dụng được models tốt hơn
- ✅ Auto-detect: Không cần config gì thêm!

**Enjoy!** 🎬👻
