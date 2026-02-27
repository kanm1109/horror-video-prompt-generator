# 📊 HƯỚNG DẪN SETUP GOOGLE SHEETS API

## 🎯 MỤC TIÊU:
Lưu API key vào Google Sheets để sync nhiều thiết bị!

---

## 📋 BƯỚC 1: TẠO GOOGLE SHEET

### 1.1 Tạo Sheet mới
1. **Vào:** https://sheets.google.com
2. **Click:** "Blank" (tạo sheet trống)
3. **Đặt tên:** `Horror App Settings`

### 1.2 Tạo cấu trúc
**Sheet 1:** Settings

| A (Key) | B (Value) |
|---------|-----------|
| api_key | [API key của bạn] |
| selected_model | auto |
| last_updated | 2026-02-27 |

**Ví dụ:**
```
Row 1: api_key | AIzaSyXXXXXXXXXXXXXXXXXXX
Row 2: selected_model | gemini-1.5-flash
Row 3: last_updated | 2026-02-27 14:30:00
```

### 1.3 Copy Sheet ID
**URL của sheet:**
```
https://docs.google.com/spreadsheets/d/1abc123xyz456/edit
                                      ↑ ĐÂY LÀ SHEET ID
```

**Copy Sheet ID này!** Ví dụ: `1abc123xyz456`

---

## 📋 BƯỚC 2: TẠO GOOGLE CLOUD PROJECT

### 2.1 Tạo Project
1. **Vào:** https://console.cloud.google.com
2. **Click:** "Select a project" → "New Project"
3. **Project name:** `Horror App`
4. **Click:** "Create"
5. **Đợi 30 giây** → Project được tạo
6. **Select project** vừa tạo

### 2.2 Enable Google Sheets API
1. **Search bar góc trên:** Gõ `Sheets API`
2. **Click:** "Google Sheets API"
3. **Click:** "Enable"
4. **Đợi enable** (30 giây)

---

## 📋 BƯỚC 3: TẠO API CREDENTIALS

### 3.1 Tạo API Key (Cách đơn giản nhất)

1. **Left menu:** APIs & Services → **Credentials**
2. **Click:** "Create Credentials" → "API key"
3. **Copy API key:** `AIzaSyXXXXXXXXXXXXXXXXXXX`
4. **Click:** "Restrict Key" (quan trọng!)
5. **API restrictions:**
   - Chọn: "Restrict key"
   - Select APIs: ✅ Google Sheets API
6. **Save**

**⚠️ LƯU Ý:** API key này khác với Gemini API key!
- **Google Sheets API Key:** Để đọc/ghi sheet
- **Gemini API Key:** Để tạo prompt (lưu TRONG sheet)

---

## 📋 BƯỚC 4: CHIA SẺ GOOGLE SHEET

### 4.1 Set quyền Public (đơn giản nhất)

1. **Mở Google Sheet**
2. **Click:** "Share" (góc phải trên)
3. **General access:**
   - Click "Restricted" → Chọn "Anyone with the link"
   - Role: "Viewer" (chỉ đọc) hoặc "Editor" (đọc + ghi)
4. **Click:** "Done"

**⚠️ CHÚ Ý:** 
- Sheet này sẽ PUBLIC (ai có link đều xem được)
- Nếu muốn private hơn → Dùng OAuth2 (phức tạp hơn)

### 4.2 Hoặc dùng Service Account (bảo mật hơn)

**Nếu muốn private:**
1. APIs & Services → Credentials
2. Create Credentials → Service Account
3. Tạo service account
4. Tạo JSON key
5. Download JSON file
6. Share sheet với email của service account

**→ Phức tạp hơn nhiều, không khuyên dùng cho app cá nhân**

---

## 📋 BƯỚC 5: CODE INTEGRATION

### 5.1 Cài package

```bash
npm install axios
```

### 5.2 Tạo Google Sheets Service

Tôi sẽ tạo file `src/services/googleSheetsService.ts`

---

## 🎯 THÔNG TIN CẦN:

Sau khi setup xong Bước 1-4, bạn cần:

1. ✅ **Google Sheet ID:** `1abc123xyz456`
2. ✅ **Google Sheets API Key:** `AIzaSyXXXXXXXXX` (Google Cloud)
3. ✅ **Sheet đã public** (Anyone with link)

---

## ⏱️ THỜI GIAN:

- Bước 1 (Tạo sheet): 2 phút
- Bước 2 (Google Cloud): 3 phút
- Bước 3 (API key): 2 phút
- Bước 4 (Share): 1 phút
- **Bước 5 (Code):** Tôi làm! (5 phút)

**TỔNG: ~15 phút**

---

## 🚀 BẮT ĐẦU:

**Bạn muốn:**
1. 🟢 **Làm từng bước** (tôi hướng dẫn chi tiết)
2. 🟡 **Tôi làm setup** (bạn chỉ tạo sheet)
3. 🔵 **Giải thích thêm** về cách hoạt động

Chọn gì? 😊
