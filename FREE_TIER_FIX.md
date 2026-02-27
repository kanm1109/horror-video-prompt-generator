# 🆓 Sửa lỗi cho FREE TIER API Key

## ❌ LỖI VỪA RỒI
```
❌ Không tìm thấy model phù hợp
```

## 🔍 NGUYÊN NHÂN
Code cũ dùng models **không hỗ trợ FREE tier** hoặc cần prefix `models/`:
- ❌ `models/gemini-1.5-flash-latest` - Không hỗ trợ free
- ❌ `models/gemini-flash-latest` - Không hỗ trợ free

## ✅ ĐÃ SỬA

### Models mới (FREE tier tương thích):
1. ✅ `gemini-1.5-flash` **(RECOMMENDED - Nhanh, free)**
2. ✅ `gemini-1.5-pro` (Chất lượng cao hơn, free)
3. ✅ `gemini-pro` (Legacy, vẫn hoạt động)

### Files đã sửa:

**1. `src/services/geminiService.ts` - testApiKey():**
```typescript
const modelsToTry = [
  'gemini-1.5-flash',        // FREE - Thử không có prefix trước
  'gemini-1.5-pro',          // FREE
  'gemini-pro',              // FREE - Legacy
  'models/gemini-1.5-flash', // FREE với prefix (backup)
  'models/gemini-1.5-pro',
  'models/gemini-pro'
];
```

**2. `src/services/geminiService.ts` - generatePrompt():**
```typescript
const modelsToTry = [
  'gemini-1.5-flash',        // FREE - Ưu tiên #1
  'gemini-1.5-pro',          // FREE
  'gemini-pro',              // FREE - Legacy
  'models/gemini-1.5-flash', // Backup với prefix
  'models/gemini-1.5-pro',
  'models/gemini-pro'
];
```

**3. `src/services/sceneSplitter.ts`:**
```typescript
const workingModel = ... || 'gemini-1.5-flash'; // FREE compatible
```

## 🚀 CÁCH TEST NGAY

### Bước 1: Mở tool test
File `tmp_rovodev_test_free_models.html` đã được mở trong browser.

1. Nhập API key của bạn
2. Bấm **"💰 Test Models FREE Tier"**
3. Xem model nào hoạt động (màu xanh ✅)

### Bước 2: Chạy lại app
```bash
cd horror-video-prompt-generator
npm run dev
```

### Bước 3: Test trong app
1. Mở http://localhost:5173 (hoặc port khác)
2. Nhập API key
3. Bấm "Test API Key"
4. Nếu thấy: ✅ **"API Key hợp lệ! Đang dùng model: gemini-1.5-flash"**
5. → Nhập kịch bản và bấm "Tạo Prompt"

## 📊 FREE TIER LIMITS

Google Gemini Free API:
- ✅ 15 requests/phút
- ✅ 1,500 requests/ngày
- ✅ Đủ để dùng app này

Models FREE hỗ trợ:
- ✅ `gemini-1.5-flash` - Tốc độ cao
- ✅ `gemini-1.5-pro` - Chất lượng cao
- ✅ `gemini-pro` - Phiên bản cũ

## ❓ NẾU VẪN LỖI?

1. **Kiểm tra API key:**
   - Vào https://aistudio.google.com/app/apikey
   - Tạo key mới nếu cần

2. **Check console (F12):**
   - Xem error message chi tiết
   - Gửi cho tôi để debug

3. **Dùng tool test:**
   - Chạy `tmp_rovodev_test_free_models.html`
   - Xem model nào working
   - Báo kết quả cho tôi

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi sửa:
- ✅ Test API Key thành công
- ✅ Tạo prompt hoạt động bình thường
- ✅ Không còn lỗi "Không tìm thấy model"
