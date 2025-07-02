"use strict";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getBackgroundColor = () => {
  return '#FFFFFF';
};
export const ElevatedCard = ({
  children,
  title,
  subtitle,
  style,
  elevation = 5,
  borderRadius = 12,
  backgroundColor
}) => {
  const getCardStyles = () => {
    const baseStyle = {
      borderRadius,
      backgroundColor: backgroundColor || getBackgroundColor(),
      borderWidth: 0
    };

    // Add shadow for elevated cards
    if (elevation > 0) {
      baseStyle.shadowColor = '#000';
      baseStyle.shadowOffset = {
        width: 0,
        height: 2
      };
      baseStyle.shadowOpacity = 0.1;
      baseStyle.shadowRadius = elevation;
      baseStyle.elevation = elevation;
    }
    return baseStyle;
  };
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.card, getCardStyles(), style],
    children: [(title || subtitle) && /*#__PURE__*/_jsxs(View, {
      style: styles.header,
      children: [title && /*#__PURE__*/_jsx(Text, {
        style: styles.title,
        children: title
      }), subtitle && /*#__PURE__*/_jsx(Text, {
        style: styles.subtitle,
        children: subtitle
      })]
    }), children && /*#__PURE__*/_jsx(View, {
      style: styles.content,
      children: children
    })]
  });
};
export const OutlinedCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "outlined"
});
export const FilledCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "filled"
});
export const GradientCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "gradient"
});
export const GlassCard = props => /*#__PURE__*/_jsx(ElevatedCard, {
  ...props,
  type: "glass"
});
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 8
  },
  header: {
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#666'
  },
  content: {
    flex: 1
  }
});
//# sourceMappingURL=Card.js.map