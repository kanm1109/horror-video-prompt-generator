# 🚀 Chọn Cách Chạy App

App này có **2 CÁCH CHẠY**. Bạn chọn cách nào cũng được!

---

## ✅ CÁCH 1: Chạy Trên Browser (ĐỀ NGHỊ)

### Ưu điểm:
- ✅ **Đơn giản nhất** - Không cần cài Electron
- ✅ **Mở nhanh** - Tự động mở browser
- ✅ **Nhẹ hơn** - Không tốn RAM của Electron
- ✅ **Đầy đủ tính năng** - Không thiếu gì

### Cách chạy:
**Cách 1:** Double-click vào file:
```
START.bat
```

**Cách 2:** Mở Command Prompt và gõ:
```bash
npm run dev
```

**Kết quả:** 
- Browser (Chrome/Edge) sẽ tự động mở
- App chạy tại: http://localhost:5173
- Dùng như desktop app bình thường!

**Lưu ý:** 
- Giữ cửa sổ Command Prompt mở (đừng tắt)
- Muốn tắt app → Nhấn Ctrl+C trong Command Prompt

---

## ✅ CÁCH 2: Chạy Desktop App (Electron)

### Ưu điểm:
- ✅ **Giống desktop app thật** - Cửa sổ riêng
- ✅ **Không phụ thuộc browser** - Chạy độc lập
- ✅ **Có icon riêng** trong taskbar

### Nhược điểm:
- ⚠️ Tốn RAM hơn (Electron nặng)
- ⚠️ Chạy chậm hơn 1 chút
- ⚠️ Cần đợi Electron khởi động

### Cách chạy:
**Cách 1:** Double-click vào file:
```
START_DESKTOP.bat
```

**Cách 2:** Mở Command Prompt và gõ:
```bash
npm run dev:desktop
```

**Kết quả:**
- Vite server khởi động (5s)
- Electron window tự động mở (5s nữa)
- Tổng ~10 giây

---

## 💡 TÔI NÊN CHỌN CÁCH NÀO?

### Nếu bạn là newbie → **CHỌN CÁCH 1** (Browser)
- Đơn giản nhất
- Mở nhanh nhất
- Đầy đủ tính năng

### Nếu bạn thích desktop app thật → **CHỌN CÁCH 2** (Electron)
- Trải nghiệm giống app cài đặt
- Cửa sổ riêng, không lẫn với browser

---

## 📝 So Sánh

| Tiêu Chí | Cách 1: Browser | Cách 2: Electron |
|----------|-----------------|------------------|
| **Tốc độ mở** | ⚡ Nhanh (~2s) | 🐢 Chậm hơn (~10s) |
| **RAM** | 💚 Nhẹ | 🔴 Nặng hơn |
| **Đơn giản** | ✅ Rất đơn giản | ⚠️ Phức tạp hơn |
| **Tính năng** | ✅ Đầy đủ | ✅ Đầy đủ |
| **Trải nghiệm** | 📱 Như web app | 🖥️ Như desktop app |

---

## ⚙️ Chi Tiết Kỹ Thuật

### Cách 1: Browser Mode
- Chạy: `npm run dev`
- Port: http://localhost:5173
- Tech: Vite dev server + React
- Browser: Chrome/Edge/Firefox

### Cách 2: Desktop Mode
- Chạy: `npm run dev:desktop`
- Port: http://localhost:5173 (internal)
- Tech: Electron + Vite + React
- Window: Electron BrowserWindow

**Cả 2 cách đều dùng code giống nhau!**

---

## 🎯 Khuyến Nghị

**DÙNG CÁCH 1** cho đến khi bạn cần build file .exe để cài đặt.

Sau này nếu muốn chia sẻ app cho người khác → Build file .exe bằng:
```bash
npm run build:win
```

---

## ❓ Câu Hỏi Thường Gặp

### 1. Cách 1 có thiếu tính năng không?
**Không!** Hoàn toàn đầy đủ như Cách 2.

### 2. Tôi có thể đóng browser không?
**Không.** Đóng browser = tắt app. Giữ tab mở.

### 3. Chạy xong có tắt máy được không?
**Được**, nhưng nhớ tắt app trước (Ctrl+C hoặc đóng browser).

### 4. Hai cách có chạy cùng lúc được không?
**Không nên**, vì cả 2 đều dùng port 5173.

### 5. Cách nào tiết kiệm điện hơn?
**Cách 1** (Browser) nhẹ hơn, tiết kiệm pin hơn.

---

## 🚀 BẮT ĐẦU NGAY!

**Chọn 1 trong 2:**

### → Option A: Browser Mode (Khuyến nghị)
```
Double-click: START.bat
```

### → Option B: Desktop Mode
```
Double-click: START_DESKTOP.bat
```

**Sau khi mở, làm theo hướng dẫn trong app!**

---

**Happy creating! 🎬👻**
