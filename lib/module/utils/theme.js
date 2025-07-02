"use strict";

// Predefined color schemes
export const colorSchemes = {
  blue: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  },
  green: {
    primary: '#34C759',
    secondary: '#30D158',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  },
  purple: {
    primary: '#AF52DE',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  },
  orange: {
    primary: '#FF9500',
    secondary: '#FF6B35',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  },
  red: {
    primary: '#FF3B30',
    secondary: '#FF6B6B',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  },
  custom: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA'
  }
};

// Light theme
export const lightTheme = {
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
    info: '#5AC8FA'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  },
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20
    }
  }
};

// Dark theme
export const darkTheme = {
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
    info: '#64D2FF'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  },
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20
    }
  }
};

// Theme manager
export class ThemeManager {
  currentTheme = lightTheme;
  listeners = [];
  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
  getTheme() {
    return this.currentTheme;
  }
  setTheme(theme) {
    this.currentTheme = theme;
    this.notifyListeners();
  }
  setThemeType(type, colorScheme = 'blue') {
    let baseTheme;
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
    const updatedTheme = {
      ...baseTheme,
      type,
      colors: {
        ...baseTheme.colors,
        ...schemeColors
      }
    };
    this.setTheme(updatedTheme);
  }
  setCustomTheme(customColors) {
    const updatedTheme = {
      ...this.currentTheme,
      type: 'custom',
      colors: {
        ...this.currentTheme.colors,
        ...customColors
      }
    };
    this.setTheme(updatedTheme);
  }
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentTheme));
  }
}

// Hook for using theme
export const useTheme = () => {
  // This would need React import, but keeping it simple for now
  return ThemeManager.getInstance().getTheme();
};
//# sourceMappingURL=theme.js.map