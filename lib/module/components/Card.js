"use strict";

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

/** Built-in card surface variants. */

/** Built-in card shape and shadow treatments. */

/**
 * Shared props for every card component.
 *
 * @example
 * ```tsx
 * <OutlinedCard title="Invoice" subtitle="Paid" onPress={openInvoice} />
 * ```
 */
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const typeStyles = {
  elevated: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.12,
    shadowRadius: 8
  },
  outlined: {
    borderColor: '#d1d5db',
    borderWidth: StyleSheet.hairlineWidth
  },
  filled: {
    backgroundColor: '#e8f0fe'
  },
  // A dependency-free gradient-like fallback. Consumers can use headless + their gradient implementation for a real gradient.
  gradient: {
    backgroundColor: '#eef2ff',
    borderColor: '#c7d2fe',
    borderWidth: 1
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1
  }
};
const styleStyles = {
  modern: {
    borderRadius: 16
  },
  classic: {
    borderRadius: 6
  },
  minimal: {
    borderRadius: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  material: {
    borderRadius: 12,
    elevation: 3
  },
  neumorphic: {
    borderRadius: 18,
    shadowColor: '#b8bec8',
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.32,
    shadowRadius: 10
  }
};

/**
 * Raised general-purpose card.
 *
 * @example
 * ```tsx
 * <ElevatedCard title="Summary" cardStyle="material"><Text>42 tasks</Text></ElevatedCard>
 * ```
 */
export const ElevatedCard = ({
  children,
  title,
  subtitle,
  style,
  elevation = 5,
  borderRadius,
  backgroundColor,
  borderColor,
  type = 'elevated',
  cardStyle = 'modern',
  headless = false,
  className,
  onPress
}) => {
  const surface = [!headless && styles.card, !headless && typeStyles[type], !headless && styleStyles[cardStyle], !headless && {
    elevation: type === 'elevated' ? elevation : typeStyles[type].elevation,
    borderRadius
  }, {
    backgroundColor,
    borderColor
  }, style];
  const content = /*#__PURE__*/_jsxs(_Fragment, {
    children: [title || subtitle ? /*#__PURE__*/_jsxs(View, {
      style: !headless && styles.header,
      children: [title ? /*#__PURE__*/_jsx(Text, {
        style: !headless && styles.title,
        children: title
      }) : null, subtitle ? /*#__PURE__*/_jsx(Text, {
        style: !headless && styles.subtitle,
        children: subtitle
      }) : null]
    }) : null, children ? /*#__PURE__*/_jsx(View, {
      style: !headless && styles.content,
      children: children
    }) : null]
  });
  if (!onPress) return /*#__PURE__*/_jsx(View, {
    style: surface,
    className,
    children: content
  });
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityRole: "button",
    onPress: onPress,
    style: ({
      pressed
    }) => [surface, pressed && styles.pressed],
    className,
    children: content
  });
};

/** Outlined card with a low-emphasis border. @example `<OutlinedCard title="Settings" />` */
export const OutlinedCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "outlined"
});
/** Filled card for grouped or selected content. @example `<FilledCard title="Selected" />` */
export const FilledCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "filled"
});
/** Gradient-like dependency-free fallback. @example `<GradientCard title="Featured" />` */
export const GradientCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "gradient"
});
/** Translucent glass-like card. @example `<GlassCard title="Now playing" />` */
export const GlassCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "glass"
});
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16
  },
  header: {
    marginBottom: 12
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14
  },
  content: {},
  pressed: {
    opacity: 0.82
  }
});
//# sourceMappingURL=Card.js.map