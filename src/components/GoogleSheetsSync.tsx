import { useState, useEffect } from 'react'
import { Cloud, CloudOff, Settings, ExternalLink } from 'lucide-react'
import { googleSheetsService } from '../services/googleSheetsService'

interface Props {
  onApiKeySync: (apiKey: string) => void
  currentApiKey: string
}

export default function GoogleSheetsSync({ onApiKeySync, currentApiKey }: Props) {
  const [isConfigured, setIsConfigured] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const [sheetId, setSheetId] = useState('')
  const [sheetsApiKey, setSheetsApiKey] = useState('')
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<string>('')
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null)

  useEffect(() => {
    // Load config từ localStorage
    const configured = googleSheetsService.loadConfig()
    setIsConfigured(configured)
  }, [])

  const handleSetup = async () => {
    if (!sheetId.trim() || !sheetsApiKey.trim()) {
      setSyncStatus('❌ Vui lòng điền đầy đủ thông tin!')
      setSyncSuccess(false)
      return
    }

    setIsSyncing(true)
    setSyncStatus('🔄 Đang kiểm tra kết nối...')

    try {
      // Initialize service
      googleSheetsService.initialize(sheetId, sheetsApiKey)

      // Test connection
      const result = await googleSheetsService.testConnection()

      if (result.success) {
        setSyncStatus(result.message)
        setSyncSuccess(true)
        setIsConfigured(true)
        setShowSetup(false)

        // Sync API key ngay
        setTimeout(() => handleSync(), 1000)
      } else {
        setSyncStatus(result.message)
        setSyncSuccess(false)
      }
    } catch (error: any) {
      setSyncStatus(`❌ Lỗi: ${error.message}`)
      setSyncSuccess(false)
    } finally {
      setIsSyncing(false)
    }
  }

  const handleSync = async () => {
    if (!isConfigured) {
      setSyncStatus('⚠️ Chưa cấu hình Google Sheets!')
      setSyncSuccess(false)
      return
    }

    setIsSyncing(true)
    setSyncStatus('🔄 Đang sync...')
    setSyncSuccess(null)

    try {
      const syncedApiKey = await googleSheetsService.syncApiKey(currentApiKey)

      if (syncedApiKey !== currentApiKey) {
        // API key từ sheet khác với local → Cập nhật
        onApiKeySync(syncedApiKey)
        setSyncStatus('✅ Đã sync API key từ Google Sheets!')
        setSyncSuccess(true)
      } else {
        setSyncStatus('✅ Sync thành công! API key đã cập nhật.')
        setSyncSuccess(true)
      }
    } catch (error: any) {
      setSyncStatus(`❌ Sync thất bại: ${error.message}`)
      setSyncSuccess(false)
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDisconnect = () => {
    googleSheetsService.clearConfig()
    setIsConfigured(false)
    setShowSetup(false)
    setSyncStatus('🔌 Đã ngắt kết nối Google Sheets')
    setSyncSuccess(null)
  }

  return (
    <div className="bg-horror-dark border-2 border-horror-mist rounded-lg p-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {isConfigured ? (
            <Cloud className="w-5 h-5 text-green-500" />
          ) : (
            <CloudOff className="w-5 h-5 text-horror-mist" />
          )}
          <h3 className="text-sm font-bold text-horror-ghostly">
            Google Sheets Sync
          </h3>
        </div>

        <button
          onClick={() => setShowSetup(!showSetup)}
          className="text-xs text-horror-bloodLight hover:text-horror-blood transition-colors flex items-center space-x-1"
        >
          <Settings className="w-4 h-4" />
          <span>{isConfigured ? 'Cài đặt' : 'Setup'}</span>
        </button>
      </div>

      {/* Setup Form */}
      {showSetup && (
        <div className="bg-horror-mist/10 rounded p-3 mb-3 space-y-3">
          <div>
            <label className="text-xs font-semibold text-horror-ghostly block mb-1">
              Google Sheet ID:
            </label>
            <input
              type="text"
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
              placeholder="1abc123xyz456..."
              className="w-full bg-horror-darker border border-horror-mist rounded px-3 py-2 text-sm text-horror-ghostly focus:border-horror-blood focus:outline-none"
              disabled={isSyncing}
            />
            <p className="text-xs text-horror-ghostly/50 mt-1">
              Copy từ URL: docs.google.com/spreadsheets/d/<strong>[SHEET_ID]</strong>/edit
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-horror-ghostly block mb-1">
              Google Sheets API Key:
            </label>
            <input
              type="password"
              value={sheetsApiKey}
              onChange={(e) => setSheetsApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-horror-darker border border-horror-mist rounded px-3 py-2 text-sm text-horror-ghostly focus:border-horror-blood focus:outline-none"
              disabled={isSyncing}
            />
            <p className="text-xs text-horror-ghostly/50 mt-1">
              Tạo tại: <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-horror-bloodLight hover:underline">Google Cloud Console</a>
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSetup}
              disabled={isSyncing}
              className="flex-1 bg-horror-blood hover:bg-horror-bloodLight disabled:bg-horror-mist disabled:cursor-not-allowed text-horror-ghostly font-bold py-2 px-4 rounded text-sm transition-colors"
            >
              {isSyncing ? '⏳ Đang test...' : '✓ Kết nối'}
            </button>

            {isConfigured && (
              <button
                onClick={handleDisconnect}
                className="bg-horror-mist/30 hover:bg-horror-mist/50 text-horror-ghostly py-2 px-4 rounded text-sm transition-colors"
              >
                Ngắt
              </button>
            )}
          </div>

          <div className="bg-horror-dark rounded p-2 border border-horror-blood/30">
            <p className="text-xs text-horror-ghostly/70">
              📖 <strong>Hướng dẫn:</strong> Xem <code className="text-horror-bloodLight">GOOGLE_SHEETS_SETUP.md</code>
            </p>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-horror-bloodLight hover:underline flex items-center space-x-1 mt-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Tạo API Key</span>
            </a>
          </div>
        </div>
      )}

      {/* Sync Controls */}
      {isConfigured && !showSetup && (
        <div className="space-y-2">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-horror-mist/30 hover:bg-horror-mist/50 disabled:bg-horror-mist/10 disabled:cursor-not-allowed text-horror-ghostly font-semibold py-2 px-4 rounded text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <Cloud className={`w-4 h-4 ${isSyncing ? 'animate-pulse' : ''}`} />
            <span>{isSyncing ? 'Đang sync...' : 'Sync API Key từ Sheet'}</span>
          </button>
        </div>
      )}

      {/* Status Message */}
      {syncStatus && (
        <div
          className={`mt-3 p-2 rounded text-xs ${
            syncSuccess === true
              ? 'bg-green-900/30 border border-green-500/50 text-green-300'
              : syncSuccess === false
              ? 'bg-red-900/30 border border-red-500/50 text-red-300'
              : 'bg-horror-mist/10 border border-horror-mist/30 text-horror-ghostly/70'
          }`}
        >
          {syncStatus}
        </div>
      )}

      {/* Info */}
      {!isConfigured && !showSetup && (
        <div className="text-xs text-horror-ghostly/50 mt-2">
          💡 Sync API key giữa nhiều thiết bị qua Google Sheets
        </div>
      )}
    </div>
  )
}
