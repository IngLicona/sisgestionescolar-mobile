import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Card from '../components/Card';
import { Colors, Spacing, FontSizes } from '../constants/Colors';

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

  const getNotaColor = (nota) => {
    if (nota >= 90) return Colors.success;
    if (nota >= 80) return Colors.info;
    if (nota >= 70) return Colors.warning;
    if (nota >= 60) return Colors.secondary;
    return Colors.danger;
  };

  const getNotaIcon = (nota) => {
    if (nota >= 90) return 'trophy';
    if (nota >= 80) return 'star';
    if (nota >= 70) return 'thumbs-up';
    if (nota >= 60) return 'checkmark-circle';
    return 'close-circle';
  };

  if (loading) return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.loadingText}>Cargando calificaciones...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Calificaciones</Text>
        <Text style={styles.subtitle}>Historial de notas y evaluaciones</Text>
      </View>
      
      <FlatList
        data={calificaciones}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.calificacionCard}>
            <View style={styles.calificacionHeader}>
              <View style={styles.materiaContainer}>
                <Ionicons name="book-outline" size={20} color={Colors.primary} />
                <Text style={styles.materia}>{item.materia}</Text>
              </View>
              <View style={[styles.notaBadge, { backgroundColor: getNotaColor(item.nota) + '20' }]}>
                <Ionicons 
                  name={getNotaIcon(item.nota)} 
                  size={16} 
                  color={getNotaColor(item.nota)} 
                />
                <Text style={[styles.notaText, { color: getNotaColor(item.nota) }]}>
                  {item.nota}
                </Text>
              </View>
            </View>
            
            <View style={styles.literalContainer}>
              <Text style={[styles.literal, { color: getNotaColor(item.nota) }]}>
                {item.calificacion_literal}
              </Text>
            </View>
            
            <View style={styles.calificacionDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="school-outline" size={16} color={Colors.muted} />
                <Text style={styles.detailText}>{item.tipo}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={16} color={Colors.muted} />
                <Text style={styles.detailText}>{item.periodo}</Text>
              </View>
              
              {item.docente && (
                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color={Colors.muted} />
                  <Text style={styles.detailText}>Profesor: {item.docente}</Text>
                </View>
              )}
              
              {item.descripcion && (
                <View style={styles.detailRow}>
                  <Ionicons name="document-text-outline" size={16} color={Colors.muted} />
                  <Text style={styles.detailText}>{item.descripcion}</Text>
                </View>
              )}
              
              {item.fecha && (
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color={Colors.muted} />
                  <Text style={styles.detailText}>{item.fecha}</Text>
                </View>
              )}
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={60} color={Colors.muted} />
            <Text style={styles.emptyTitle}>Sin calificaciones</Text>
            <Text style={styles.emptyText}>No hay calificaciones registradas aún</Text>
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
  calificacionCard: {
    marginBottom: Spacing.md,
  },
  calificacionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
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
  notaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
    minWidth: 60,
    justifyContent: 'center',
  },
  notaText: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    marginLeft: Spacing.xs,
  },
  literalContainer: {
    marginBottom: Spacing.md,
    paddingLeft: Spacing.lg,
  },
  literal: {
    fontSize: FontSizes.medium,
    fontWeight: '600',
  },
  calificacionDetails: {
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
