import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

/** Props for {@link CarouselLayout}. @example `<CarouselLayout autoplay showDots>{slides}</CarouselLayout>` */
export interface CarouselLayoutProps {
  /** Slide elements. */
  children: React.ReactNode;
  /** Advances the active slide indicator at the configured interval. */
  autoplay?: boolean;
  /** Autoplay delay in milliseconds. */
  interval?: number;
  /** Renders slide position dots below the carousel. */
  showDots?: boolean;
  /** Inactive dot color. */
  dotColor?: string;
  /** Active dot color. */
  activeDotColor?: string;
  /** Fixed slide width in points. */
  itemWidth?: number;
  /** Gap after each slide in points. */
  spacing?: number;
  /** Native style applied to the carousel container. */
  style?: any;
}

/** Horizontal paged carousel. @example `<CarouselLayout itemWidth={280}>{banners}</CarouselLayout>` */
export const CarouselLayout: React.FC<CarouselLayoutProps> = ({
  children,
  autoplay = false,
  interval = 3000,
  showDots = false,
  dotColor = '#CCCCCC',
  activeDotColor = '#007AFF',
  itemWidth = 300,
  spacing = 16,
  style,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (autoplay && childrenArray.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, interval, childrenArray.length]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (itemWidth + spacing));
    setCurrentIndex(index);
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {childrenArray.map((child, index) => (
          <View
            key={index}
            style={[
              styles.item,
              { width: itemWidth, marginRight: spacing }
            ]}
          >
            {child}
          </View>
        ))}
      </ScrollView>

      {showDots && childrenArray.length > 1 && (
        <View style={styles.dotsContainer}>
          {childrenArray.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? activeDotColor : dotColor,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
