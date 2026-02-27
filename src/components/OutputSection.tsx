import { useState } from 'react'
import { Copy, Download, Check, Sparkles, Video, Palette, Camera, Sun, Volume2 } from 'lucide-react'
import { PromptResult } from '../types'

interface Props {
  prompt: PromptResult | null
  isGenerating: boolean
}

export default function OutputSection({ prompt, isGenerating }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleDownloadJson = () => {
    if (!prompt) return

    const blob = new Blob([prompt.fullJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sora-prompt-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isGenerating) {
    return (
      <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <Sparkles className="w-16 h-16 text-horror-blood animate-spin" />
          <p className="text-xl text-horror-ghostly animate-pulse">
            Đang tạo prompt ma quái...
          </p>
          <p className="text-sm text-horror-ghostly/50">
            AI đang phân tích kịch bản của bạn
          </p>
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="bg-horror-dark border-2 border-horror-blood/50 border-dashed rounded-lg p-6 shadow-xl">
        <div className="flex flex-col items-center justify-center h-96 space-y-4 text-horror-ghostly/50">
          <Video className="w-16 h-16" />
          <p className="text-lg">Prompt sẽ hiển thị ở đây</p>
          <p className="text-sm">Nhập kịch bản và nhấn "Tạo Prompt"</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-horror-blood" />
          <h2 className="text-xl font-bold text-horror-ghostly">
            Prompt Sora
          </h2>
        </div>
        <button
          onClick={handleDownloadJson}
          className="flex items-center space-x-2 bg-horror-mist hover:bg-horror-blood text-horror-ghostly text-sm px-3 py-2 rounded-lg transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          <span>JSON</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Main Prompt */}
        <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-horror-bloodLight">
              📝 Main Prompt (English):
            </label>
            <button
              onClick={() => handleCopy(prompt.prompt, 'prompt')}
              className="flex items-center space-x-1 text-xs bg-horror-mist hover:bg-horror-blood text-horror-ghostly px-2 py-1 rounded transition-all duration-200"
            >
              {copiedField === 'prompt' ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-horror-ghostly text-sm leading-relaxed">
            {prompt.prompt}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Style */}
          <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Palette className="w-4 h-4 text-horror-bloodLight" />
              <label className="text-xs font-semibold text-horror-bloodLight">Style:</label>
            </div>
            <p className="text-horror-ghostly text-sm">{prompt.style}</p>
          </div>

          {/* Mood */}
          <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="w-4 h-4 text-horror-bloodLight" />
              <label className="text-xs font-semibold text-horror-bloodLight">Mood:</label>
            </div>
            <p className="text-horror-ghostly text-sm">{prompt.mood}</p>
          </div>

          {/* Camera */}
          <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Camera className="w-4 h-4 text-horror-bloodLight" />
              <label className="text-xs font-semibold text-horror-bloodLight">Camera:</label>
            </div>
            <p className="text-horror-ghostly text-sm">{prompt.camera}</p>
          </div>

          {/* Lighting */}
          <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Sun className="w-4 h-4 text-horror-bloodLight" />
              <label className="text-xs font-semibold text-horror-bloodLight">Lighting:</label>
            </div>
            <p className="text-horror-ghostly text-sm">{prompt.lighting}</p>
          </div>
        </div>

        {/* Sound Suggestion */}
        <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Volume2 className="w-4 h-4 text-horror-bloodLight" />
            <label className="text-xs font-semibold text-horror-bloodLight">Sound Suggestion:</label>
          </div>
          <p className="text-horror-ghostly text-sm">{prompt.soundSuggestion}</p>
        </div>

        {/* Duration */}
        <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Video className="w-4 h-4 text-horror-bloodLight" />
            <label className="text-xs font-semibold text-horror-bloodLight">Duration:</label>
          </div>
          <p className="text-horror-ghostly text-sm">{prompt.duration} seconds</p>
        </div>

        {/* Full JSON */}
        <div className="bg-horror-darker border border-horror-blood/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-horror-bloodLight">
              📋 Full JSON:
            </label>
            <button
              onClick={() => handleCopy(prompt.fullJson, 'json')}
              className="flex items-center space-x-1 text-xs bg-horror-mist hover:bg-horror-blood text-horror-ghostly px-2 py-1 rounded transition-all duration-200"
            >
              {copiedField === 'json' ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-horror-ghostly text-xs overflow-x-auto bg-horror-dark p-3 rounded font-mono">
            {prompt.fullJson}
          </pre>
        </div>
      </div>
    </div>
  )
}
