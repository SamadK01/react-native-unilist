/** Theme mode accepted by {@link ThemeManager.setThemeType}. */
export type ThemeType = 'light' | 'dark' | 'auto' | 'custom';
/** Built-in accent palette accepted by {@link ThemeManager.setThemeType}. */
export type ColorScheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'custom';
/** Semantic colors exposed by a UniList theme. */
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
/** Complete theme token object returned by {@link useTheme}. */
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
/** Accent overrides keyed by {@link ColorScheme}. */
export declare const colorSchemes: Record<ColorScheme, Partial<ThemeColors>>;
/** Default light theme token set. */
export declare const lightTheme: Theme;
/** Default dark theme token set. */
export declare const darkTheme: Theme;
/**
 * App-wide theme store with subscriptions used by {@link useTheme}.
 *
 * @example
 * ```ts
 * ThemeManager.getInstance().setThemeType('dark', 'purple');
 * ```
 */
export declare class ThemeManager {
    private static instance;
    private currentTheme;
    private listeners;
    /** Returns the shared manager instance. */
    static getInstance(): ThemeManager;
    /** Reads the active theme token object. */
    getTheme(): Theme;
    /** Replaces the active theme with a complete custom token object. */
    setTheme(theme: Theme): void;
    /** Selects a built-in mode and accent palette. */
    setThemeType(type: ThemeType, colorScheme?: ColorScheme): void;
    /** Merges custom semantic colors into the active theme. */
    setCustomTheme(customColors: Partial<ThemeColors>): void;
    /** Adds a listener and returns its unsubscribe function. */
    subscribe(listener: (theme: Theme) => void): () => void;
    private notifyListeners;
}
/**
 * React hook that rerenders when the shared theme changes.
 *
 * @example
 * ```tsx
 * const theme = useTheme();
 * return <Text style={{ color: theme.colors.text }}>Hello</Text>;
 * ```
 */
export declare const useTheme: () => Theme;
//# sourceMappingURL=theme.d.ts.map