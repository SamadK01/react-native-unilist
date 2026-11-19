"use strict";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { FlatList, LayoutAnimation, ScrollView, SectionList, View } from 'react-native';
import { SkeletonList } from "./components/Skeleton.js";
import { SwipeableItem } from "./components/SwipeableItem.js";

/** Visual treatment used by the built-in empty-list loading placeholders. */

/** A typed group for `UniList.sections`. @example `{ title: 'Today', data: messages }` */

/**
 * Props for {@link UniList}.
 *
 * @example
 * ```tsx
 * <UniList<User> data={users} keyExtractor={user => user.id}
 *   renderItem={user => <UserRow user={user} />} recycleItems />
 * ```
 */

/** Imperative controls exposed through `ref` on {@link UniList}. */
import { jsx as _jsx } from "react/jsx-runtime";
function UniListInner({
  data,
  sections,
  renderItem,
  renderSectionHeader,
  stickySectionHeadersEnabled = true,
  children,
  spacing = 0,
  horizontal = false,
  ListEmptyComponent,
  loading = false,
  skeletonCount = 3,
  skeletonVariant = 'modern',
  contentContainerStyle,
  className,
  recycleItems = false,
  animateLayout = false,
  chatMode = false,
  onLoadOlder,
  onLoadNewer,
  loadingOlder = false,
  loadingNewer = false,
  swipeActions,
  onScroll,
  onContentSizeChange,
  onEndReached,
  onEndReachedThreshold,
  getItemLayout,
  ...rest
}, ref) {
  const flatRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const isNearBottom = useRef(true);
  const dataRef = useRef(data);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;
  useEffect(() => {
    if (animateLayout && dataRef.current !== data) LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dataRef.current = data;
  }, [animateLayout, data]);
  useImperativeHandle(ref, () => ({
    scrollToIndex: ({
      index,
      animated = true
    }) => {
      if (flatRef.current) flatRef.current.scrollToIndex({
        index,
        animated
      });else sectionRef.current?.scrollToLocation({
        sectionIndex: 0,
        itemIndex: index,
        animated
      });
    },
    scrollToTop: (animated = true) => {
      if (flatRef.current) flatRef.current.scrollToOffset({
        offset: 0,
        animated
      });else if (sectionRef.current) sectionRef.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
        animated
      });else scrollRef.current?.scrollTo({
        y: 0,
        animated
      });
    },
    scrollToEnd: (animated = true) => {
      if (flatRef.current) flatRef.current.scrollToEnd({
        animated
      });else if (sectionRef.current) {
        const lastSectionIndex = (sectionsRef.current?.length ?? 1) - 1;
        const lastSection = sectionsRef.current?.[lastSectionIndex];
        sectionRef.current.scrollToLocation({
          sectionIndex: lastSectionIndex,
          itemIndex: Math.max(0, (lastSection?.data.length ?? 1) - 1),
          animated
        });
      } else scrollRef.current?.scrollToEnd({
        animated
      });
    }
  }), []);
  const handleScroll = useCallback(event => {
    const {
      contentOffset,
      contentSize,
      layoutMeasurement
    } = event.nativeEvent;
    isNearBottom.current = horizontal ? contentSize.width - contentOffset.x - layoutMeasurement.width < 48 : contentSize.height - contentOffset.y - layoutMeasurement.height < 48;
    onScroll?.(event);
  }, [horizontal, onScroll]);
  const handleContentSizeChange = useCallback((width, height) => {
    onContentSizeChange?.(width, height);
    if (chatMode && isNearBottom.current) flatRef.current?.scrollToEnd({
      animated: false
    });
  }, [chatMode, onContentSizeChange]);
  const renderListItem = useCallback(({
    item,
    index
  }) => {
    if (!renderItem) return null;
    const isLast = index === (data?.length ?? 0) - 1;
    const cell = /*#__PURE__*/_jsx(View, {
      style: horizontal ? {
        marginRight: isLast ? 0 : spacing
      } : {
        marginBottom: isLast ? 0 : spacing
      },
      children: renderItem(item, index)
    });
    return swipeActions ? /*#__PURE__*/_jsx(SwipeableItem, {
      item: item,
      index: index,
      actions: swipeActions,
      children: cell
    }) : cell;
  }, [data?.length, horizontal, renderItem, spacing, swipeActions]);
  if (sections !== undefined && renderItem) {
    return /*#__PURE__*/_jsx(SectionList, {
      ref: sectionRef,
      sections: sections,
      renderItem: ({
        item,
        index
      }) => renderListItem({
        item,
        index,
        separators: {}
      }),
      renderSectionHeader: renderSectionHeader ? ({
        section
      }) => renderSectionHeader(section) : undefined,
      stickySectionHeadersEnabled: stickySectionHeadersEnabled,
      keyExtractor: (_, index) => String(index),
      onScroll: handleScroll,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: [{
        paddingBottom: spacing
      }, contentContainerStyle],
      className,
      ...rest
    });
  }
  if (data !== undefined && renderItem) {
    const emptyComponent = loading ? /*#__PURE__*/_jsx(SkeletonList, {
      count: skeletonCount,
      variant: skeletonVariant
    }) : ListEmptyComponent;
    const listContentStyle = chatMode ? {
      flexGrow: 1,
      justifyContent: 'flex-end',
      paddingBottom: spacing
    } : horizontal ? {
      paddingRight: spacing
    } : {
      paddingBottom: spacing
    };
    return /*#__PURE__*/_jsx(FlatList, {
      ref: flatRef,
      data: data,
      renderItem: renderListItem,
      horizontal: horizontal,
      ListEmptyComponent: emptyComponent,
      keyExtractor: (_, index) => String(index),
      getItemLayout: getItemLayout,
      removeClippedSubviews: recycleItems || rest.removeClippedSubviews,
      windowSize: recycleItems ? 7 : rest.windowSize,
      maxToRenderPerBatch: recycleItems ? 12 : rest.maxToRenderPerBatch,
      maintainVisibleContentPosition: chatMode ? {
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 24
      } : undefined,
      onScroll: handleScroll,
      onContentSizeChange: handleContentSizeChange,
      onEndReached: info => {
        onEndReached?.(info);
        if (chatMode && !loadingNewer) onLoadNewer?.();
      },
      onEndReachedThreshold: onEndReachedThreshold ?? (chatMode ? 0.15 : undefined),
      onStartReached: chatMode ? () => {
        if (!loadingOlder) onLoadOlder?.();
      } : undefined,
      onStartReachedThreshold: chatMode ? 0.15 : undefined,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: [listContentStyle, contentContainerStyle],
      className,
      ...rest
    });
  }
  return /*#__PURE__*/_jsx(ScrollView, {
    ref: scrollRef,
    horizontal: horizontal,
    onScroll: handleScroll,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: [{
      flexDirection: horizontal ? 'row' : 'column'
    }, contentContainerStyle],
    className,
    ...rest,
    children: React.Children.map(children, (child, index) => /*#__PURE__*/_jsx(View, {
      style: horizontal ? {
        marginRight: spacing
      } : {
        marginBottom: spacing
      },
      children: child
    }, index))
  });
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
export const UniList = /*#__PURE__*/forwardRef(UniListInner);
//# sourceMappingURL=UniList.js.map