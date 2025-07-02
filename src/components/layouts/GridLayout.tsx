import React from 'react';
import { View, Dimensions } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
  spacing?: number;
  aspectRatio?: number;
  style?: StyleProp<ViewStyle>;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 2,
  spacing = 8,
  aspectRatio,
  style,
}) => {
  const { width } = Dimensions.get('window');
  const itemWidth = (width - (spacing * (columns + 1))) / columns;

  const renderChildren = () => {
    const childrenArray = React.Children.toArray(children);
    const rows = [];
    
    for (let i = 0; i < childrenArray.length; i += columns) {
      const row = childrenArray.slice(i, i + columns);
      rows.push(
        <View
          key={i}
          style={{
            flexDirection: 'row',
            marginBottom: spacing,
          }}
        >
          {row.map((child, index) => (
            <View
              key={index}
              style={{
                width: itemWidth,
                marginRight: index < columns - 1 ? spacing : 0,
                aspectRatio: aspectRatio,
              }}
            >
              {child}
            </View>
          ))}
        </View>
      );
    }
    
    return rows;
  };

  return (
    <View style={[{ padding: spacing }, style]}>
      {renderChildren()}
    </View>
  );
}; 