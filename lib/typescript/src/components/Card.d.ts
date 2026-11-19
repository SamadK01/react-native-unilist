import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
/**
 * Raised general-purpose card.
 *
 * @example
 * ```tsx
 * <ElevatedCard title="Summary" cardStyle="material"><Text>42 tasks</Text></ElevatedCard>
 * ```
 */
export declare const ElevatedCard: React.FC<CardProps>;
/** Outlined card with a low-emphasis border. @example `<OutlinedCard title="Settings" />` */
export declare const OutlinedCard: React.FC<CardProps>;
/** Filled card for grouped or selected content. @example `<FilledCard title="Selected" />` */
export declare const FilledCard: React.FC<CardProps>;
/** Gradient-like dependency-free fallback. @example `<GradientCard title="Featured" />` */
export declare const GradientCard: React.FC<CardProps>;
/** Translucent glass-like card. @example `<GlassCard title="Now playing" />` */
export declare const GlassCard: React.FC<CardProps>;
//# sourceMappingURL=Card.d.ts.map