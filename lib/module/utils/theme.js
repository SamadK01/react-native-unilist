"use strict";

import { useSyncExternalStore } from 'react';

/** Theme mode accepted by {@link ThemeManager.setThemeType}. */

/** Built-in accent palette accepted by {@link ThemeManager.setThemeType}. */

/** Semantic colors exposed by a UniList theme. */

/** Complete theme token object returned by {@link useTheme}. */

// Predefined color schemes
/** Accent overrides keyed by {@link ColorScheme}. */
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
/** Default light theme token set. */
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
/** Default dark theme token set. */
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
/**
 * App-wide theme store with subscriptions used by {@link useTheme}.
 *
 * @example
 * ```ts
 * ThemeManager.getInstance().setThemeType('dark', 'purple');
 * ```
 */
export class ThemeManager {
  currentTheme = lightTheme;
  listeners = [];

  /** Returns the shared manager instance. */
  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /** Reads the active theme token object. */
  getTheme() {
    return this.currentTheme;
  }

  /** Replaces the active theme with a complete custom token object. */
  setTheme(theme) {
    this.currentTheme = theme;
    this.notifyListeners();
  }

  /** Selects a built-in mode and accent palette. */
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

  /** Merges custom semantic colors into the active theme. */
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

  /** Adds a listener and returns its unsubscribe function. */
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
/**
 * React hook that rerenders when the shared theme changes.
 *
 * @example
 * ```tsx
 * const theme = useTheme();
 * return <Text style={{ color: theme.colors.text }}>Hello</Text>;
 * ```
 */
export const useTheme = () => {
  const manager = ThemeManager.getInstance();
  return useSyncExternalStore(manager.subscribe.bind(manager), manager.getTheme.bind(manager), manager.getTheme.bind(manager));
};
//# sourceMappingURL=theme.js.map