import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';

export type CardType = 'elevated' | 'outlined' | 'filled' | 'gradient' | 'glass';
export type CardStyle = 'modern' | 'classic' | 'minimal' | 'material' | 'neumorphic';

export interface CardProps {
  children: React.ReactNode;
  type?: CardType;
  cardStyle?: CardStyle;
  title?: string;
  subtitle?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  type = 'elevated',
  cardStyle = 'modern',
  title,
  subtitle,
  image,
  onPress,
  style,
  elevation = 5,
  borderRadius = 12,
  backgroundColor,
  borderColor,
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.1,
  shadowRadius = 4,
}) => {
  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius,
      backgroundColor: backgroundColor || getBackgroundColor(),
      borderColor: borderColor || getBorderColor(),
      borderWidth: type === 'outlined' ? 1 : 0,
    };

    // Add shadow for elevated cards
    if (type === 'elevated') {
      baseStyle.shadowColor = shadowColor;
      baseStyle.shadowOffset = shadowOffset;
      baseStyle.shadowOpacity = shadowOpacity;
      baseStyle.shadowRadius = shadowRadius;
      baseStyle.elevation = elevation;
    }

    // Add gradient background for gradient cards
    if (type === 'gradient') {
      // Note: For actual gradient, you'd need react-native-linear-gradient
      baseStyle.backgroundColor = '#007AFF';
    }

    // Add glass effect for glass cards
    if (type === 'glass') {
      baseStyle.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      // Note: backdropFilter is not supported in React Native, using opacity instead
    }

    return baseStyle;
  };

  const getBackgroundColor = (): string => {
    switch (cardStyle) {
      case 'modern':
        return '#FFFFFF';
      case 'classic':
        return '#F8F9FA';
      case 'minimal':
        return '#FFFFFF';
      case 'material':
        return '#FFFFFF';
      case 'neumorphic':
        return '#E0E0E0';
      default:
        return '#FFFFFF';
    }
  };

  const getBorderColor = (): string => {
    switch (cardStyle) {
      case 'modern':
        return '#E1E5E9';
      case 'classic':
        return '#DEE2E6';
      case 'minimal':
        return '#F0F0F0';
      case 'material':
        return '#E0E0E0';
      case 'neumorphic':
        return '#D0D0D0';
      default:
        return '#E1E5E9';
    }
  };

  const getTitleStyle = () => {
    switch (cardStyle) {
      case 'modern':
        return styles.modernTitle;
      case 'classic':
        return styles.classicTitle;
      case 'minimal':
        return styles.minimalTitle;
      case 'material':
        return styles.materialTitle;
      case 'neumorphic':
        return styles.neumorphicTitle;
      default:
        return styles.modernTitle;
    }
  };

  const getSubtitleStyle = () => {
    switch (cardStyle) {
      case 'modern':
        return styles.modernSubtitle;
      case 'classic':
        return styles.classicSubtitle;
      case 'minimal':
        return styles.minimalSubtitle;
      case 'material':
        return styles.materialSubtitle;
      case 'neumorphic':
        return styles.neumorphicSubtitle;
      default:
        return styles.modernSubtitle;
    }
  };

  return (
    <View style={[styles.container, getCardStyles(), style]}>
      {title && <Text style={getTitleStyle()}>{title}</Text>}
      {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
  },
  // Modern Style
  modernTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modernSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  // Classic Style
  classicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  classicSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  // Minimal Style
  minimalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  minimalSubtitle: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  // Material Style
  materialTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#212121',
    marginBottom: 8,
  },
  materialSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
  },
  // Neumorphic Style
  neumorphicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 6,
  },
  neumorphicSubtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    marginBottom: 12,
  },
});

// Pre-built card components for easy import
export const ElevatedCard: React.FC<Omit<CardProps, 'type'>> = (props) => (
  <Card type="elevated" {...props} />
);

export const OutlinedCard: React.FC<Omit<CardProps, 'type'>> = (props) => (
  <Card type="outlined" {...props} />
);

export const FilledCard: React.FC<Omit<CardProps, 'type'>> = (props) => (
  <Card type="filled" {...props} />
);

export const GradientCard: React.FC<Omit<CardProps, 'type'>> = (props) => (
  <Card type="gradient" {...props} />
);

export const GlassCard: React.FC<Omit<CardProps, 'type'>> = (props) => (
  <Card type="glass" {...props} />
); 