import { useEffect, useRef, type ReactElement } from 'react';
import { Animated, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import type { SkeletonVariant } from '../UniList';

/** Props for one animated loading placeholder. @example `<Skeleton variant="glass" />` */
export interface SkeletonProps {
  /** Color treatment matching a card style. */
  variant?: SkeletonVariant;
  /** Native style override for one placeholder. */
  style?: StyleProp<ViewStyle>;
  /** NativeWind class forwarded to the animated surface. */
  className?: string;
}

const backgrounds: Record<SkeletonVariant, string> = {
  modern: '#e5e7eb', classic: '#e5e7eb', glass: 'rgba(255,255,255,0.42)', material: '#dfe3e8', minimal: '#f0f0f0', neumorphic: '#e8ecf2',
};

/** Animated, native-driver loading placeholder. @example `<Skeleton variant="material" />` */
export function Skeleton({ variant = 'modern', style, className }: SkeletonProps): ReactElement {
  const opacity = useRef(new Animated.Value(0.45)).current;
  useEffect(() => {
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.45, duration: 700, useNativeDriver: true }),
    ]));
    animation.start();
    return () => animation.stop();
  }, [opacity]);
  return (
    <Animated.View accessibilityLabel="Loading content" style={[styles.card, { backgroundColor: backgrounds[variant], opacity }, style]} {...({ className } as object)}>
      <View style={styles.title} /><View style={styles.line} /><View style={[styles.line, styles.shortLine]} />
    </Animated.View>
  );
}

/** Renders a vertical group of skeleton cards. @example `<SkeletonList count={3} variant="modern" />` */
export function SkeletonList({ count, variant }: { count: number; variant: SkeletonVariant }): ReactElement {
  return <View>{Array.from({ length: Math.max(0, count) }, (_, index) => <Skeleton key={index} variant={variant} />)}</View>;
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, height: 116, marginBottom: 12, padding: 16 },
  title: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 4, height: 16, width: '54%' },
  line: { backgroundColor: 'rgba(255,255,255,0.62)', borderRadius: 4, height: 11, marginTop: 16, width: '90%' },
  shortLine: { marginTop: 9, width: '62%' },
});
