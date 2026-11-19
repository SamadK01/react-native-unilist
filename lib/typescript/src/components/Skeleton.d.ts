import { type ReactElement } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { SkeletonVariant } from '../UniList';
/** Props for one animated loading placeholder. @example `<Skeleton variant="glass" />` */
export interface SkeletonProps {
    /** Color treatment matching a card style. */
    variant?: SkeletonVariant;
    /** Native style override for one placeholder. */
    style?: StyleProp<ViewStyle>;
    /** NativeWind class forwarded to the animated surface. */
    className?: string;
}
/** Animated, native-driver loading placeholder. @example `<Skeleton variant="material" />` */
export declare function Skeleton({ variant, style, className }: SkeletonProps): ReactElement;
/** Renders a vertical group of skeleton cards. @example `<SkeletonList count={3} variant="modern" />` */
export declare function SkeletonList({ count, variant }: {
    count: number;
    variant: SkeletonVariant;
}): ReactElement;
//# sourceMappingURL=Skeleton.d.ts.map