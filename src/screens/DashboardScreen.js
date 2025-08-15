import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation, route }) {
  const { user, token } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user?.name || 'Alumno'}</Text>
      <Button title="Ver Asistencias" onPress={() => navigation.navigate('Asistencias', { token })} />
      <Button title="Ver Calificaciones" onPress={() => navigation.navigate('Calificaciones', { token })} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil', { user, token })} />
      <Button title="Cerrar sesión" onPress={() => navigation.replace('Login')} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
});
