import { useState } from 'react'
import { Key, TestTube, Eye, EyeOff, ExternalLink, Settings } from 'lucide-react'
import { testApiKey } from '../services/geminiService'
import GoogleSheetsSync from './GoogleSheetsSync'

interface Props {
  onSubmit: (apiKey: string) => void
}

export default function ApiKeySection({ onSubmit }: Props) {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<string>('')
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>('auto')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult('❌ Vui lòng nhập API key!')
      setTestSuccess(false)
      return
    }

    setIsTesting(true)
    setTestResult('🔄 Đang kiểm tra API key...')
    setTestSuccess(null)

    try {
      // If user selected a specific model, save it
      if (selectedModel !== 'auto') {
        (window as any).__workingGeminiModel = selectedModel;
        (window as any).__userSelectedModel = true;
      } else {
        (window as any).__userSelectedModel = false;
      }
      
      const result = await testApiKey(apiKey)
      setTestResult(result.message)
      setTestSuccess(result.success)

      if (result.success) {
        // Auto submit after 1 second
        setTimeout(() => {
          onSubmit(apiKey)
        }, 1000)
      }
    } catch (error: any) {
      setTestResult(`❌ Lỗi: ${error.message}`)
      setTestSuccess(false)
    } finally {
      setIsTesting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleTest()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <Key className="w-8 h-8 text-horror-blood" />
          <h2 className="text-2xl font-bold text-horror-ghostly">
            Cài Đặt API Key
          </h2>
        </div>

        {/* Instructions */}
        <div className="bg-horror-mist/30 rounded-lg p-4 mb-6 border border-horror-blood/30">
          <h3 className="font-bold text-horror-bloodLight mb-2">
            📖 Hướng dẫn lấy Gemini API Key (MIỄN PHÍ):
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-horror-ghostly/80">
            <li>Truy cập: <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-horror-bloodLight underline hover:text-horror-blood inline-flex items-center"
            >
              Google AI Studio
              <ExternalLink className="w-3 h-3 ml-1" />
            </a></li>
            <li>Đăng nhập bằng tài khoản Google</li>
            <li>Nhấn "Get API key" hoặc "Create API key"</li>
            <li>Chọn "Create API key in new project"</li>
            <li>Copy API key (dạng: AIza...)</li>
            <li>Paste vào ô bên dưới và nhấn "Test API Key"</li>
          </ol>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-horror-ghostly mb-2 font-semibold">
              Gemini API Key:
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-3 pr-12 text-horror-ghostly focus:border-horror-blood focus:outline-none focus:ring-2 focus:ring-horror-blood/50 font-mono"
                disabled={isTesting}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-horror-ghostly/50 hover:text-horror-ghostly"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm text-horror-bloodLight hover:text-horror-blood transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>{showAdvanced ? '▼' : '▶'} Cài đặt nâng cao (Chọn model cụ thể)</span>
            </button>
          </div>

          {/* Advanced Model Selection */}
          {showAdvanced && (
            <div className="bg-horror-mist/20 rounded-lg p-4 border border-horror-blood/30 space-y-3">
              <label className="block text-horror-ghostly font-semibold text-sm">
                🎯 Chọn Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-2 text-horror-ghostly focus:border-horror-blood focus:outline-none focus:ring-2 focus:ring-horror-blood/50"
                disabled={isTesting}
              >
                <option value="auto">🤖 Tự động (Khuyên dùng)</option>
                
                <optgroup label="🆓 FREE TIER - Khuyên dùng">
                  <option value="gemini-1.5-flash">gemini-1.5-flash (Nhanh nhất)</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (Chất lượng cao)</option>
                  <option value="gemini-pro">gemini-pro (Legacy, ổn định)</option>
                </optgroup>
                
                <optgroup label="💎 PAID/EXPERIMENTAL - Cần PAID API">
                  <option value="gemini-2.0-flash-exp">gemini-2.0-flash-exp (Thử nghiệm)</option>
                  <option value="models/gemini-2.0-flash-exp">models/gemini-2.0-flash-exp</option>
                </optgroup>
                
                <optgroup label="🔄 VARIANTS - Với prefix">
                  <option value="models/gemini-1.5-flash">models/gemini-1.5-flash</option>
                  <option value="models/gemini-1.5-pro">models/gemini-1.5-pro</option>
                  <option value="models/gemini-pro">models/gemini-pro</option>
                  <option value="models/gemini-1.5-flash-latest">models/gemini-1.5-flash-latest</option>
                  <option value="models/gemini-1.5-pro-latest">models/gemini-1.5-pro-latest</option>
                </optgroup>
              </select>
              
              <p className="text-xs text-horror-ghostly/70">
                💡 <strong>Khuyên dùng "Tự động"</strong> - App sẽ thử nhiều models để tìm model phù hợp nhất.
                {selectedModel !== 'auto' && (
                  <span className="block mt-1 text-horror-bloodLight">
                    ⚠️ Đã chọn: <strong>{selectedModel}</strong> - Chỉ dùng model này!
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Test Result */}
          {testResult && (
            <div className={`p-4 rounded-lg border-2 ${
              testSuccess === true 
                ? 'bg-green-900/20 border-green-500 text-green-300' 
                : testSuccess === false
                ? 'bg-horror-blood/20 border-horror-blood text-horror-ghostly'
                : 'bg-blue-900/20 border-blue-500 text-blue-300'
            }`}>
              <p className="font-semibold">{testResult}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isTesting || !apiKey.trim()}
              className="flex-1 bg-horror-blood hover:bg-horror-bloodLight disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-horror-blood/50"
            >
              <TestTube className="w-5 h-5" />
              <span>{isTesting ? 'Đang kiểm tra...' : 'Test API Key'}</span>
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-6 text-xs text-horror-ghostly/60 text-center">
          <p>🔒 API key được lưu trên máy của bạn, không gửi đi đâu khác.</p>
          <p>💰 Gemini API có 15 requests/phút miễn phí - đủ dùng!</p>
        </div>
      </div>

      {/* Google Sheets Sync */}
      <GoogleSheetsSync
        onApiKeySync={(syncedKey) => {
          setApiKey(syncedKey)
          // Auto submit nếu sync thành công
          if (syncedKey) {
            onSubmit(syncedKey)
          }
        }}
        currentApiKey={apiKey}
      />
    </div>
  )
}
