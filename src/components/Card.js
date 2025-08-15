import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Shadows, Spacing } from '../constants/Colors';

export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
});
