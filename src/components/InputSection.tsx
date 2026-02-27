import { Wand2, FileText } from 'lucide-react'

interface Props {
  script: string
  onScriptChange: (script: string) => void
  onGenerate: () => void
  isGenerating: boolean
}

export default function InputSection({ script, onScriptChange, onGenerate, isGenerating }: Props) {
  const exampleScripts = [
    "Một căn phòng tối tăm, chỉ có ánh nến le lói. Bóng người từ từ hiện ra sau tấm gương cổ, đôi mắt nhìn thẳng vào camera.",
    "Hành lang bệnh viện bỏ hoang, đèn huỳnh quang nhấp nháy. Tiếng bước chân vọng lại dù không có ai.",
    "Khu rừng sương mù đêm khuya. Camera từ từ zoom vào ngôi nhà hoang xa xa, có ánh sáng lạ nhấp nháy ở cửa sổ.",
    "Góc phòng tối, búp bê cổ nằm trên ghế bành. Đầu búp bê từ từ quay sang nhìn camera, miệng mở rộng."
  ]

  const handleExampleClick = (example: string) => {
    onScriptChange(example)
  }

  return (
    <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="w-6 h-6 text-horror-blood" />
        <h2 className="text-xl font-bold text-horror-ghostly">
          Kịch Bản Video
        </h2>
      </div>

      {/* Examples */}
      <div className="mb-4">
        <p className="text-sm text-horror-ghostly/70 mb-2">📝 Ví dụ (click để dùng):</p>
        <div className="space-y-2">
          {exampleScripts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="w-full text-left text-xs bg-horror-mist/20 hover:bg-horror-mist/40 border border-horror-blood/30 rounded px-3 py-2 text-horror-ghostly/80 hover:text-horror-ghostly transition-all duration-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        placeholder="Nhập kịch bản video kinh dị/bí ẩn của bạn (tiếng Việt)...

Ví dụ: Căn phòng tối tăm, chỉ có ngọn nến le lói. Bóng người từ từ hiện ra sau gương cổ, đôi mắt nhìn thẳng vào camera..."
        className="w-full h-64 bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-3 text-horror-ghostly focus:border-horror-blood focus:outline-none focus:ring-2 focus:ring-horror-blood/50 resize-none"
        disabled={isGenerating}
      />

      {/* Character count */}
      <div className="mt-2 text-xs text-horror-ghostly/50 text-right">
        {script.length} ký tự
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !script.trim()}
        className="w-full mt-4 bg-horror-blood hover:bg-horror-bloodLight disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-horror-blood/50"
      >
        <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
        <span>{isGenerating ? 'Đang tạo prompt...' : 'Tạo Prompt'}</span>
      </button>

      {/* Tips */}
      <div className="mt-4 bg-horror-mist/20 rounded-lg p-3 border border-horror-blood/30">
        <p className="text-xs text-horror-ghostly/70">
          💡 <strong>Tips:</strong> Mô tả chi tiết cảnh quay, ánh sáng, chuyển động để prompt tốt hơn!
        </p>
      </div>
    </div>
  )
}
