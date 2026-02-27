import { History, Trash2, RotateCcw } from 'lucide-react'
import { HistoryItem } from '../types'

interface Props {
  history: HistoryItem[]
  onLoad: (item: HistoryItem) => void
  onClear: () => void
}

export default function HistorySection({ history, onLoad, onClear }: Props) {
  if (history.length === 0) {
    return null
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('vi-VN')
  }

  return (
    <div className="bg-horror-dark border-2 border-horror-blood rounded-lg p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-horror-blood" />
          <h2 className="text-xl font-bold text-horror-ghostly">
            Lịch Sử ({history.length})
          </h2>
        </div>
        <button
          onClick={onClear}
          className="flex items-center space-x-2 bg-horror-blood hover:bg-horror-bloodLight text-horror-ghostly text-sm px-3 py-2 rounded-lg transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span>Xóa Tất Cả</span>
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-horror-darker border border-horror-blood/50 rounded-lg p-4 hover:border-horror-blood transition-all duration-200 cursor-pointer"
            onClick={() => onLoad(item)}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-horror-ghostly/50">
                {formatDate(item.timestamp)}
              </p>
              <button className="flex items-center space-x-1 text-xs text-horror-bloodLight hover:text-horror-blood">
                <RotateCcw className="w-3 h-3" />
                <span>Tải lại</span>
              </button>
            </div>
            <p className="text-sm text-horror-ghostly line-clamp-2">
              {item.script}
            </p>
            <div className="mt-2 pt-2 border-t border-horror-mist/30">
              <p className="text-xs text-horror-ghostly/70 line-clamp-1">
                → {item.prompt.prompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
