import React, { forwardRef, type ReactElement, type ReactNode, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { FlatList, LayoutAnimation, ScrollView, SectionList, View, type FlatListProps, type ListRenderItemInfo, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollViewProps, type SectionListData, type StyleProp, type ViewStyle } from 'react-native';
import { SkeletonList } from './components/Skeleton';
import { SwipeableItem, type SwipeActions } from './components/SwipeableItem';

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
export interface UniListProps<ItemT>
  extends Omit<FlatListProps<ItemT>, 'data' | 'renderItem' | 'horizontal' | 'contentContainerStyle' | 'ListEmptyComponent'>,
    Omit<ScrollViewProps, 'children' | 'horizontal' | 'contentContainerStyle'> {
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
  scrollToIndex: (opts: { index: number; animated?: boolean }) => void;
  /** Scrolls to the start of either list mode. */
  scrollToTop: (animated?: boolean) => void;
  /** Scrolls to the end of either list mode. */
  scrollToEnd: (animated?: boolean) => void;
}

function UniListInner<ItemT>(
  {
    data, sections, renderItem, renderSectionHeader, stickySectionHeadersEnabled = true, children, spacing = 0, horizontal = false, ListEmptyComponent,
    loading = false, skeletonCount = 3, skeletonVariant = 'modern', contentContainerStyle,
    className, recycleItems = false, animateLayout = false, chatMode = false, onLoadOlder,
    onLoadNewer, loadingOlder = false, loadingNewer = false, swipeActions, onScroll,
    onContentSizeChange, onEndReached, onEndReachedThreshold, getItemLayout, ...rest
  }: UniListProps<ItemT>,
  ref: React.ForwardedRef<UniListRef>
) {
  const flatRef = useRef<FlatList<ItemT>>(null);
  const sectionRef = useRef<SectionList<ItemT>>(null);
  const scrollRef = useRef<ScrollView>(null);
  const isNearBottom = useRef(true);
  const dataRef = useRef(data);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;

  useEffect(() => {
    if (animateLayout && dataRef.current !== data) LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dataRef.current = data;
  }, [animateLayout, data]);

  useImperativeHandle(ref, () => ({
    scrollToIndex: ({ index, animated = true }) => {
      if (flatRef.current) flatRef.current.scrollToIndex({ index, animated });
      else sectionRef.current?.scrollToLocation({ sectionIndex: 0, itemIndex: index, animated });
    },
    scrollToTop: (animated = true) => {
      if (flatRef.current) flatRef.current.scrollToOffset({ offset: 0, animated });
      else if (sectionRef.current) sectionRef.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0, animated });
      else scrollRef.current?.scrollTo({ y: 0, animated });
    },
    scrollToEnd: (animated = true) => {
      if (flatRef.current) flatRef.current.scrollToEnd({ animated });
      else if (sectionRef.current) {
        const lastSectionIndex = (sectionsRef.current?.length ?? 1) - 1;
        const lastSection = sectionsRef.current?.[lastSectionIndex];
        sectionRef.current.scrollToLocation({ sectionIndex: lastSectionIndex, itemIndex: Math.max(0, (lastSection?.data.length ?? 1) - 1), animated });
      }
      else scrollRef.current?.scrollToEnd({ animated });
    },
  }), []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    isNearBottom.current = horizontal
      ? contentSize.width - contentOffset.x - layoutMeasurement.width < 48
      : contentSize.height - contentOffset.y - layoutMeasurement.height < 48;
    onScroll?.(event);
  }, [horizontal, onScroll]);

  const handleContentSizeChange = useCallback((width: number, height: number) => {
    onContentSizeChange?.(width, height);
    if (chatMode && isNearBottom.current) flatRef.current?.scrollToEnd({ animated: false });
  }, [chatMode, onContentSizeChange]);

  const renderListItem = useCallback(({ item, index }: ListRenderItemInfo<ItemT>) => {
    if (!renderItem) return null;
    const isLast = index === (data?.length ?? 0) - 1;
    const cell = <View style={horizontal ? { marginRight: isLast ? 0 : spacing } : { marginBottom: isLast ? 0 : spacing }}>{renderItem(item, index)}</View>;
    return swipeActions ? <SwipeableItem item={item} index={index} actions={swipeActions}>{cell}</SwipeableItem> : cell;
  }, [data?.length, horizontal, renderItem, spacing, swipeActions]);

  if (sections !== undefined && renderItem) {
    return <SectionList
      ref={sectionRef}
      sections={sections as SectionListData<ItemT>[]}
      renderItem={({ item, index }) => renderListItem({ item, index, separators: {} as ListRenderItemInfo<ItemT>['separators'] })}
      renderSectionHeader={renderSectionHeader ? ({ section }) => renderSectionHeader(section as UniListSection<ItemT>) : undefined}
      stickySectionHeadersEnabled={stickySectionHeadersEnabled}
      keyExtractor={(_, index) => String(index)}
      onScroll={handleScroll}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ paddingBottom: spacing }, contentContainerStyle]}
      {...({ className } as object)} {...rest}
    />;
  }

  if (data !== undefined && renderItem) {
    const emptyComponent = loading ? <SkeletonList count={skeletonCount} variant={skeletonVariant} /> : ListEmptyComponent;
    const listContentStyle: StyleProp<ViewStyle> = chatMode
      ? { flexGrow: 1, justifyContent: 'flex-end', paddingBottom: spacing }
      : horizontal ? { paddingRight: spacing } : { paddingBottom: spacing };
    return (
      <FlatList
        ref={flatRef} data={data as ItemT[]} renderItem={renderListItem} horizontal={horizontal}
        ListEmptyComponent={emptyComponent} keyExtractor={(_, index) => String(index)}
        getItemLayout={getItemLayout}
        removeClippedSubviews={recycleItems || rest.removeClippedSubviews}
        windowSize={recycleItems ? 7 : rest.windowSize}
        maxToRenderPerBatch={recycleItems ? 12 : rest.maxToRenderPerBatch}
        maintainVisibleContentPosition={chatMode ? ({ minIndexForVisible: 0, autoscrollToTopThreshold: 24 } as never) : undefined}
        onScroll={handleScroll} onContentSizeChange={handleContentSizeChange}
        onEndReached={(info) => { onEndReached?.(info); if (chatMode && !loadingNewer) onLoadNewer?.(); }}
        onEndReachedThreshold={onEndReachedThreshold ?? (chatMode ? 0.15 : undefined)}
        onStartReached={chatMode ? () => { if (!loadingOlder) onLoadOlder?.(); } : undefined}
        onStartReachedThreshold={chatMode ? 0.15 : undefined}
        showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
        contentContainerStyle={[listContentStyle, contentContainerStyle]}
        {...({ className } as object)} {...rest}
      />
    );
  }

  return (
    <ScrollView ref={scrollRef} horizontal={horizontal} onScroll={handleScroll}
      showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ flexDirection: horizontal ? 'row' : 'column' }, contentContainerStyle]}
      {...({ className } as object)} {...rest}>
      {React.Children.map(children, (child, index) => <View key={index} style={horizontal ? { marginRight: spacing } : { marginBottom: spacing }}>{child}</View>)}
    </ScrollView>
  );
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
export const UniList = forwardRef(UniListInner) as <ItemT>(props: UniListProps<ItemT> & { ref?: React.Ref<UniListRef> }) => ReactElement;
