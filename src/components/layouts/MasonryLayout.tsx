import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

/** Props for {@link MasonryLayout}. @example `<MasonryLayout columns={2}>{cards}</MasonryLayout>` */
export interface MasonryLayoutProps {
  /** Card elements assigned across columns. */
  children: React.ReactNode;
  /** Number of visual columns. */
  columns?: number;
  /** Horizontal and vertical cell gap in points. */
  spacing?: number;
  /** Native style applied to the masonry container. */
  style?: any;
}

/** Round-robin multi-column layout for static child collections. @example `<MasonryLayout>{items}</MasonryLayout>` */
export const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columns = 2,
  spacing = 8,
  style,
}) => {
  const [columnChildren, setColumnChildren] = useState<React.ReactNode[][]>([]);

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const newColumnChildren: React.ReactNode[][] = Array.from(
      { length: columns },
      () => []
    );

    childrenArray.forEach((child, index) => {
      const columnIndex = index % columns;
      if (newColumnChildren[columnIndex]) {
        newColumnChildren[columnIndex].push(child);
      }
    });

    setColumnChildren(newColumnChildren);
  }, [children, columns]);

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {columnChildren.map((column, columnIndex) => (
        <View
          key={columnIndex}
          style={{
            flex: 1,
            marginRight: columnIndex < columns - 1 ? spacing / 2 : 0,
            marginLeft: columnIndex > 0 ? spacing / 2 : 0,
          }}
        >
          {column.map((child, childIndex) => (
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
      ))}
    </View>
  );
};
