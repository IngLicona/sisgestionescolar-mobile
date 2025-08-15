import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, Shadows } from '../constants/Colors';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  icon,
  disabled = false,
  style 
}) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.button, styles.secondaryButton, styles[size], disabled && styles.disabled];
      case 'outline':
        return [styles.button, styles.outlineButton, styles[size], disabled && styles.disabled];
      case 'danger':
        return [styles.button, styles.dangerButton, styles[size], disabled && styles.disabled];
      default:
        return [styles.button, styles.primaryButton, styles[size], disabled && styles.disabled];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return [styles.buttonText, styles.outlineText, styles[`${size}Text`]];
      default:
        return [styles.buttonText, styles.primaryText, styles[`${size}Text`]];
    }
  };

  return (
    <TouchableOpacity 
      style={[...getButtonStyle(), style]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={size === 'large' ? 20 : 16} 
          color={variant === 'outline' ? Colors.primary : Colors.white} 
          style={styles.icon}
        />
      )}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    ...Shadows.small,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  dangerButton: {
    backgroundColor: Colors.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  // Tamaños
  small: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  // Textos
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: FontSizes.small,
  },
  mediumText: {
    fontSize: FontSizes.medium,
  },
  largeText: {
    fontSize: FontSizes.large,
  },
  icon: {
    marginRight: Spacing.sm,
  },
});
