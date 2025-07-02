"use strict";

import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const CarouselLayout = ({
  children,
  autoplay = false,
  interval = 3000,
  showDots = false,
  dotColor = '#CCCCCC',
  activeDotColor = '#007AFF',
  itemWidth = 300,
  spacing = 16,
  style
}) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  useEffect(() => {
    if (autoplay && childrenArray.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1);
      }, interval);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, interval, childrenArray.length]);
  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (itemWidth + spacing));
    setCurrentIndex(index);
  };
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(ScrollView, {
      ref: scrollViewRef,
      horizontal: true,
      showsHorizontalScrollIndicator: false,
      pagingEnabled: true,
      onScroll: handleScroll,
      scrollEventThrottle: 16,
      contentContainerStyle: styles.scrollContent,
      children: childrenArray.map((child, index) => /*#__PURE__*/_jsx(View, {
        style: [styles.item, {
          width: itemWidth,
          marginRight: spacing
        }],
        children: child
      }, index))
    }), showDots && childrenArray.length > 1 && /*#__PURE__*/_jsx(View, {
      style: styles.dotsContainer,
      children: childrenArray.map((_, index) => /*#__PURE__*/_jsx(View, {
        style: [styles.dot, {
          backgroundColor: index === currentIndex ? activeDotColor : dotColor
        }]
      }, index))
    })]
  });
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16
  },
  item: {
    flex: 1
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  }
});
//# sourceMappingURL=CarouselLayout.js.map