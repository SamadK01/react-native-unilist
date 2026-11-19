import React from 'react';
import { View, Dimensions } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

/** Props for {@link GridLayout}. @example `<GridLayout columns={2} spacing={12}>{cards}</GridLayout>` */
export interface GridLayoutProps {
  /** Cells to place into grid rows. */
  children: React.ReactNode;
  /** Number of cells per row; use a positive integer. */
  columns?: number;
  /** Gap and outer padding in points. */
  spacing?: number;
  /** Optional width-to-height ratio applied to every cell. */
  aspectRatio?: number;
  /** Native style applied to the grid container. */
  style?: StyleProp<ViewStyle>;
}

/** Simple responsive grid layout for a small static group of children. @example `<GridLayout columns={3}>{tiles}</GridLayout>` */
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
