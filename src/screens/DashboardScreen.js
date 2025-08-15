import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import Card from '../components/Card';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

export default function DashboardScreen({ navigation, route }) {
  const { user, token } = route.params || {};
  
  const menuOptions = [
    {
      title: 'Asistencias',
      subtitle: 'Ver mi historial de asistencias',
      icon: 'calendar-outline',
      color: Colors.info,
      onPress: () => navigation.navigate('Asistencias', { token })
    },
    {
      title: 'Calificaciones',
      subtitle: 'Ver mis notas y evaluaciones',
      icon: 'school-outline',
      color: Colors.success,
      onPress: () => navigation.navigate('Calificaciones', { token })
    },
    {
      title: 'Mi Perfil',
      subtitle: 'Ver información personal',
      icon: 'person-outline',
      color: Colors.primary,
      onPress: () => navigation.navigate('Perfil', { user, token })
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>¡Bienvenido!</Text>
            <Text style={styles.userName}>{user?.name || 'Estudiante'}</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={Colors.white} />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="calendar" size={24} color={Colors.info} />
              <Text style={styles.statNumber}>--</Text>
              <Text style={styles.statLabel}>Asistencias</Text>
            </View>
          </Card>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Ionicons name="trophy" size={24} color={Colors.warning} />
              <Text style={styles.statNumber}>--</Text>
              <Text style={styles.statLabel}>Promedio</Text>
            </View>
          </Card>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          {menuOptions.map((option, index) => (
            <Card key={index} style={styles.menuCard}>
              <View style={styles.menuItem}>
                <View style={[styles.iconContainer, { backgroundColor: option.color + '20' }]}>
                  <Ionicons name={option.icon} size={24} color={option.color} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{option.title}</Text>
                  <Text style={styles.menuSubtitle}>{option.subtitle}</Text>
                </View>
                <Button
                  title="Ver"
                  onPress={option.onPress}
                  variant="outline"
                  size="small"
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Button
            title="Cerrar Sesión"
            onPress={() => navigation.replace('Login')}
            variant="danger"
            size="large"
            icon="log-out-outline"
          />
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: FontSizes.medium,
    color: 'rgba(255,255,255,0.9)',
  },
  userName: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statContent: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.dark,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSizes.small,
    color: Colors.muted,
    marginTop: Spacing.xs,
  },
  menuContainer: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: Spacing.md,
  },
  menuCard: {
    marginBottom: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.large,
    fontWeight: '600',
    color: Colors.dark,
  },
  menuSubtitle: {
    fontSize: FontSizes.small,
    color: Colors.muted,
    marginTop: Spacing.xs,
  },
  logoutContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
});
