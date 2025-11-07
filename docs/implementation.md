# Implementación de Tipos y Componentes

## Tipos Definidos

### Player
```typescript
export type Player = {
  id: string;        // Generado con uuid
  name: string;      // Nombre del jugador
  category: string;  // ID de la categoría
  position: string;  // Abreviatura de posición (DEL, MC, DEF, P)
  price: number;     // Precio del jugador
  marked: boolean;   // Si está seleccionado
  team: string;      // Equipo actual
  awards: string;    // Premios/logros
};
```

### Category
```typescript
export type Category = {
  id: string;        // Identificador único
  name: string;      // Nombre completo
  icon: string;      // Emoji o imagen
  color: string;     // Color hexadecimal
  positionAbbr: string; // Abreviatura para el círculo
};
```

## Componentes Principales

### PlayerItem
- Renderiza una tarjeta de jugador individual
- Maneja la selección mediante checkbox
- Muestra avatar con posición
- Implementa acciones de editar/borrar

### AddEditModal
- Formulario modal para añadir/editar jugadores
- Validación de campos
- Selección de categoría
- Autocompletado de posición según categoría

### App (Componente Principal)
- Estado global de jugadores
- Lógica de añadir/editar/borrar
- Cálculo de totales
- Gestión de modales

## Uso de uuid

La librería uuid se utiliza para generar IDs únicos vrd que si chulo?:
```typescript
import { v4 as uuidv4 } from 'uuid';

// Al crear nuevo jugador
const newPlayer: Player = {
  id: uuidv4(),
  // ... resto de datos
};
```