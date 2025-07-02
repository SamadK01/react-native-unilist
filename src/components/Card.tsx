import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const getBackgroundColor = (): string => {
  return '#FFFFFF';
};

export const ElevatedCard: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  style,
  elevation = 5,
  borderRadius = 12,
  backgroundColor,
}) => {
  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius,
      backgroundColor: backgroundColor || getBackgroundColor(),
      borderWidth: 0,
    };

    // Add shadow for elevated cards
    if (elevation > 0) {
      baseStyle.shadowColor = '#000';
      baseStyle.shadowOffset = { width: 0, height: 2 };
      baseStyle.shadowOpacity = 0.1;
      baseStyle.shadowRadius = elevation;
      baseStyle.elevation = elevation;
    }

    return baseStyle;
  };

  return (
    <View style={[styles.card, getCardStyles(), style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export const OutlinedCard: React.FC<CardProps> = (props) => (
  <ElevatedCard {...props} type="outlined" />
);

export const FilledCard: React.FC<CardProps> = (props) => (
  <ElevatedCard {...props} type="filled" />
);

export const GradientCard: React.FC<CardProps> = (props) => (
  <ElevatedCard {...props} type="gradient" />
);

export const GlassCard: React.FC<CardProps> = (props) => (
  <ElevatedCard {...props} type="glass" />
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 8,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
}); 