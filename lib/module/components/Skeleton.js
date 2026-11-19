"use strict";

import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

/** Props for one animated loading placeholder. @example `<Skeleton variant="glass" />` */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const backgrounds = {
  modern: '#e5e7eb',
  classic: '#e5e7eb',
  glass: 'rgba(255,255,255,0.42)',
  material: '#dfe3e8',
  minimal: '#f0f0f0',
  neumorphic: '#e8ecf2'
};

/** Animated, native-driver loading placeholder. @example `<Skeleton variant="material" />` */
export function Skeleton({
  variant = 'modern',
  style,
  className
}) {
  const opacity = useRef(new Animated.Value(0.45)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }), Animated.timing(opacity, {
      toValue: 0.45,
      duration: 700,
      useNativeDriver: true
    })]));
    animation.start();
    return () => animation.stop();
  }, [opacity]);
  return /*#__PURE__*/_jsxs(Animated.View, {
    accessibilityLabel: "Loading content",
    style: [styles.card, {
      backgroundColor: backgrounds[variant],
      opacity
    }, style],
    className,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.title
    }), /*#__PURE__*/_jsx(View, {
      style: styles.line
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.line, styles.shortLine]
    })]
  });
}

/** Renders a vertical group of skeleton cards. @example `<SkeletonList count={3} variant="modern" />` */
export function SkeletonList({
  count,
  variant
}) {
  return /*#__PURE__*/_jsx(View, {
    children: Array.from({
      length: Math.max(0, count)
    }, (_, index) => /*#__PURE__*/_jsx(Skeleton, {
      variant: variant
    }, index))
  });
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height: 116,
    marginBottom: 12,
    padding: 16
  },
  title: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    height: 16,
    width: '54%'
  },
  line: {
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 4,
    height: 11,
    marginTop: 16,
    width: '90%'
  },
  shortLine: {
    marginTop: 9,
    width: '62%'
  }
});
//# sourceMappingURL=Skeleton.js.map