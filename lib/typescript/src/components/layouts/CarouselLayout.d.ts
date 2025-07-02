import React from 'react';
export interface CarouselLayoutProps {
    children: React.ReactNode;
    autoplay?: boolean;
    interval?: number;
    showDots?: boolean;
    dotColor?: string;
    activeDotColor?: string;
    itemWidth?: number;
    spacing?: number;
    style?: any;
}
export declare const CarouselLayout: React.FC<CarouselLayoutProps>;
//# sourceMappingURL=CarouselLayout.d.ts.map