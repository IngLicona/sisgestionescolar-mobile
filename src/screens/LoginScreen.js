import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Button from '../components/Button';
import Card from '../components/Card';
import { Colors, Spacing, FontSizes, Shadows } from '../constants/Colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Usa el endpoint correcto para alumnos
      const response = await axios.post('http://192.168.1.128:8000/api/alumno/login', {
        email,
        password,
      });

      // Si llega aquí, el backend ya validó que es alumno
      navigation.replace('Dashboard', { user: response.data.user, token: response.data.token });

    } catch (error) {
      console.log('Error completo:', error.response?.data); // Para debug
      Alert.alert('Error', 'Credenciales inválidas o no eres alumno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={Colors.primaryGradient}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="school" size={60} color={Colors.white} />
            </View>
            <Text style={styles.title}>EduLink Estudiantes</Text>
            <Text style={styles.subtitle}>Accede a tu información académica</Text>
          </View>

          {/* Form Card */}
          <Card style={styles.formCard}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color={Colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Correo institucional"
                  placeholderTextColor={Colors.muted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color={Colors.muted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor={Colors.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="password"
                />
              </View>
            </View>

            <Button 
              title={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              onPress={handleLogin}
              disabled={loading}
              variant="primary"
              size="large"
              icon="log-in"
              style={styles.loginButton}
            />
          </Card>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Problemas para acceder?{'\n'}
              Contacta a tu administrador
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.header,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.medium,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  formCard: {
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.medium,
    color: Colors.dark,
  },
  loginButton: {
    marginTop: Spacing.md,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSizes.small,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
});