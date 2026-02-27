/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRACKING_SHEET_ID: string
  readonly VITE_SETTINGS_SHEET_ID: string
  readonly VITE_GOOGLE_SHEETS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
