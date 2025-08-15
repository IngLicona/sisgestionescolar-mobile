import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Card from '../components/Card';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

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

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'presente': return Colors.presente;
      case 'ausente': return Colors.ausente;
      case 'tarde': return Colors.tarde;
      case 'justificado': return Colors.justificado;
      default: return Colors.muted;
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'presente': return 'checkmark-circle';
      case 'ausente': return 'close-circle';
      case 'tarde': return 'time';
      case 'justificado': return 'document-text';
      default: return 'help-circle';
    }
  };

  if (loading) return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.loadingText}>Cargando asistencias...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Asistencias</Text>
        <Text style={styles.subtitle}>Historial de asistencia a clases</Text>
      </View>
      
      <FlatList
        data={asistencias}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.asistenciaCard}>
            <View style={styles.asistenciaHeader}>
              <View style={styles.materiaContainer}>
                <Ionicons name="book-outline" size={20} color={Colors.primary} />
                <Text style={styles.materia}>{item.materia}</Text>
              </View>
              <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(item.estado) + '20' }]}>
                <Ionicons 
                  name={getEstadoIcon(item.estado)} 
                  size={16} 
                  color={getEstadoColor(item.estado)} 
                />
                <Text style={[styles.estadoText, { color: getEstadoColor(item.estado) }]}>
                  {item.estado?.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View style={styles.asistenciaDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color={Colors.muted} />
                <Text style={styles.detailText}>{item.fecha_formateada}</Text>
              </View>
              
              {item.docente && (
                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color={Colors.muted} />
                  <Text style={styles.detailText}>Profesor: {item.docente}</Text>
                </View>
              )}
              
              {item.observaciones && (
                <View style={styles.detailRow}>
                  <Ionicons name="chatbubble-outline" size={16} color={Colors.muted} />
                  <Text style={styles.detailText}>{item.observaciones}</Text>
                </View>
              )}
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color={Colors.muted} />
            <Text style={styles.emptyTitle}>Sin registros</Text>
            <Text style={styles.emptyText}>No hay asistencias registradas aún</Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: FontSizes.medium,
    color: Colors.muted,
  },
  header: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSizes.title,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: Colors.muted,
    marginTop: Spacing.xs,
  },
  listContainer: {
    padding: Spacing.lg,
  },
  asistenciaCard: {
    marginBottom: Spacing.md,
  },
  asistenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  materiaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.md,
  },
  materia: {
    fontSize: FontSizes.large,
    fontWeight: '600',
    color: Colors.dark,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  estadoText: {
    fontSize: FontSizes.small,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  asistenciaDetails: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: FontSizes.medium,
    color: Colors.dark,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: FontSizes.xlarge,
    fontWeight: 'bold',
    color: Colors.muted,
    marginTop: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSizes.medium,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
