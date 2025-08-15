import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

export default function PerfilScreen({ route }) {
  const { user } = route.params;
  
  const profileData = [
    {
      icon: 'person-outline',
      label: 'Nombre completo',
      value: user?.name || 'No disponible'
    },
    {
      icon: 'mail-outline',
      label: 'Correo electrónico',
      value: user?.email || 'No disponible'
    },
    {
      icon: 'school-outline',
      label: 'Tipo de cuenta',
      value: 'Estudiante'
    },
    {
      icon: 'calendar-outline',
      label: 'Fecha de registro',
      value: user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'No disponible'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color={Colors.white} />
          </View>
          <Text style={styles.userName}>{user?.name || 'Estudiante'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Email no disponible'}</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          {profileData.map((item, index) => (
            <Card key={index} style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            </Card>
          ))}

          {/* Status Card */}
          <Card style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator} />
              <View>
                <Text style={styles.statusTitle}>Estado de la cuenta</Text>
                <Text style={styles.statusValue}>Activa</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  userName: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: FontSizes.medium,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSizes.small,
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    fontSize: FontSizes.medium,
    fontWeight: '500',
    color: Colors.dark,
  },
  statusCard: {
    backgroundColor: Colors.success + '10',
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
    marginTop: Spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    marginRight: Spacing.md,
  },
  statusTitle: {
    fontSize: FontSizes.medium,
    color: Colors.dark,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: FontSizes.small,
    color: Colors.success,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
});
