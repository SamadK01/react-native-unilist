import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
/** Props for {@link GridLayout}. @example `<GridLayout columns={2} spacing={12}>{cards}</GridLayout>` */
export interface GridLayoutProps {
    /** Cells to place into grid rows. */
    children: React.ReactNode;
    /** Number of cells per row; use a positive integer. */
    columns?: number;
    /** Gap and outer padding in points. */
    spacing?: number;
    /** Optional width-to-height ratio applied to every cell. */
    aspectRatio?: number;
    /** Native style applied to the grid container. */
    style?: StyleProp<ViewStyle>;
}
/** Simple responsive grid layout for a small static group of children. @example `<GridLayout columns={3}>{tiles}</GridLayout>` */
export declare const GridLayout: React.FC<GridLayoutProps>;
//# sourceMappingURL=GridLayout.d.ts.map