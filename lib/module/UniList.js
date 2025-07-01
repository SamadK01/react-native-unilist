"use strict";

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

/** Imperative actions forwarded to parent */
import { jsx as _jsx } from "react/jsx-runtime";
function UniListInner({
  data,
  renderItem,
  children,
  spacing = 0,
  horizontal = false,
  ListEmptyComponent,
  loading,
  contentContainerStyle,
  ...rest
}, ref) {
  const flatRef = useRef(null);
  const scrollRef = useRef(null);

  /* ----------  expose imperative API  ---------- */
  useImperativeHandle(ref, () => ({
    scrollToIndex: ({
      index,
      animated = true
    }) => {
      if (flatRef.current) flatRef.current.scrollToIndex({
        index,
        animated
      });
    },
    scrollToTop: (animated = true) => {
      if (flatRef.current) flatRef.current.scrollToOffset({
        offset: 0,
        animated
      });else if (scrollRef.current) scrollRef.current.scrollTo({
        y: 0,
        animated
      });
    }
  }), []);

  /* ----------  item wrapper for spacing  ---------- */
  const withSpacing = render => {
    if (!spacing) return render;
    return info => /*#__PURE__*/_jsx(View, {
      style: {
        marginRight: horizontal ? spacing : 0,
        marginBottom: horizontal ? 0 : spacing
      },
      children: render(info)
    });
  };

  /* ----------  choose mode  ---------- */
  if (data && renderItem) {
    const listEmpty = !loading && data.length === 0 && ListEmptyComponent ? ListEmptyComponent : null;
    return /*#__PURE__*/_jsx(FlatList, {
      ref: flatRef,
      data: data,
      renderItem: withSpacing(({
        item,
        index
      }) => renderItem(item, index)),
      keyExtractor: (_, i) => i.toString(),
      horizontal: horizontal,
      ListEmptyComponent: listEmpty,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: [{
        paddingRight: horizontal ? spacing : 0,
        paddingBottom: spacing
      }, contentContainerStyle],
      ...rest
    });
  }

  /* ----------  ScrollView fallback  ---------- */
  return /*#__PURE__*/_jsx(ScrollView, {
    ref: scrollRef,
    horizontal: horizontal,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: [{
      flexDirection: horizontal ? 'row' : 'column',
      paddingRight: horizontal ? spacing : 0,
      paddingBottom: spacing
    }, contentContainerStyle],
    ...rest,
    children: React.Children.map(children, (child, idx) => /*#__PURE__*/_jsx(View, {
      style: {
        marginRight: horizontal ? spacing : 0,
        marginBottom: horizontal ? 0 : spacing
      },
      children: child
    }, idx))
  });
}
export const UniList = /*#__PURE__*/forwardRef(UniListInner);
//# sourceMappingURL=UniList.js.map