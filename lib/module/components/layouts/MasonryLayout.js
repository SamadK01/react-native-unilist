"use strict";

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
export const MasonryLayout = ({
  children,
  columns = 2,
  spacing = 8,
  style
}) => {
  const [columnChildren, setColumnChildren] = useState([]);
  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const newColumnChildren = Array.from({
      length: columns
    }, () => []);
    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      if (newColumnChildren[columnIndex]) {
        newColumnChildren[columnIndex].push(child);
      }
    });
    setColumnChildren(newColumnChildren);
  }, [children, columns]);
  return /*#__PURE__*/_jsx(View, {
    style: [{
      flexDirection: 'row'
    }, style],
    children: columnChildren.map((column, columnIndex) => /*#__PURE__*/_jsx(View, {
      style: {
        flex: 1,
        marginRight: columnIndex < columns - 1 ? spacing / 2 : 0,
        marginLeft: columnIndex > 0 ? spacing / 2 : 0
      },
      children: column.map((child, childIndex) => /*#__PURE__*/_jsx(View, {
        style: {
          marginBottom: spacing
        },
        children: child
      }, childIndex))
    }, columnIndex))
  });
};
//# sourceMappingURL=MasonryLayout.js.map