import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerfilScreen({ route }) {
  const { user } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Nombre: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      {/* Agrega más campos si es necesario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});
