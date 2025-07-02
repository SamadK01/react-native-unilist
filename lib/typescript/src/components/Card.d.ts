import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export type CardType = 'elevated' | 'outlined' | 'filled' | 'gradient' | 'glass';
export type CardStyle = 'modern' | 'classic' | 'minimal' | 'material' | 'neumorphic';
export interface CardProps {
    type?: CardType;
    cardStyle?: CardStyle;
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    backgroundColor?: string;
    borderRadius?: number;
    elevation?: number;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}
export declare const ElevatedCard: React.FC<CardProps>;
export declare const OutlinedCard: React.FC<CardProps>;
export declare const FilledCard: React.FC<CardProps>;
export declare const GradientCard: React.FC<CardProps>;
export declare const GlassCard: React.FC<CardProps>;
//# sourceMappingURL=Card.d.ts.map