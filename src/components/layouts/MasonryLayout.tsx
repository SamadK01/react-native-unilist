import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface MasonryLayoutProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columns = 2,
  spacing = 8,
  style,
}) => {
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [columnChildren, setColumnChildren] = useState<React.ReactNode[][]>([]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const newColumnChildren: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Distribute children across columns
    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      newColumnChildren[columnIndex].push(child);
    });
    
    setColumnChildren(newColumnChildren);
  }, [children, columns]);

  const renderColumn = (columnIndex: number) => {
    return (
      <View
        key={columnIndex}
        style={{
          flex: 1,
          marginHorizontal: spacing / 2,
        }}
      >
        {columnChildren[columnIndex] && columnChildren[columnIndex].map((child, childIndex) => (
          <View
            key={childIndex}
            style={{
              marginBottom: spacing,
            }}
          >
            {child}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[{ flexDirection: 'row', padding: spacing }, style]}>
      {Array.from({ length: columns }, (_, index) => renderColumn(index))}
    </View>
  );
}; 