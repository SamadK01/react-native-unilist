import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

export interface CarouselLayoutProps {
  children: React.ReactNode;
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  dotColor?: string;
  activeDotColor?: string;
  style?: StyleProp<ViewStyle>;
  itemWidth?: number;
  spacing?: number;
}

export const CarouselLayout: React.FC<CarouselLayoutProps> = ({
  children,
  autoplay = false,
  interval = 3000,
  showDots = true,
  dotColor = '#CCCCCC',
  activeDotColor = '#007AFF',
  style,
  itemWidth,
  spacing = 16,
}) => {
  const { width } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const actualItemWidth = itemWidth || width * 0.8;

  useEffect(() => {
    if (autoplay && childrenArray.length > 1) {
      const timer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % childrenArray.length;
        scrollToIndex(nextIndex);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [currentIndex, autoplay, interval, childrenArray.length]);

  const scrollToIndex = (index: number) => {
    const x = index * (actualItemWidth + spacing);
    scrollViewRef.current?.scrollTo({ x, animated: true });
    setCurrentIndex(index);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (actualItemWidth + spacing));
    setCurrentIndex(index);
  };

  const renderDots = () => {
    if (!showDots) return null;

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
        {childrenArray.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? activeDotColor : dotColor,
              marginHorizontal: 4,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={style}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={actualItemWidth + spacing}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: spacing / 2,
        }}
      >
        {childrenArray.map((child, index) => (
          <View
            key={index}
            style={{
              width: actualItemWidth,
              marginHorizontal: spacing / 2,
            }}
          >
            {child}
          </View>
        ))}
      </ScrollView>
      {renderDots()}
    </View>
  );
}; 