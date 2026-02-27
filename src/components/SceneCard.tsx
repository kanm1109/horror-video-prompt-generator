import { useState } from 'react'
import { Edit, Trash2, RotateCw, Check, X, Copy, ChevronDown, ChevronUp, Clock, Film, Image as ImageIcon, Download } from 'lucide-react'
import { Scene } from '../types/longScript'
import { formatTime } from '../services/sceneSplitter'

interface Props {
  scene: Scene
  onEdit: (newText: string) => void
  onRegenerate: () => void
  onDelete: () => void
  onGenerateImage?: () => void
}

export default function SceneCard({ scene, onEdit, onRegenerate, onDelete, onGenerateImage }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(scene.scriptText)
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleSave = () => {
    onEdit(editText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(scene.scriptText)
    setIsEditing(false)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleDownloadImage = () => {
    if (!scene.imageUrl) return
    
    const link = document.createElement('a')
    link.href = scene.imageUrl
    link.download = `scene-${scene.sceneNumber}-image.png`
    link.click()
  }

  const hasPrompt = !!scene.prompt
  const hasImage = !!scene.imageUrl

  return (
    <div className="bg-horror-darker border-2 border-horror-blood/50 rounded-lg overflow-hidden hover:border-horror-blood transition-all duration-200">
      {/* Header */}
      <div className="p-4 bg-horror-mist/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-horror-blood text-horror-ghostly font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
              {scene.sceneNumber}
            </div>
            <div>
              <p className="text-horror-ghostly font-semibold">
                Scene {scene.sceneNumber}
              </p>
              <div className="flex items-center space-x-3 text-xs text-horror-ghostly/70">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(scene.startTime)} - {formatTime(scene.endTime)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Film className="w-3 h-3" />
                  <span>{scene.duration}s</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Status Badge */}
            {scene.isGenerating && (
              <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded">
                Đang tạo...
              </span>
            )}
            {scene.isGeneratingImage && (
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                🎨 Tạo ảnh...
              </span>
            )}
            {hasPrompt && !scene.isGenerating && (
              <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded">
                ✓ Đã tạo
              </span>
            )}
            {hasImage && (
              <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded">
                🖼️ Có ảnh
              </span>
            )}
            {scene.error && (
              <span className="bg-horror-blood/50 text-horror-ghostly text-xs px-2 py-1 rounded">
                ✗ Lỗi
              </span>
            )}
            {scene.imageError && (
              <span className="bg-orange-900/50 text-orange-300 text-xs px-2 py-1 rounded">
                ✗ Lỗi ảnh
              </span>
            )}

            {/* Action Buttons */}
            {hasImage && (
              <button
                onClick={handleDownloadImage}
                className="text-purple-400 hover:text-purple-300"
                title="Download image"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            {hasPrompt && onGenerateImage && (
              <button
                onClick={onGenerateImage}
                disabled={scene.isGeneratingImage || hasImage}
                className="text-purple-400 hover:text-purple-300 disabled:opacity-50"
                title={hasImage ? "Image already generated" : "Generate image"}
              >
                <ImageIcon className={`w-4 h-4 ${scene.isGeneratingImage ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              disabled={scene.isGenerating}
              className="text-horror-ghostly/70 hover:text-horror-blood disabled:opacity-50"
              title="Edit scene"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onRegenerate}
              disabled={scene.isGenerating}
              className="text-horror-ghostly/70 hover:text-horror-blood disabled:opacity-50"
              title="Regenerate prompt"
            >
              <RotateCw className={`w-4 h-4 ${scene.isGenerating ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onDelete}
              disabled={scene.isGenerating}
              className="text-horror-ghostly/70 hover:text-horror-blood disabled:opacity-50"
              title="Delete scene"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-horror-ghostly/70 hover:text-horror-blood"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Script Text */}
        <div className="mb-3">
          <label className="text-xs font-semibold text-horror-bloodLight mb-1 block">
            Kịch Bản Scene:
          </label>
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-horror-dark border border-horror-mist rounded px-3 py-2 text-horror-ghostly text-sm focus:border-horror-blood focus:outline-none resize-none"
                rows={4}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 bg-green-900 hover:bg-green-800 text-horror-ghostly px-3 py-1 rounded text-xs"
                >
                  <Check className="w-3 h-3" />
                  <span>Lưu</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-1 bg-horror-mist hover:bg-horror-blood text-horror-ghostly px-3 py-1 rounded text-xs"
                >
                  <X className="w-3 h-3" />
                  <span>Hủy</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-horror-ghostly text-sm leading-relaxed">
              {scene.scriptText}
            </p>
          )}
        </div>

        {/* Error Message */}
        {scene.error && (
          <div className="mb-3 bg-horror-blood/20 border border-horror-blood rounded px-3 py-2">
            <p className="text-xs text-horror-ghostly">
              <strong>Lỗi:</strong> {scene.error}
            </p>
          </div>
        )}
        
        {/* Image Error Message */}
        {scene.imageError && (
          <div className="mb-3 bg-orange-900/20 border border-orange-600 rounded px-3 py-2">
            <p className="text-xs text-horror-ghostly">
              <strong>Lỗi ảnh:</strong> {scene.imageError}
            </p>
          </div>
        )}
        
        {/* Generated Image Preview */}
        {hasImage && (
          <div className="mb-3 bg-horror-dark rounded-lg p-3 border border-purple-500/30">
            <label className="text-xs font-semibold text-purple-400 mb-2 block">
              🖼️ Generated Image:
            </label>
            <img 
              src={scene.imageUrl} 
              alt={`Scene ${scene.sceneNumber}`}
              className="w-full rounded border border-purple-500/50 hover:border-purple-500 transition-all cursor-pointer"
              onClick={handleDownloadImage}
              title="Click to download"
            />
          </div>
        )}

        {/* Prompt Output (Expanded) */}
        {isExpanded && hasPrompt && (
          <div className="mt-4 pt-4 border-t border-horror-mist/30 space-y-3">
            {/* Main Prompt */}
            <div className="bg-horror-dark rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-horror-bloodLight">
                  📝 Prompt (English):
                </label>
                <button
                  onClick={() => handleCopy(scene.prompt!.prompt, `prompt-${scene.id}`)}
                  className="flex items-center space-x-1 text-xs bg-horror-mist hover:bg-horror-blood text-horror-ghostly px-2 py-1 rounded"
                >
                  {copiedField === `prompt-${scene.id}` ? (
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
              <p className="text-horror-ghostly text-xs leading-relaxed">
                {scene.prompt.prompt}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-horror-dark rounded p-2">
                <label className="text-xs font-semibold text-horror-bloodLight block mb-1">Style:</label>
                <p className="text-horror-ghostly text-xs">{scene.prompt.style}</p>
              </div>
              <div className="bg-horror-dark rounded p-2">
                <label className="text-xs font-semibold text-horror-bloodLight block mb-1">Mood:</label>
                <p className="text-horror-ghostly text-xs">{scene.prompt.mood}</p>
              </div>
              <div className="bg-horror-dark rounded p-2">
                <label className="text-xs font-semibold text-horror-bloodLight block mb-1">Camera:</label>
                <p className="text-horror-ghostly text-xs">{scene.prompt.camera}</p>
              </div>
              <div className="bg-horror-dark rounded p-2">
                <label className="text-xs font-semibold text-horror-bloodLight block mb-1">Lighting:</label>
                <p className="text-horror-ghostly text-xs">{scene.prompt.lighting}</p>
              </div>
            </div>

            {/* Sound Suggestion */}
            <div className="bg-horror-dark rounded p-2">
              <label className="text-xs font-semibold text-horror-bloodLight block mb-1">Sound:</label>
              <p className="text-horror-ghostly text-xs">{scene.prompt.soundSuggestion}</p>
            </div>
          </div>
        )}

        {/* Collapsed Preview */}
        {!isExpanded && hasPrompt && (
          <div className="mt-2 text-xs text-horror-ghostly/50 line-clamp-1">
            → {scene.prompt.prompt}
          </div>
        )}
      </div>
    </div>
  )
}
