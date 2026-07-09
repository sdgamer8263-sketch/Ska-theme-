import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeSettings {
  active_ui: string;
  primary_color: string;
  panel_background_url: string;
  login_background_url: string;
  custom_css: string;
  enable_plugin_installer: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
}

const defaultSettings: ThemeSettings = {
  active_ui: 'glass',
  primary_color: '#6366f1',
  panel_background_url: '',
  login_background_url: '',
  custom_css: '/* Add your custom CSS here */\n',
  enable_plugin_installer: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('ptero_theme_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('ptero_theme_settings', JSON.stringify(settings));
    // Apply primary color as a CSS variable for dynamic styling if needed
    document.documentElement.style.setProperty('--primary-color', settings.primary_color);
  }, [settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
