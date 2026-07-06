import apiClient from './apiClient';

export interface SiteSettings {
  [key: string]: string;
}

import { mockSettings } from './mockData';

class SettingsService {
  private settings = { ...mockSettings };

  async getAllSettings(): Promise<SiteSettings> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.settings;
  }

  async getPublicSettings(): Promise<SiteSettings> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.settings;
  }

  async getSettingsByCategory(category: string): Promise<SiteSettings> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.settings; // Simplified for mock
  }

  async updateSetting(key: string, value: string): Promise<any> {
    this.settings = { ...this.settings, [key]: value };
    await new Promise(resolve => setTimeout(resolve, 300));
    return { [key]: value };
  }

  async bulkUpdateSettings(settings: SiteSettings): Promise<SiteSettings> {
    this.settings = { ...this.settings, ...settings };
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.settings;
  }

  async initializeSettings(): Promise<{ message: string; settings: SiteSettings }> {
    this.settings = { ...mockSettings };
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: 'Initialized mock settings', settings: this.settings };
  }
}

export default new SettingsService();
