# 🎬 Hướng Dẫn Sử Dụng Tính Năng Long Script

## 📖 Tính Năng Mới - Kịch Bản Dài (v2.0)

App giờ có **2 MODES**:

### 🔵 Mode 1: Kịch Bản Ngắn (Short Script)
- Tạo **1 prompt** cho **1 scene** ngắn
- Phù hợp: Video 5 giây đơn lẻ
- Nhanh, đơn giản

### 🟢 Mode 2: Kịch Bản Dài (Long Script) - MỚI! ✨
- Tạo **nhiều prompts** cho **nhiều scenes**
- Tự động chia kịch bản dài thành từng scene
- Phù hợp: Video dài, YouTube shorts, series

---

## 🚀 Cách Sử Dụng Long Script Mode

### Bước 1: Chuyển Sang Tab "Kịch Bản Dài"
- Sau khi nhập API key
- Click tab **"Kịch Bản Dài"** ở trên cùng
- Giao diện mới sẽ hiện ra

### Bước 2: Nhập Thông Tin Project
1. **Tên Project**: Đặt tên cho project của bạn (VD: "Video Kinh Dị Tập 1")
2. **Độ dài mỗi scene**: Mặc định 5 giây (có thể đổi 3-15 giây)
3. **Kịch Bản Đầy Đủ**: Paste toàn bộ kịch bản dài

### Bước 3: Chia Scenes
- Click nút **"Chia Thành Scenes"**
- AI sẽ tự động phân tích và chia kịch bản
- Đợi 5-10 giây
- Danh sách scenes sẽ hiện ra

### Bước 4: Preview & Edit
- Xem tất cả scenes đã chia
- Click **Edit** để sửa scene nào đó
- Click **Delete** để xóa scene không cần
- Mỗi scene có:
  - Số thứ tự
  - Thời gian bắt đầu/kết thúc
  - Nội dung kịch bản

### Bước 5: Tạo Prompts
Click **"Tạo Tất Cả Prompts"**:
- AI sẽ tạo prompt cho từng scene
- Có progress bar (VD: 5/20 scenes)
- Mỗi scene sẽ được generate lần lượt
- Đợi cho đến khi hoàn tất

### Bước 6: Export
Sau khi tạo xong, bạn có thể:
- **Export Timeline JSON**: File JSON chứa tất cả prompts + thông tin timeline
- **Export CSV**: File Excel để xem/edit dễ hơn

---

## 📊 VÍ DỤ THỰC TẾ

### Input: Kịch Bản Dài (6000 ký tự)
```
Cảnh mở đầu: Căn phòng tối tăm, chỉ có ngọn nến nhấp nháy ở góc bàn. 
Bóng tối bao phủ khắp nơi.

Camera từ từ zoom vào tấm gương cổ treo tường. Gương có vết nứt chạy dọc 
giữa, tạo cảm giác rợn người.

Trong gương, từ từ hiện ra bóng người phía sau, nhưng khi quay lại thì 
không có ai.

Đột ngột, ngọn nến tắt. Phòng chìm trong bóng tối hoàn toàn.

Tiếng bước chân vang lên trong hành lang. Từng bước một, đều đặn, 
đang đến gần.

Cửa phòng từ từ mở ra, kẽ cửa hé có ánh sáng lạ chiếu vào...

(Và nhiều cảnh khác...)
```

### Output: 6-8 Scenes
- **Scene 1** (0:00-0:05): Căn phòng tối, nến nhấp nháy
- **Scene 2** (0:05-0:10): Camera zoom vào gương
- **Scene 3** (0:10-0:15): Bóng người hiện trong gương
- **Scene 4** (0:15-0:20): Ngọn nến tắt
- **Scene 5** (0:20-0:25): Tiếng bước chân
- **Scene 6** (0:25-0:30): Cửa mở ra
- ...

Mỗi scene có **prompt JSON riêng** để tạo video Sora!

---

## 🎨 TÍNH NĂNG NỔI BẬT

### ✅ AI Auto Split
- Thông minh chia scenes tự nhiên
- Tránh cắt giữa chừng hành động
- Mỗi scene đủ chi tiết cho 5s video

### ✅ Edit Từng Scene
- Click Edit để sửa nội dung
- Xóa scenes không cần
- Thêm/bớt chi tiết

### ✅ Preview Trước Khi Generate
- Xem tất cả scenes trước
- Đảm bảo chia đúng ý
- Chỉnh sửa nếu cần

### ✅ Batch Generation
- Tạo tất cả prompts 1 lúc
- Có progress indicator
- Tự động retry nếu lỗi

### ✅ Timeline Export
**Format JSON:**
```json
{
  "version": "1.0",
  "projectName": "Horror Video Project",
  "totalDuration": 30,
  "scenes": [
    {
      "sceneNumber": 1,
      "startTime": 0,
      "endTime": 5,
      "duration": 5,
      "prompt": "Detailed English prompt...",
      "style": "cinematic horror",
      "mood": "eerie",
      "camera": "slow zoom",
      "lighting": "dim shadows",
      "sound": "ambient horror"
    }
  ]
}
```

