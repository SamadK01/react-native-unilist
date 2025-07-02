export type ThemeType = 'light' | 'dark' | 'auto' | 'custom';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'custom';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Theme {
  type: ThemeType;
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    heading: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    subheading: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    body: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    caption: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
  };
}

// Predefined color schemes
export const colorSchemes: Record<ColorScheme, Partial<ThemeColors>> = {
  blue: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  green: {
    primary: '#34C759',
    secondary: '#30D158',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  purple: {
    primary: '#AF52DE',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  orange: {
    primary: '#FF9500',
    secondary: '#FF6B35',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  red: {
    primary: '#FF3B30',
    secondary: '#FF6B6B',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  custom: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
};

// Light theme
export const lightTheme: Theme = {
  type: 'light',
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E1E5E9',
    shadow: '#000000',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
  },
};

// Dark theme
export const darkTheme: Theme = {
  type: 'dark',
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    shadow: '#000000',
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
  },
};

// Theme manager
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = lightTheme;
  private listeners: ((theme: Theme) => void)[] = [];

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.notifyListeners();
  }

  setThemeType(type: ThemeType, colorScheme: ColorScheme = 'blue'): void {
    let baseTheme: Theme;
    
    switch (type) {
      case 'dark':
        baseTheme = darkTheme;
        break;
      case 'light':
      default:
        baseTheme = lightTheme;
        break;
    }

    // Apply color scheme
    const schemeColors = colorSchemes[colorScheme];
    const updatedTheme: Theme = {
      ...baseTheme,
      type,
      colors: {
        ...baseTheme.colors,
        ...schemeColors,
      },
    };

    this.setTheme(updatedTheme);
  }

  setCustomTheme(customColors: Partial<ThemeColors>): void {
    const updatedTheme: Theme = {
      ...this.currentTheme,
      type: 'custom',
      colors: {
        ...this.currentTheme.colors,
        ...customColors,
      },
    };

    this.setTheme(updatedTheme);
  }

  subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }
}

// Hook for using theme
export const useTheme = (): Theme => {
  // This would need React import, but keeping it simple for now
  return ThemeManager.getInstance().getTheme();
}; 