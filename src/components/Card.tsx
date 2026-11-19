import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

/** Built-in card surface variants. */
export type CardType = 'elevated' | 'outlined' | 'filled' | 'gradient' | 'glass';
/** Built-in card shape and shadow treatments. */
export type CardStyle = 'modern' | 'classic' | 'minimal' | 'material' | 'neumorphic';

/**
 * Shared props for every card component.
 *
 * @example
 * ```tsx
 * <OutlinedCard title="Invoice" subtitle="Paid" onPress={openInvoice} />
 * ```
 */
export interface CardProps {
  /** Surface variant. Wrapper components set this automatically. */
  type?: CardType;
  /** Shape/shadow recipe layered over the surface variant. */
  cardStyle?: CardStyle;
  /** Optional heading rendered above children. */
  title?: string;
  /** Optional secondary text rendered under the title. */
  subtitle?: string;
  /** Application-defined card body. */
  children?: React.ReactNode;
  /** Overrides the surface background color. */
  backgroundColor?: string;
  /** Overrides the surface border color. */
  borderColor?: string;
  /** Overrides the selected style's radius. */
  borderRadius?: number;
  /** Android elevation for elevated cards. */
  elevation?: number;
  /** Native React Native style override. */
  style?: StyleProp<ViewStyle>;
  /** Removes library chrome while retaining semantic card structure. */
  headless?: boolean;
  /** NativeWind class forwarded to the native card surface. */
  className?: string;
  /** Makes the card keyboard- and screen-reader-accessible as a button. */
  onPress?: () => void;
}

const typeStyles: Record<CardType, ViewStyle> = {
  elevated: { elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 8 },
  outlined: { borderColor: '#d1d5db', borderWidth: StyleSheet.hairlineWidth },
  filled: { backgroundColor: '#e8f0fe' },
  // A dependency-free gradient-like fallback. Consumers can use headless + their gradient implementation for a real gradient.
  gradient: { backgroundColor: '#eef2ff', borderColor: '#c7d2fe', borderWidth: 1 },
  glass: { backgroundColor: 'rgba(255,255,255,0.72)', borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 },
};

const styleStyles: Record<CardStyle, ViewStyle> = {
  modern: { borderRadius: 16 }, classic: { borderRadius: 6 }, minimal: { borderRadius: 0, elevation: 0, shadowOpacity: 0 },
  material: { borderRadius: 12, elevation: 3 }, neumorphic: { borderRadius: 18, shadowColor: '#b8bec8', shadowOffset: { width: 6, height: 6 }, shadowOpacity: 0.32, shadowRadius: 10 },
};

/**
 * Raised general-purpose card.
 *
 * @example
 * ```tsx
 * <ElevatedCard title="Summary" cardStyle="material"><Text>42 tasks</Text></ElevatedCard>
 * ```
 */
export const ElevatedCard: React.FC<CardProps> = ({
  children, title, subtitle, style, elevation = 5, borderRadius, backgroundColor, borderColor,
  type = 'elevated', cardStyle = 'modern', headless = false, className, onPress,
}) => {
  const surface = [
    !headless && styles.card,
    !headless && typeStyles[type],
    !headless && styleStyles[cardStyle],
    !headless && { elevation: type === 'elevated' ? elevation : typeStyles[type].elevation, borderRadius },
    { backgroundColor, borderColor }, style,
  ];
  const content = <>
    {(title || subtitle) ? <View style={!headless && styles.header}>{title ? <Text style={!headless && styles.title}>{title}</Text> : null}{subtitle ? <Text style={!headless && styles.subtitle}>{subtitle}</Text> : null}</View> : null}
    {children ? <View style={!headless && styles.content}>{children}</View> : null}
  </>;
  if (!onPress) return <View style={surface} {...({ className } as object)}>{content}</View>;
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [surface, pressed && styles.pressed]} {...({ className } as object)}>{content}</Pressable>;
};

/** Outlined card with a low-emphasis border. @example `<OutlinedCard title="Settings" />` */
export const OutlinedCard: React.FC<CardProps> = props => <ElevatedCard {...props} type="outlined" />;
/** Filled card for grouped or selected content. @example `<FilledCard title="Selected" />` */
export const FilledCard: React.FC<CardProps> = props => <ElevatedCard {...props} type="filled" />;
/** Gradient-like dependency-free fallback. @example `<GradientCard title="Featured" />` */
export const GradientCard: React.FC<CardProps> = props => <ElevatedCard {...props} type="gradient" />;
/** Translucent glass-like card. @example `<GlassCard title="Now playing" />` */
export const GlassCard: React.FC<CardProps> = props => <ElevatedCard {...props} type="glass" />;

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 16 }, header: { marginBottom: 12 },
  title: { color: '#111827', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#6b7280', fontSize: 14 }, content: {}, pressed: { opacity: 0.82 },
});
