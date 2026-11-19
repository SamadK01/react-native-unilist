import React from 'react';
/** Props for {@link CarouselLayout}. @example `<CarouselLayout autoplay showDots>{slides}</CarouselLayout>` */
export interface CarouselLayoutProps {
    /** Slide elements. */
    children: React.ReactNode;
    /** Advances the active slide indicator at the configured interval. */
    autoplay?: boolean;
    /** Autoplay delay in milliseconds. */
    interval?: number;
    /** Renders slide position dots below the carousel. */
    showDots?: boolean;
    /** Inactive dot color. */
    dotColor?: string;
    /** Active dot color. */
    activeDotColor?: string;
    /** Fixed slide width in points. */
    itemWidth?: number;
    /** Gap after each slide in points. */
    spacing?: number;
    /** Native style applied to the carousel container. */
    style?: any;
}
/** Horizontal paged carousel. @example `<CarouselLayout itemWidth={280}>{banners}</CarouselLayout>` */
export declare const CarouselLayout: React.FC<CarouselLayoutProps>;
//# sourceMappingURL=CarouselLayout.d.ts.map