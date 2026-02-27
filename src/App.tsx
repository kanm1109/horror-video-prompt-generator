import { useState, useEffect } from 'react'
import { userTrackingService } from './services/userTrackingService'
import Header from './components/Header'
import ApiKeySection from './components/ApiKeySection'
import InputSection from './components/InputSection'
import OutputSection from './components/OutputSection'
import HistorySection from './components/HistorySection'
import LongScriptTab from './components/LongScriptTab'
import { generatePrompt } from './services/geminiService'
import { PromptResult, HistoryItem } from './types'
import { FileText, Scroll, FolderOpen } from 'lucide-react'
import { loadProjectFromFile } from './services/timelineExporter'

type TabType = 'short' | 'long'

function App() {
  const [apiKey, setApiKey] = useState<string>('')
  const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<TabType>('short')
  const [script, setScript] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [currentPrompt, setCurrentPrompt] = useState<PromptResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [error, setError] = useState<string>('')

  // Load API key and history from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key')
    const savedHistory = localStorage.getItem('prompt_history')
    
    if (savedKey) {
      setApiKey(savedKey)
      setIsApiKeyValid(true)
    }
    
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load history:', e)
      }
    }

    // Initialize user tracking (tự động log user)
    userTrackingService.initialize()

    // Keyboard shortcut: Ctrl+Shift+S để show Google Sheets Sync
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        (window as any).__showGoogleSheetsSync = !(window as any).__showGoogleSheetsSync
        alert((window as any).__showGoogleSheetsSync ? '✅ Google Sheets Sync hiện' : '❌ Google Sheets Sync ẩn')
        // Force page reload to show/hide component
        window.location.reload()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('prompt_history', JSON.stringify(history))
    }
  }, [history])

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setIsApiKeyValid(true)
    localStorage.setItem('gemini_api_key', key)
  }

  const handleGenerate = async () => {
    if (!script.trim()) {
      setError('Vui lòng nhập kịch bản!')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const result = await generatePrompt(script, apiKey)
      setCurrentPrompt(result)
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        script: script,
        prompt: result
      }
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 50)) // Keep last 50
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tạo prompt')
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLoadFromHistory = (item: HistoryItem) => {
    setScript(item.script)
    setCurrentPrompt(item.prompt)
  }

  const handleClearHistory = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      setHistory([])
      localStorage.removeItem('prompt_history')
    }
  }

  const handleLoadProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    loadProjectFromFile(
      file,
      (projectData) => {
        // Check if it's a long script project (multiple scenes)
        if (projectData.scenes && projectData.scenes.length > 0) {
          // Switch to long script tab to handle multi-scene project
          setActiveTab('long')
          alert(`✅ Project có nhiều scenes! Đã chuyển sang tab "Kịch Bản Dài".\n\nDùng nút "📁 Load Project" trong tab đó để load project.`)
        } else if (projectData.script || projectData.fullScript) {
          // Single prompt project
          const scriptText = projectData.script || projectData.fullScript || ''
          setScript(scriptText)
          
          if (projectData.prompt) {
            setCurrentPrompt(projectData.prompt)
          }
          
          setError('')
          alert(`✅ Đã load kịch bản ngắn!\n\n${scriptText.substring(0, 100)}...`)
        } else {
          setError('File project không hợp lệ!')
        }
      },
      (errorMsg) => {
        setError(errorMsg)
      }
    )

    // Reset input
    e.target.value = ''
  }

  return (
    <div className="min-h-screen bg-horror-darker text-horror-ghostly">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* API Key Section */}
        {!isApiKeyValid && (
          <ApiKeySection onSubmit={handleApiKeySubmit} />
        )}

        {/* Main Content */}
        {isApiKeyValid && (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-2 flex space-x-2">
              <button
                onClick={() => setActiveTab('short')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                  activeTab === 'short'
                    ? 'bg-horror-blood text-horror-ghostly shadow-lg'
                    : 'bg-horror-darker text-horror-ghostly/70 hover:bg-horror-mist'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Kịch Bản Ngắn</span>
                <span className="text-xs bg-horror-bloodLight px-2 py-1 rounded">1 Prompt</span>
              </button>
              <button
                onClick={() => setActiveTab('long')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition-all duration-200 ${
                  activeTab === 'long'
                    ? 'bg-horror-blood text-horror-ghostly shadow-lg'
                    : 'bg-horror-darker text-horror-ghostly/70 hover:bg-horror-mist'
                }`}
              >
                <Scroll className="w-5 h-5" />
                <span>Kịch Bản Dài</span>
                <span className="text-xs bg-green-900 px-2 py-1 rounded">Nhiều Prompts</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'short' ? (
              <div className="space-y-6">
                {/* Load Project Button */}
                <div className="flex justify-end">
                  <label className="bg-purple-900 hover:bg-purple-800 text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center space-x-2 cursor-pointer transition-all">
                    <FolderOpen className="w-4 h-4" />
                    <span>📁 Load Project</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleLoadProject}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-horror-blood/20 border border-horror-blood text-horror-ghostly px-4 py-3 rounded-lg">
                    <p className="font-bold">⚠️ Lỗi:</p>
                    <p>{error}</p>
                  </div>
                )}

                {/* Input and Output Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InputSection
                    script={script}
                    onScriptChange={setScript}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                  />
                  
                  <OutputSection
                    prompt={currentPrompt}
                    isGenerating={isGenerating}
                  />
                </div>

                {/* History Section */}
                <HistorySection
                  history={history}
                  onLoad={handleLoadFromHistory}
                  onClear={handleClearHistory}
                />
              </div>
            ) : (
              <LongScriptTab apiKey={apiKey} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-horror-ghostly/50 text-sm">
        <p>Horror Video Prompt Generator v2.0 | Made with 💀 for YouTube Creators</p>
        <p className="text-xs mt-1">
          {activeTab === 'short' ? '📝 Single Scene Mode' : '🎬 Multi-Scene Mode'}
        </p>
      </footer>
    </div>
  )
}

export default App
