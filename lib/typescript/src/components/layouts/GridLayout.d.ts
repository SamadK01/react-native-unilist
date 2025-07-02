import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
export interface GridLayoutProps {
    children: React.ReactNode;
    columns?: number;
    spacing?: number;
    aspectRatio?: number;
    style?: StyleProp<ViewStyle>;
}
export declare const GridLayout: React.FC<GridLayoutProps>;
//# sourceMappingURL=GridLayout.d.ts.map