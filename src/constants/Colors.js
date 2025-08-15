// Colores del tema EduLink - Basado en sistemas educativos modernos
export const Colors = {
  // Colores principales
  primary: '#4A90E2',      // Azul profesional
  secondary: '#7ED321',    // Verde éxito
  accent: '#F5A623',       // Naranja/amarillo para destacar
  
  // Colores de estado
  success: '#28a745',      // Verde éxito
  warning: '#ffc107',      // Amarillo advertencia
  danger: '#dc3545',       // Rojo peligro/error
  info: '#17a2b8',        // Azul información
  
  // Grises y neutros
  dark: '#343a40',         // Texto principal
  light: '#f8f9fa',        // Fondo claro
  muted: '#6c757d',        // Texto secundario
  border: '#dee2e6',       // Bordes
  
  // Blancos y fondos
  white: '#ffffff',
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  
  // Colores específicos para asistencias
  presente: '#28a745',
  ausente: '#dc3545',
  tarde: '#ffc107',
  justificado: '#17a2b8',
  
  // Gradientes
  primaryGradient: ['#4A90E2', '#357ABD'],
  secondaryGradient: ['#7ED321', '#6ABE1A'],
};

// Sombras y elevaciones
export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Espaciados estándar
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tamaños de texto
export const FontSizes = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  title: 24,
  header: 28,
};
