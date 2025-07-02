"use strict";

import React from 'react';
import { View, Dimensions } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridLayout = ({
  children,
  columns = 2,
  spacing = 8,
  aspectRatio,
  style
}) => {
  const {
    width
  } = Dimensions.get('window');
  const itemWidth = (width - spacing * (columns + 1)) / columns;
  const renderChildren = () => {
    const childrenArray = React.Children.toArray(children);
    const rows = [];
    for (let i = 0; i < childrenArray.length; i += columns) {
      const row = childrenArray.slice(i, i + columns);
      rows.push(/*#__PURE__*/_jsx(View, {
        style: {
          flexDirection: 'row',
          marginBottom: spacing
        },
        children: row.map((child, index) => /*#__PURE__*/_jsx(View, {
          style: {
            width: itemWidth,
            marginRight: index < columns - 1 ? spacing : 0,
            aspectRatio: aspectRatio
          },
          children: child
        }, index))
      }, i));
    }
    return rows;
  };
  return /*#__PURE__*/_jsx(View, {
    style: [{
      padding: spacing
    }, style],
    children: renderChildren()
  });
};
//# sourceMappingURL=GridLayout.js.map