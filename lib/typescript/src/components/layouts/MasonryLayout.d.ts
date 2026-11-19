import React from 'react';
/** Props for {@link MasonryLayout}. @example `<MasonryLayout columns={2}>{cards}</MasonryLayout>` */
export interface MasonryLayoutProps {
    /** Card elements assigned across columns. */
    children: React.ReactNode;
    /** Number of visual columns. */
    columns?: number;
    /** Horizontal and vertical cell gap in points. */
    spacing?: number;
    /** Native style applied to the masonry container. */
    style?: any;
}
/** Round-robin multi-column layout for static child collections. @example `<MasonryLayout>{items}</MasonryLayout>` */
export declare const MasonryLayout: React.FC<MasonryLayoutProps>;
//# sourceMappingURL=MasonryLayout.d.ts.map