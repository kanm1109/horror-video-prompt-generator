/**
 * User Tracking Service
 * Tự động ghi log người dùng vào Google Sheets
 */

interface UserLog {
  timestamp: string;
  ip?: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  referrer: string;
  action: string;
}

class UserTrackingService {
  private readonly SHEET_ID = import.meta.env.VITE_TRACKING_SHEET_ID || '1vGltPpOHvqaLlddGM5gDYpCmswJ7lY9Pfg743nkSY0M';
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
  private readonly LOG_SHEET_NAME = 'UserLogs'; // Tên sheet để log
  private hasLogged = false;

  /**
   * Khởi tạo tracking - Tự động log khi user vào trang
   */
  async initialize() {
    // Chỉ log 1 lần mỗi session
    if (this.hasLogged) return;
    
    try {
      await this.logUserVisit('page_visit');
      this.hasLogged = true;
    } catch (error) {
      console.error('Failed to log user visit:', error);
    }
  }

  /**
   * Lấy thông tin user
   */
  private getUserInfo(): UserLog {
    return {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      referrer: document.referrer || 'Direct',
      action: 'page_visit',
    };
  }

  /**
   * Lấy IP address (qua service bên ngoài)
   */
  private async getIPAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'Unknown';
    }
  }

  /**
   * Log user visit vào Google Sheets
   */
  async logUserVisit(action: string = 'page_visit') {
    if (!this.SHEET_ID || !this.API_KEY) {
      console.warn('User tracking not configured');
      return;
    }

    try {
      // Lấy IP
      const ip = await this.getIPAddress();
      
      // Lấy thông tin user
      const userInfo = this.getUserInfo();
      userInfo.ip = ip;
      userInfo.action = action;

      // Tạo row data
      const row = [
        userInfo.timestamp,
        userInfo.ip,
        userInfo.userAgent,
        userInfo.screenResolution,
        userInfo.language,
        userInfo.referrer,
        userInfo.action,
      ];

      // Append vào Google Sheets
      await this.appendToSheet(row);

      console.log('✅ User logged:', userInfo);
    } catch (error) {
      console.error('❌ Failed to log user:', error);
    }
  }

  /**
   * Append data vào Google Sheets
   */
  private async appendToSheet(row: any[]) {
    const range = `${this.LOG_SHEET_NAME}!A:G`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${range}:append?valueInputOption=RAW&key=${this.API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [row],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to append: ${error.error?.message}`);
    }
  }

  /**
   * Log custom action
   */
  async logAction(action: string) {
    if (!this.hasLogged) {
      // Nếu chưa log visit, log luôn
      await this.initialize();
    }
    
    await this.logUserVisit(action);
  }
}

// Export singleton
export const userTrackingService = new UserTrackingService();
