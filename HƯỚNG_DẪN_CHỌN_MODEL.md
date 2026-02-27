# 🎯 HƯỚNG DẪN CHỌN MODEL THỦ CÔNG

## ✅ TÍNH NĂNG MỚI: Chọn Model Cụ Thể

Bây giờ bạn có thể **TỰ CHỌN MODEL** muốn sử dụng thay vì để app tự động chọn!

---

## 🚀 CÁCH SỬ DỤNG

### Bước 1: Mở Cài Đặt Nâng Cao
1. Nhập API key vào ô
2. Click **"▶ Cài đặt nâng cao (Chọn model cụ thể)"**
3. Sẽ mở ra dropdown chọn model

### Bước 2: Chọn Model
Chọn 1 trong các tùy chọn:

#### 🤖 **Tự động (Khuyên dùng)** - Mặc định
- App tự động thử nhiều models
- Tìm model phù hợp nhất
- Fallback nếu 1 model fail
- ✅ **KHUYÊN DÙNG CHO HẦU HẾT USER**

#### 🆓 **FREE TIER - Dành cho FREE API Key**
- `gemini-1.5-flash` - Nhanh nhất ⚡
- `gemini-1.5-pro` - Chất lượng cao ⭐
- `gemini-pro` - Legacy, ổn định 🔒

#### 💎 **PAID/EXPERIMENTAL - Dành cho PAID API**
- `gemini-2.0-flash-exp` - Thử nghiệm, nhanh
- `models/gemini-2.0-flash-exp` - Với prefix

#### 🔄 **VARIANTS - Với prefix "models/"**
- `models/gemini-1.5-flash`
- `models/gemini-1.5-pro`
- `models/gemini-pro`
- `models/gemini-1.5-flash-latest`
- `models/gemini-1.5-pro-latest`

### Bước 3: Test API Key
1. Bấm **"Test API Key"**
2. Nếu thành công → Thấy: 🎯 **Model đã chọn: [tên model]**
3. Nếu thất bại → Thử chọn model khác hoặc chọn "Tự động"

---

## 📊 SO SÁNH CHẾ ĐỘ

| Chế độ | Ưu điểm | Nhược điểm | Dùng khi |
|--------|---------|-----------|----------|
| **Tự động** | ✅ Luôn tìm được model<br>✅ Fallback thông minh<br>✅ Không cần biết model | ⚠️ Chậm hơn một chút lần đầu | Hầu hết trường hợp |
| **Chọn cụ thể** | ✅ Nhanh (không thử nhiều model)<br>✅ Control hoàn toàn<br>✅ Biết chính xác model dùng | ❌ Nếu model fail → Lỗi<br>❌ Cần biết model phù hợp | Bạn biết rõ model nào work |

---

## 💡 KHUYẾN NGHỊ

### ✅ Dùng "Tự động" nếu:
- Bạn mới dùng lần đầu
- Không biết model nào phù hợp
- Muốn app tự lo
- Có FREE API key

### ✅ Dùng "Chọn cụ thể" nếu:
- Bạn đã biết model nào work với API key
- Muốn tối ưu tốc độ (không thử nhiều models)
- Muốn test model cụ thể
- Có PAID API key và muốn dùng model experimental

---

## 🎯 VÍ DỤ THỰC TẾ

### Ví dụ 1: FREE API Key + Tự động (Khuyên dùng)
```
1. Chọn: "🤖 Tự động"
2. Test API Key
3. Kết quả: "✅ API Key hợp lệ! 🆓 (FREE Tier)
            Model: gemini-1.5-flash"
4. ✅ App tự tìm ra gemini-1.5-flash work tốt nhất
```

### Ví dụ 2: FREE API Key + Chọn gemini-1.5-pro
```
1. Chọn: "gemini-1.5-pro (Chất lượng cao)"
2. Test API Key
3. Kết quả: "✅ API Key hợp lệ! 🆓 (FREE Tier)
            🎯 Model đã chọn: gemini-1.5-pro"
4. ✅ App chỉ dùng gemini-1.5-pro
```

### Ví dụ 3: PAID API Key + Chọn gemini-2.0-flash-exp
```
1. Chọn: "gemini-2.0-flash-exp (Thử nghiệm)"
2. Test API Key
3. Kết quả: "✅ API Key hợp lệ! 💎 (PAID Tier)
            🎯 Model đã chọn: gemini-2.0-flash-exp"
4. ✅ Tận dụng model nhanh nhất!
```

### Ví dụ 4: Chọn model không hoạt động
```
1. Chọn: "gemini-2.0-flash-exp" (nhưng dùng FREE key)
2. Test API Key
3. Kết quả: "❌ Model 'gemini-2.0-flash-exp' không hoạt động!
            Permission denied
            
            💡 Thử chọn 'Tự động' hoặc model khác."
4. → Chọn lại model FREE hoặc chọn "Tự động"
```

---

## 🔧 CHI TIẾT KỸ THUẬT

### Cách hoạt động:

**Chế độ Tự động:**
```javascript
// Thử nhiều models theo thứ tự
models = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro',
  'gemini-2.0-flash-exp',
  ...
]

// Dùng model nào work đầu tiên
```

**Chế độ Chọn cụ thể:**
```javascript
// Chỉ thử 1 model duy nhất
models = ['gemini-1.5-pro']  // Model bạn chọn

// Nếu fail → Báo lỗi ngay
// Nếu success → Dùng model này mãi
```

---

## ❓ FAQ

**Q: Tôi nên chọn model nào?**
A: Chọn "Tự động" là tốt nhất cho hầu hết trường hợp!

**Q: Gemini 3 Flash có trong danh sách không?**
A: Chưa có. Google chưa release Gemini 3. Hiện tại mới nhất là Gemini 2.0 (experimental).

**Q: Tôi muốn thêm model mới vào danh sách?**
A: Liên hệ developer để thêm vào dropdown!

**Q: Sau khi chọn model, có thể đổi không?**
A: Có! Chọn model khác và test lại API key.

**Q: Model đã chọn có lưu lại không?**
A: Có! Lưu trong cache browser. Lần sau không cần chọn lại.

**Q: Làm sao reset về "Tự động"?**
A: Chọn "🤖 Tự động" và test lại API key.

---

## 🎉 TÓM LẠI

✅ **Thêm được**: Tính năng chọn model thủ công  
✅ **Mặc định**: Tự động (khuyên dùng)  
✅ **Linh hoạt**: Chọn model cụ thể khi cần  
✅ **Thông minh**: Báo lỗi rõ ràng nếu model fail  
✅ **Dễ dùng**: UI đơn giản, dễ hiểu  

**Enjoy control hoàn toàn models!** 🎬👻
