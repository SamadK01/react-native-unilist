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
export declare const colorSchemes: Record<ColorScheme, Partial<ThemeColors>>;
export declare const lightTheme: Theme;
export declare const darkTheme: Theme;
export declare class ThemeManager {
    private static instance;
    private currentTheme;
    private listeners;
    static getInstance(): ThemeManager;
    getTheme(): Theme;
    setTheme(theme: Theme): void;
    setThemeType(type: ThemeType, colorScheme?: ColorScheme): void;
    setCustomTheme(customColors: Partial<ThemeColors>): void;
    subscribe(listener: (theme: Theme) => void): () => void;
    private notifyListeners;
}
export declare const useTheme: () => Theme;
//# sourceMappingURL=theme.d.ts.map