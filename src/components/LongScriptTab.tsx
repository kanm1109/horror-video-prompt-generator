import { useState } from 'react'
import { FileText, Scissors, Wand2, Download, FileSpreadsheet, Gauge, Save, FolderOpen, Image as ImageIcon } from 'lucide-react'
import { Scene, LongScriptProject, ReadingSpeed } from '../types/longScript'
import { splitScriptIntoScenes, formatTime, READING_SPEED_CONFIGS } from '../services/sceneSplitter'
import { generatePrompt, generateImage } from '../services/geminiService'
import { downloadTimeline, exportToTimeline, downloadCSV, downloadTXT, saveProject, loadProjectFromFile } from '../services/timelineExporter'
import SceneCard from './SceneCard'

interface Props {
  apiKey: string
}

export default function LongScriptTab({ apiKey }: Props) {
  const [fullScript, setFullScript] = useState('')
  const [projectTitle, setProjectTitle] = useState('Horror Video Project')
  const [sceneDuration, setSceneDuration] = useState(5)
  const [readingSpeed, setReadingSpeed] = useState<ReadingSpeed>('standard')
  const [scenes, setScenes] = useState<Scene[]>([])
  const [isSplitting, setIsSplitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [imageProgress, setImageProgress] = useState({ current: 0, total: 0 })
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [newApiKey, setNewApiKey] = useState('')
  const [isTestingKey, setIsTestingKey] = useState(false)
  const [apiKeyError, setApiKeyError] = useState('')

  const handleSplitScenes = async () => {
    if (!fullScript.trim()) {
      setError('Vui lòng nhập kịch bản!')
      return
    }

    setIsSplitting(true)
    setError('')

    try {
      const result = await splitScriptIntoScenes(fullScript, apiKey, sceneDuration, readingSpeed)
      
      const scenesWithId: Scene[] = result.scenes.map((scene, index) => ({
        ...scene,
        id: `scene-${Date.now()}-${index}`
      }))

      setScenes(scenesWithId)
      setError('')
    } catch (err: any) {
      setError(`Lỗi khi chia scenes: ${err.message}`)
      console.error('Split error:', err)
    } finally {
      setIsSplitting(false)
    }
  }
  
  // Calculate estimated stats
  const speedConfig = READING_SPEED_CONFIGS[readingSpeed]
  const estimatedScenes = fullScript.length > 0 
    ? Math.ceil((fullScript.length / speedConfig.charsPerSecond) / sceneDuration)
    : 0
  const estimatedDuration = estimatedScenes * sceneDuration
  const estimatedMinutes = Math.floor(estimatedDuration / 60)
  const estimatedSeconds = estimatedDuration % 60

  const handleGenerateAllImages = async (startFrom: number = 0, customApiKey?: string) => {
    console.log('🎨 [IMAGE-ALL] Function called')
    console.log('   - Scenes:', scenes.length)
    console.log('   - Start From:', startFrom)
    console.log('   - Type of startFrom:', typeof startFrom)
    
    // FIX: Ensure startFrom is a number
    const startIndex = typeof startFrom === 'number' ? startFrom : 0
    console.log('   - Using startIndex:', startIndex)
    
    if (scenes.length === 0) {
      console.log('❌ [IMAGE-ALL] No scenes - RETURN')
      setError('Vui lòng chia scenes trước!')
      return
    }

    const keyToUse = customApiKey || apiKey
    console.log('✅ [IMAGE-ALL] Starting with key:', keyToUse ? 'Có' : 'Không')

    setIsGeneratingImages(true)
    setError('')
    setImageProgress({ current: startIndex, total: scenes.length })
    console.log('✅ [IMAGE-ALL] States set')

    try {
      const updatedScenes = [...scenes]
      console.log('✅ [IMAGE-ALL] Starting loop from index:', startIndex)

      for (let i = startIndex; i < updatedScenes.length; i++) {
        const scene = updatedScenes[i]
        
        // Skip if no prompt or already has image
        if (!scene.prompt) {
          console.log(`⏭️ [IMAGE ${i+1}] Skipping - no prompt`)
          continue
        }
        
        if (scene.imageUrl) {
          console.log(`⏭️ [IMAGE ${i+1}] Skipping - already has image`)
          continue
        }
        
        console.log(`🎨 [IMAGE ${i+1}/${updatedScenes.length}] Generating image...`)
        
        setImageProgress({ current: i + 1, total: scenes.length })
        
        // Mark as generating
        updatedScenes[i] = { ...updatedScenes[i], isGeneratingImage: true }
        setScenes([...updatedScenes])

        try {
          console.log(`   - Calling generateImage for scene ${i+1}...`)
          const imageUrl = await generateImage(scene.prompt.prompt, keyToUse)
          console.log(`   ✅ Scene ${i+1} image generated!`)
          
          updatedScenes[i] = { 
            ...updatedScenes[i], 
            imageUrl,
            isGeneratingImage: false,
            imageError: undefined
          }
        } catch (err: any) {
          console.log(`   ❌ Scene ${i+1} image error:`, err.message)
          
          // Check if quota error
          if (err.message === 'QUOTA_EXHAUSTED' || err.message.includes('quota') || err.message.includes('429')) {
            console.log(`   ⚠️ QUOTA ERROR - Showing modal`)
            setError(`⚠️ Hết quota tại scene ${i + 1}/${scenes.length}. Vui lòng đổi API key để tiếp tục.`)
            updatedScenes[i] = { 
              ...updatedScenes[i], 
              isGeneratingImage: false,
              imageError: 'Quota exhausted'
            }
            setScenes([...updatedScenes])
            setIsGeneratingImages(false)
            setShowApiKeyModal(true)
            return
          }
          
          updatedScenes[i] = { 
            ...updatedScenes[i], 
            isGeneratingImage: false,
            imageError: err.message
          }
        }

        setScenes([...updatedScenes])
        console.log(`   - Scene ${i+1} updated in state`)
        
        // Small delay to avoid rate limiting
        console.log(`   - Waiting 2s before next image...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      console.log('✅ [IMAGE-ALL] All images processed!')
      setError('')
    } catch (err: any) {
      console.log('❌ [IMAGE-ALL] Outer catch:', err.message)
      setError(`Lỗi khi tạo images: ${err.message}`)
    } finally {
      console.log('🏁 [IMAGE-ALL] Cleaning up...')
      setIsGeneratingImages(false)
      setImageProgress({ current: 0, total: 0 })
    }
  }

  const handleGenerateAllPrompts = async (startFrom: number = 0, customApiKey?: string) => {
    const currentGeneratedCount = scenes.filter(s => s.prompt).length
    
    console.log('🚀 [1] Function called')
    console.log('   - Scenes:', scenes.length)
    console.log('   - Generated Count:', currentGeneratedCount)
    console.log('   - Start From:', startFrom)
    console.log('   - API Key:', apiKey ? 'Có' : 'Không')
    
    if (scenes.length === 0) {
      console.log('❌ [2] No scenes - RETURN')
      setError('Vui lòng chia scenes trước!')
      return
    }

    const keyToUse = customApiKey || apiKey
    console.log('✅ [3] Starting generation with key:', keyToUse ? 'Có' : 'Không')

    setIsGenerating(true)
    setError('')
    setProgress({ current: startFrom, total: scenes.length })
    console.log('✅ [4] States set - isGenerating: true')

    try {
      const updatedScenes = [...scenes]
      console.log('✅ [5] Copied scenes array, starting loop...')
      console.log('🔍 [DEBUG] startFrom:', startFrom, 'updatedScenes.length:', updatedScenes.length)
      console.log('🔍 [DEBUG] Loop will run?', startFrom < updatedScenes.length)

      for (let i = startFrom; i < updatedScenes.length; i++) {
        console.log(`📝 [LOOP ${i+1}/${updatedScenes.length}] Processing scene ${i+1}`)
        
        setProgress({ current: i + 1, total: scenes.length })
        
        // Mark as generating
        updatedScenes[i] = { ...updatedScenes[i], isGenerating: true }
        setScenes([...updatedScenes])
        console.log(`   - Scene ${i+1} marked as generating`)

        try {
          console.log(`   - Calling generatePrompt for scene ${i+1}...`)
          const prompt = await generatePrompt(updatedScenes[i].scriptText, keyToUse)
          console.log(`   ✅ Scene ${i+1} prompt generated!`)
          
          updatedScenes[i] = { 
            ...updatedScenes[i], 
            prompt,
            isGenerating: false,
            error: undefined
          }
        } catch (err: any) {
          console.log(`   ❌ Scene ${i+1} error:`, err.message)
          
          // Check if quota error
          if (err.message.includes('quota') || err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED')) {
            console.log(`   ⚠️ QUOTA ERROR - Showing modal`)
            setError(`⚠️ Hết quota tại scene ${i + 1}/${scenes.length}. Vui lòng đổi API key để tiếp tục.`)
            updatedScenes[i] = { 
              ...updatedScenes[i], 
              isGenerating: false,
              error: 'Quota exhausted'
            }
            setScenes([...updatedScenes])
            setIsGenerating(false)
            setShowApiKeyModal(true)
            return
          }
          
          updatedScenes[i] = { 
            ...updatedScenes[i], 
            isGenerating: false,
            error: err.message
          }
        }

        setScenes([...updatedScenes])
        console.log(`   - Scene ${i+1} updated in state`)
        
        // Small delay to avoid rate limiting
        console.log(`   - Waiting 1s before next scene...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      console.log('✅ [DONE] All scenes processed!')
      setError('')
    } catch (err: any) {
      console.log('❌ [ERROR] Outer catch:', err.message)
      setError(`Lỗi khi tạo prompts: ${err.message}`)
    } finally {
      console.log('🏁 [FINALLY] Cleaning up...')
      setIsGenerating(false)
      setProgress({ current: 0, total: 0 })
    }
  }

  const handleTestNewApiKey = async () => {
    if (!newApiKey.trim()) {
      setApiKeyError('Vui lòng nhập API key!')
      return
    }

    setIsTestingKey(true)
    setApiKeyError('')

    try {
      await generatePrompt('Test', newApiKey)
      setApiKeyError('')
      alert('✅ API key hợp lệ!')
    } catch (err: any) {
      setApiKeyError(`❌ API key không hợp lệ: ${err.message}`)
    } finally {
      setIsTestingKey(false)
    }
  }

  const handleResumeWithNewKey = () => {
    if (!newApiKey.trim()) {
      setApiKeyError('Vui lòng nhập API key!')
      return
    }

    setShowApiKeyModal(false)
    setApiKeyError('')
    
    // Resume from current progress
    handleGenerateAllPrompts(progress.current, newApiKey)
  }

  const handleEditScene = (sceneId: string, newText: string) => {
    setScenes(scenes.map(scene => 
      scene.id === sceneId 
        ? { ...scene, scriptText: newText, prompt: undefined } 
        : scene
    ))
  }

  const handleRegenerateScene = async (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId)
    if (!scene) return

    const updatedScenes = scenes.map(s => 
      s.id === sceneId ? { ...s, isGenerating: true, error: undefined } : s
    )
    setScenes(updatedScenes)

    try {
      const prompt = await generatePrompt(scene.scriptText, apiKey)
      setScenes(scenes.map(s => 
        s.id === sceneId 
          ? { ...s, prompt, isGenerating: false } 
          : s
      ))
    } catch (err: any) {
      setScenes(scenes.map(s => 
        s.id === sceneId 
          ? { ...s, isGenerating: false, error: err.message } 
          : s
      ))
    }
  }

  const handleDeleteScene = (sceneId: string) => {
    setScenes(scenes.filter(s => s.id !== sceneId))
  }

  const handleGenerateImageForScene = async (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId)
    if (!scene || !scene.prompt) return

    const updatedScenes = scenes.map(s => 
      s.id === sceneId ? { ...s, isGeneratingImage: true, imageError: undefined } : s
    )
    setScenes(updatedScenes)

    try {
      const imageUrl = await generateImage(scene.prompt.prompt, apiKey)
      setScenes(scenes.map(s => 
        s.id === sceneId 
          ? { ...s, imageUrl, isGeneratingImage: false } 
          : s
      ))
    } catch (err: any) {
      setScenes(scenes.map(s => 
        s.id === sceneId 
          ? { ...s, isGeneratingImage: false, imageError: err.message } 
          : s
      ))
    }
  }

  const handleExportTimeline = () => {
    const timeline = exportToTimeline(scenes, projectTitle)
    downloadTimeline(timeline)
  }

  const handleExportCSV = () => {
    downloadCSV(scenes, projectTitle)
  }

  const handleExportTXT = () => {
    downloadTXT(scenes, projectTitle)
  }

  const handleSaveProject = () => {
    saveProject(projectTitle, fullScript, scenes, sceneDuration, readingSpeed)
  }

  const handleLoadProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    loadProjectFromFile(
      file,
      (projectData) => {
        // Load all project data
        setProjectTitle(projectData.projectName || 'Horror Video Project')
        setFullScript(projectData.fullScript || '')
        setScenes(projectData.scenes || [])
        setSceneDuration(projectData.settings?.sceneDuration || 5)
        setReadingSpeed(projectData.settings?.readingSpeed || 'standard')
        setError('')
        
        alert(`✅ Đã load project: ${projectData.projectName}\n${projectData.stats?.generatedCount || 0}/${projectData.stats?.totalScenes || 0} scenes đã có prompt`)
      },
      (errorMsg) => {
        setError(errorMsg)
      }
    )

    // Reset input
    e.target.value = ''
  }

  const totalDuration = scenes.length > 0 ? scenes[scenes.length - 1].endTime : 0
  const generatedCount = scenes.filter(s => s.prompt).length
  const imagesCount = scenes.filter(s => s.imageUrl).length

  return (
    <div className="space-y-6">
      {/* API Key Change Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-horror-dark border-4 border-horror-blood rounded-lg p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-horror-blood mb-4">⚠️ Hết Quota!</h3>
            <p className="text-horror-ghostly mb-4">
              Tiến độ: <strong>{progress.current}/{progress.total} scenes</strong>
            </p>
            <p className="text-horror-ghostly/80 text-sm mb-4">
              API key hiện tại đã hết quota. Vui lòng nhập API key mới để tiếp tục generate prompts.
            </p>
            
            {apiKeyError && (
              <div className="bg-horror-blood/20 border border-horror-blood text-horror-ghostly px-3 py-2 rounded mb-4 text-sm">
                {apiKeyError}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-horror-ghostly mb-2 font-semibold text-sm">
                API Key Mới:
              </label>
              <input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-2 text-horror-ghostly focus:border-horror-blood focus:outline-none"
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleTestNewApiKey}
                disabled={isTestingKey || !newApiKey.trim()}
                className="flex-1 bg-horror-mist hover:bg-horror-bloodLight disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm"
              >
                {isTestingKey ? 'Đang test...' : 'Test API Key'}
              </button>
              <button
                onClick={handleResumeWithNewKey}
                disabled={!newApiKey.trim()}
                className="flex-1 bg-green-900 hover:bg-green-800 disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm"
              >
                Tiếp Tục Generate
              </button>
            </div>
            
            <button
              onClick={() => setShowApiKeyModal(false)}
              className="w-full mt-2 bg-horror-darker hover:bg-horror-mist text-horror-ghostly/70 font-bold py-2 px-4 rounded-lg text-sm"
            >
              Đóng
            </button>
            
            <p className="text-horror-ghostly/50 text-xs mt-4 text-center">
              💡 Hoặc đợi ~1 phút để quota reset
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-6 h-6 text-horror-blood" />
          <h2 className="text-2xl font-bold text-horror-ghostly">
            Kịch Bản Dài (Long Script)
          </h2>
        </div>
        <p className="text-horror-ghostly/70 text-sm">
          Nhập kịch bản dài, AI sẽ tự động chia thành nhiều scenes và tạo prompt cho từng scene.
        </p>
      </div>

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

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
          <div className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-horror-ghostly mb-2 font-semibold text-sm">
                Tên Project:
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="VD: Video Kinh Dị Tập 1"
                className="w-full bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-2 text-horror-ghostly focus:border-horror-blood focus:outline-none"
              />
            </div>

            {/* Scene Duration */}
            <div>
              <label className="block text-horror-ghostly mb-2 font-semibold text-sm">
                Độ dài mỗi scene (giây):
              </label>
              <input
                type="number"
                value={sceneDuration}
                onChange={(e) => setSceneDuration(parseInt(e.target.value) || 5)}
                min="3"
                max="15"
                className="w-full bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-2 text-horror-ghostly focus:border-horror-blood focus:outline-none"
              />
              <p className="text-xs text-horror-ghostly/50 mt-1">
                Khuyến nghị: 5 giây cho Sora (giới hạn AI)
              </p>
            </div>

            {/* Reading Speed */}
            <div>
              <label className="block text-horror-ghostly mb-2 font-semibold text-sm flex items-center space-x-2">
                <Gauge className="w-4 h-4" />
                <span>Tốc độ đọc (cho video kinh dị):</span>
              </label>
              <div className="space-y-2">
                {(Object.keys(READING_SPEED_CONFIGS) as ReadingSpeed[]).map((speed) => {
                  const config = READING_SPEED_CONFIGS[speed]
                  return (
                    <label
                      key={speed}
                      className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        readingSpeed === speed
                          ? 'border-horror-blood bg-horror-blood/10'
                          : 'border-horror-mist bg-horror-darker hover:border-horror-bloodLight'
                      }`}
                    >
                      <input
                        type="radio"
                        name="readingSpeed"
                        value={speed}
                        checked={readingSpeed === speed}
                        onChange={(e) => setReadingSpeed(e.target.value as ReadingSpeed)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-horror-ghostly">{config.label}</span>
                          {config.recommended && (
                            <span className="text-xs bg-green-900 text-green-200 px-2 py-0.5 rounded">
                              Khuyến nghị
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-horror-ghostly/70 mt-1">
                          {config.description}
                        </p>
                      </div>
                    </label>
                  )
                })}
              </div>
              {fullScript.length > 0 && (
                <div className="mt-3 p-3 bg-horror-bloodLight/20 border border-horror-blood/50 rounded-lg">
                  <p className="text-xs text-horror-ghostly/90">
                    📊 <strong>Dự kiến:</strong> {estimatedScenes} scenes × {sceneDuration}s = {estimatedMinutes}:{estimatedSeconds.toString().padStart(2, '0')} phút video
                  </p>
                  <p className="text-xs text-horror-ghostly/70 mt-1">
                    Tốc độ: ~{speedConfig.charsPerSecond} ký tự/giây
                  </p>
                </div>
              )}
            </div>

            {/* Full Script */}
            <div>
              <label className="block text-horror-ghostly mb-2 font-semibold text-sm">
                Kịch Bản Đầy Đủ:
              </label>
              <textarea
                value={fullScript}
                onChange={(e) => setFullScript(e.target.value)}
                placeholder="Nhập toàn bộ kịch bản dài của bạn...

VD:
Cảnh 1: Căn phòng tối tăm, chỉ có ngọn nến nhấp nháy...

Cảnh 2: Camera zoom vào tấm gương cổ...

(Có thể dài 6000+ ký tự)"
                className="w-full h-96 bg-horror-darker border-2 border-horror-mist rounded-lg px-4 py-3 text-horror-ghostly focus:border-horror-blood focus:outline-none resize-none"
                disabled={isSplitting}
              />
              <p className="text-xs text-horror-ghostly/50 mt-1">
                {fullScript.length} ký tự
              </p>
            </div>

            {/* Split Button */}
            <button
              onClick={handleSplitScenes}
              disabled={isSplitting || !fullScript.trim()}
              className="w-full bg-horror-blood hover:bg-horror-bloodLight disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Scissors className={`w-5 h-5 ${isSplitting ? 'animate-spin' : ''}`} />
              <span>{isSplitting ? 'Đang chia scenes...' : 'Chia Thành Scenes'}</span>
            </button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
          <h3 className="text-lg font-bold text-horror-ghostly mb-4">📊 Thống Kê</h3>
          <div className="space-y-3">
            <div className="bg-horror-darker rounded-lg p-3">
              <p className="text-xs text-horror-ghostly/70">Tổng Scenes:</p>
              <p className="text-2xl font-bold text-horror-blood">{scenes.length}</p>
            </div>
            <div className="bg-horror-darker rounded-lg p-3">
              <p className="text-xs text-horror-ghostly/70">Đã Tạo Prompt:</p>
              <p className="text-2xl font-bold text-green-500">{generatedCount}/{scenes.length}</p>
            </div>
            <div className="bg-horror-darker rounded-lg p-3">
              <p className="text-xs text-horror-ghostly/70">Đã Tạo Ảnh:</p>
              <p className="text-2xl font-bold text-purple-500">{imagesCount}/{scenes.length}</p>
            </div>
            <div className="bg-horror-darker rounded-lg p-3">
              <p className="text-xs text-horror-ghostly/70">Thời Lượng:</p>
              <p className="text-2xl font-bold text-horror-ghostly">{formatTime(totalDuration)}</p>
            </div>
            <div className="bg-horror-darker rounded-lg p-3">
              <p className="text-xs text-horror-ghostly/70">Ký Tự:</p>
              <p className="text-xl font-bold text-horror-ghostly">{fullScript.length}</p>
            </div>
          </div>

          {/* Action Buttons */}
          {scenes.length > 0 && (
            <div className="mt-6 space-y-2">
              <button
                onClick={() => handleGenerateAllPrompts(0)}
                disabled={isGenerating || generatedCount === scenes.length}
                className="w-full bg-horror-bloodLight hover:bg-horror-blood disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <Wand2 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>
                  {isGenerating 
                    ? `Tạo Prompts (${progress.current}/${progress.total})` 
                    : generatedCount === scenes.length
                    ? 'Đã Tạo Hết'
                    : 'Tạo Tất Cả Prompts'
                  }
                </span>
              </button>

              <button
                onClick={() => handleGenerateAllImages(0)}
                disabled={isGeneratingImages || generatedCount === 0 || imagesCount === generatedCount}
                className="w-full bg-purple-900 hover:bg-purple-800 disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <ImageIcon className={`w-4 h-4 ${isGeneratingImages ? 'animate-spin' : ''}`} />
                <span>
                  {isGeneratingImages 
                    ? `Tạo Ảnh (${imageProgress.current}/${imageProgress.total})` 
                    : imagesCount === generatedCount
                    ? 'Đã Tạo Hết Ảnh'
                    : 'Tạo Tất Cả Ảnh'
                  }
                </span>
              </button>

              <button
                onClick={handleExportTimeline}
                disabled={generatedCount === 0}
                className="w-full bg-horror-mist hover:bg-horror-bloodLight disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Timeline JSON</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={scenes.length === 0}
                className="w-full bg-horror-mist hover:bg-horror-bloodLight disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleExportTXT}
                disabled={generatedCount === 0}
                className="w-full bg-green-900 hover:bg-green-800 disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Export TXT (JSON per scene)</span>
              </button>

              <div className="border-t border-horror-mist/30 my-2"></div>

              <button
                onClick={handleSaveProject}
                disabled={scenes.length === 0}
                className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-horror-darker disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>💾 Save Project</span>
              </button>

              <label className="w-full bg-purple-900 hover:bg-purple-800 text-horror-ghostly font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center space-x-2 cursor-pointer">
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
          )}
        </div>
      </div>

      {/* Scenes List */}
      {scenes.length > 0 && (
        <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
          <h3 className="text-xl font-bold text-horror-ghostly mb-4">
            📽️ Scenes ({scenes.length})
          </h3>
          <div className="space-y-4">
            {scenes.map((scene) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                onEdit={(newText) => handleEditScene(scene.id, newText)}
                onRegenerate={() => handleRegenerateScene(scene.id)}
                onDelete={() => handleDeleteScene(scene.id)}
                onGenerateImage={() => handleGenerateImageForScene(scene.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {scenes.length === 0 && !isSplitting && (
        <div className="bg-horror-dark border-2 border-horror-blood/50 border-dashed rounded-lg p-12 text-center">
          <Scissors className="w-16 h-16 text-horror-ghostly/30 mx-auto mb-4" />
          <p className="text-horror-ghostly/50 text-lg">
            Nhập kịch bản và nhấn "Chia Thành Scenes"
          </p>
          <p className="text-horror-ghostly/30 text-sm mt-2">
            AI sẽ tự động chia kịch bản thành các scenes 5 giây
          </p>
        </div>
      )}
    </div>
  )
}