**Format CSV:**
| Scene | Start | End | Duration | Script | Prompt | Style | Mood |
|-------|-------|-----|----------|--------|--------|-------|------|
| 1 | 0 | 5 | 5 | Căn phòng... | Dark room... | horror | eerie |
| 2 | 5 | 10 | 5 | Camera zoom... | Slowly zoom... | horror | mysterious |

---

## 💡 TIPS & BEST PRACTICES

### 📝 Viết Kịch Bản Tốt

**✅ DO:**
- Chia rõ từng cảnh/đoạn (dùng enter xuống dòng)
- Mô tả chi tiết: ánh sáng, chuyển động, góc máy
- Thứ tự logic, có đầu-giữa-cuối
- Dùng từ ngữ gợi cảm (rợn người, lạnh gáy, bí ẩn)

**❌ DON'T:**
- Viết chung 1 đoạn dài không ngắt
- Mô tả chung chung thiếu chi tiết
- Nhảy cóc không logic
- Quá ngắn hoặc quá dài

### ⏱️ Độ Dài Scene

**5 giây (Khuyến nghị):**
- Phù hợp Sora
- Đủ chi tiết
- Dễ kiểm soát

**3-4 giây:**
- Nhanh, dynamic
- Action shots
- Jump scares

**7-10 giây:**
- Slow burn
- Establishing shots
- Build-up scenes

### 🎬 Quy Trình Làm Video

1. **Viết kịch bản full** (Google Docs, Word)
2. **Paste vào app** → Chia scenes
3. **Edit scenes** nếu cần
4. **Generate all prompts**
5. **Export JSON/CSV**
6. **Dùng prompts trong Sora** để tạo từng clip
7. **Import JSON timeline** vào video editor
8. **Ghép clips lại** theo thứ tự
9. **Add audio, effects**
10. **Export video final**! 🎉

---

## 📊 GIỚI HẠN & LƯU Ý

### Quota API
- Gemini free: **15 requests/phút**
- Nếu có 20 scenes → Mất ~2 phút (có delay tự động)
- Nếu vượt quota → Đợi 1 phút rồi thử lại

### Độ Dài Kịch Bản
- **Không giới hạn** về ký tự
- Nhưng quá dài (50+ scenes) → Lâu
- Khuyến nghị: 10-30 scenes (~1-2.5 phút video)

### Chất Lượng AI Split
- AI khá thông minh nhưng không hoàn hảo
- Luôn **review và edit** scenes sau khi chia
- Nếu chia sai → Edit hoặc tách bằng tay

---

## ❓ FAQ

### 1. Tôi có thể edit scenes sau khi chia không?
**Có!** Click Edit trên bất kỳ scene nào.

### 2. Nếu AI chia sai scenes?
Delete scenes sai, hoặc edit nội dung lại.

### 3. Có thể thêm scenes mới không?
Hiện tại chưa. Hãy thêm vào kịch bản gốc rồi chia lại.

### 4. File JSON/CSV dùng để làm gì?
- Import vào video editor (Premiere, DaVinci)
- Lưu trữ prompts
- Chia sẻ với team

### 5. Có thể dùng prompts cho AI khác không?
Có! Prompts tương thích với Runway, Pika, v.v.

### 6. Scenes có thể dài hơn 5s không?
Có! Đổi "Độ dài mỗi scene" thành 7-10-15 giây.

### 7. Tôi có thể lưu project không?
Scenes được lưu trong browser. Export JSON để backup.

---

## 🎯 WORKFLOW ĐỀ NGHỊ

### Cho Video Ngắn (< 1 phút):
1. Dùng **Long Script Mode**
2. Chia 10-12 scenes (5s mỗi scene)
3. Generate all prompts
4. Export JSON
5. Tạo videos trong Sora
6. Ghép lại

### Cho Series Dài:
1. Chia kịch bản thành **nhiều episodes**
2. Mỗi episode = 1 project riêng
3. Export JSON cho từng episode
4. Làm từng episode một

### Cho Testing:
1. Dùng kịch bản ngắn (3-5 scenes)
2. Test trước khi làm full
3. Xem quality có OK không
4. Adjust rồi làm tiếp

---

## 🆕 CHANGELOG v2.0

**Tính năng mới:**
- ✅ Tab "Kịch Bản Dài"
- ✅ AI auto split scenes
- ✅ Batch prompt generation
- ✅ Scene editor
- ✅ Timeline export (JSON/CSV)
- ✅ Progress indicator
- ✅ Multi-scene preview
- ✅ Timestamp management

**Cải tiến:**
- ✅ Updated to Gemini 2.5 Flash
- ✅ Better error handling
- ✅ Faster processing
- ✅ Improved UI/UX

---

**Chúc bạn tạo được những video kinh dị đỉnh cao! 🎬👻🔥**

*Có câu hỏi? Đọc lại guide hoặc thử nghiệm với kịch bản mẫu!*
