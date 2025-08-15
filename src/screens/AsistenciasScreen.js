import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function AsistenciasScreen({ route }) {
  const { token } = route.params;
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get('http://192.168.1.128:8000/api/alumno/asistencias', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setAsistencias(res.data))
      .catch(() => setAsistencias([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencias</Text>
      <FlatList
        data={asistencias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Materia: {item.materia}</Text>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Estado: {item.estado}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay asistencias registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
});
