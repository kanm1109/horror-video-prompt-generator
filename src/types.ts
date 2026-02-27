export interface PromptResult {
  prompt: string
  duration: number
  style: string
  mood: string
  camera: string
  lighting: string
  soundSuggestion: string
  fullJson: string
}

export interface HistoryItem {
  id: string
  timestamp: string
  script: string
  prompt: PromptResult
}

export interface ApiKeyTestResult {
  success: boolean
  message: string
  error?: string
}
