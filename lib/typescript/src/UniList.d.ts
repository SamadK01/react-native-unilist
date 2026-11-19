import React, { type ReactElement, type ReactNode } from 'react';
import { type FlatListProps, type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { type SwipeActions } from './components/SwipeableItem';
/** Visual treatment used by the built-in empty-list loading placeholders. */
export type SkeletonVariant = 'modern' | 'classic' | 'glass' | 'material' | 'minimal' | 'neumorphic';
/** A typed group for `UniList.sections`. @example `{ title: 'Today', data: messages }` */
export interface UniListSection<ItemT> {
    /** Stable optional key for the section. */
    key?: string;
    /** Optional label available to `renderSectionHeader`. */
    title?: string;
    /** Items rendered within the section. */
    data: readonly ItemT[];
}
/**
 * Props for {@link UniList}.
 *
 * @example
 * ```tsx
 * <UniList<User> data={users} keyExtractor={user => user.id}
 *   renderItem={user => <UserRow user={user} />} recycleItems />
 * ```
 */
export interface UniListProps<ItemT> extends Omit<FlatListProps<ItemT>, 'data' | 'renderItem' | 'horizontal' | 'contentContainerStyle' | 'ListEmptyComponent'>, Omit<ScrollViewProps, 'children' | 'horizontal' | 'contentContainerStyle'> {
    /** Items to virtualize. Omit `data` to use ScrollView/children mode. */
    data?: readonly ItemT[];
    /** Typed sections select SectionList mode and support sticky headers. */
    sections?: readonly UniListSection<ItemT>[];
    /** Renders one typed list item. */
    renderItem?: (item: ItemT, index: number) => ReactElement | null;
    /** Renders a section heading in `sections` mode. */
    renderSectionHeader?: (section: UniListSection<ItemT>) => ReactElement | null;
    /** Keeps section headers visible while vertically scrolling. */
    stickySectionHeadersEnabled?: boolean;
    /** Content for non-virtualized ScrollView mode. */
    children?: ReactNode;
    /** Gap in points between adjacent cells. */
    spacing?: number;
    /** Renders cells horizontally. Chat mode should remain vertical. */
    horizontal?: boolean;
    /** Content shown when the list is empty and not loading. */
    ListEmptyComponent?: FlatListProps<ItemT>['ListEmptyComponent'];
    /** Shows skeletons while an otherwise-empty list is loading. */
    loading?: boolean;
    /** Number of skeleton cards shown during initial loading. */
    skeletonCount?: number;
    /** Skeleton visual treatment; choose the card style used by the screen. */
    skeletonVariant?: SkeletonVariant;
    /** Native React Native container style. */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /** NativeWind class forwarded to the native list/container. */
    className?: string;
    /** Enables FlatList clipped-cell windowing; this is not a native recycler. */
    recycleItems?: boolean;
    /** Opt-in native layout transition when the data array identity changes. */
    animateLayout?: boolean;
    /** Bottom-aligned, non-inverted mode for chat and streaming AI responses. */
    chatMode?: boolean;
    /** Called near the visual top in chat mode; prepend older items in chronological order. */
    onLoadOlder?: () => void;
    /** Called near the visual bottom in chat mode. */
    onLoadNewer?: () => void;
    /** Prevents duplicate top pagination callbacks while older items are loading. */
    loadingOlder?: boolean;
    /** Prevents duplicate bottom pagination callbacks while newer items are loading. */
    loadingNewer?: boolean;
    /** Typed leading/trailing swipe action configuration for every cell. */
    swipeActions?: SwipeActions<ItemT>;
}
/** Imperative controls exposed through `ref` on {@link UniList}. */
export interface UniListRef {
    /** Scrolls to a virtualized item index. */
    scrollToIndex: (opts: {
        index: number;
        animated?: boolean;
    }) => void;
    /** Scrolls to the start of either list mode. */
    scrollToTop: (animated?: boolean) => void;
    /** Scrolls to the end of either list mode. */
    scrollToEnd: (animated?: boolean) => void;
}
/**
 * Typed React Native list for feeds, data grids, and non-inverted AI chat.
 *
 * @example
 * ```tsx
 * const ref = useRef<UniListRef>(null);
 * <UniList<Message> ref={ref} chatMode data={messages}
 *   keyExtractor={message => message.id}
 *   renderItem={message => <Bubble message={message} />} />
 * ```
 */
export declare const UniList: <ItemT>(props: UniListProps<ItemT> & {
    ref?: React.Ref<UniListRef>;
}) => ReactElement;
//# sourceMappingURL=UniList.d.ts.map