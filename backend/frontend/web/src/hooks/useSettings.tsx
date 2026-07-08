import { useState, useEffect } from 'react';

interface Settings {
  // Contact
  contact_phone?: string;
  contact_phone_secondary?: string;
  contact_email?: string;
  contact_email_secondary?: string;
  contact_address?: string;
  contact_address_secondary?: string;
  contact_working_hours?: string;
  contact_working_hours_sat?: string;

  // Social
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_youtube?: string;
  social_whatsapp?: string;

  // About
  about_title?: string;
  about_description?: string;
  about_mission?: string;
  about_vision?: string;
  about_years_experience?: string;
  about_happy_clients?: string;
  about_properties_sold?: string;

  // SEO
  site_name?: string;
  site_tagline?: string;
  site_description?: string;
  site_keywords?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicSettings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/settings/public`);
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSettings = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAccessToken();
      const response = await fetch(`${API_URL}/api/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/api/settings/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update setting');
      }

      const updated = await response.json();
      setSettings((prev) => ({ ...prev, [key]: value }));
      return updated;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const bulkUpdateSettings = async (newSettings: Partial<Settings>) => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/api/settings/bulk`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ settings: newSettings }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const data = await response.json();
      setSettings(data);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const initializeSettings = async () => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/api/settings/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to initialize settings');
      }

      const data = await response.json();
      setSettings(data.settings);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchPublicSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    fetchPublicSettings,
    fetchAllSettings,
    updateSetting,
    bulkUpdateSettings,
    initializeSettings,
  };
};
