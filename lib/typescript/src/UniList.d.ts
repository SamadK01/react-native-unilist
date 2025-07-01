import type { FlatListProps, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import React, { type ReactElement, type ReactNode } from 'react';
type EmptyComponent = ReactElement | null;
export interface UniListProps<ItemT = any> extends Omit<FlatListProps<ItemT>, 'renderItem' | 'data'>, Omit<ScrollViewProps, 'children'> {
    /** Data array → triggers FlatList mode. If undefined, ScrollView mode. */
    data?: ItemT[];
    /** Render function for each item (FlatList mode) */
    renderItem?: (item: ItemT, index: number) => ReactElement | null;
    /** Children (ScrollView mode) */
    children?: ReactNode;
    /** Space (px) between items / children */
    spacing?: number;
    /** Empty‑state UI */
    ListEmptyComponent?: EmptyComponent;
    /** Show when `loading` true AND no data yet */
    loading?: boolean;
    /** Optional custom container style */
    contentContainerStyle?: StyleProp<ViewStyle>;
}
/** Imperative actions forwarded to parent */
export interface UniListRef {
    /** Scroll to item index (FlatList only) */
    scrollToIndex: (opts: {
        index: number;
        animated?: boolean;
    }) => void;
    /** Scroll to top */
    scrollToTop: (animated?: boolean) => void;
}
export declare const UniList: <ItemT = any>(p: UniListProps<ItemT> & {
    ref?: React.Ref<UniListRef>;
}) => ReactElement;
export {};
//# sourceMappingURL=UniList.d.ts.map