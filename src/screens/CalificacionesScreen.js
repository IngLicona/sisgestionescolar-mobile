import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function CalificacionesScreen({ route }) {
  const { token } = route.params;
  const [calificaciones, setCalificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get('http://192.168.1.128:8000/api/alumno/calificaciones', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setCalificaciones(res.data))
      .catch(() => setCalificaciones([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificaciones</Text>
      <FlatList
        data={calificaciones}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Materia: {item.materia}</Text>
            <Text>Calificación: {item.calificacion}</Text>
            <Text>Periodo: {item.periodo}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay calificaciones registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
});
