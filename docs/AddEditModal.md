# AddEditModal

Archivo: `components/AddEditModal.tsx`

Descripción

Componente modal reutilizable para añadir o editar jugadores. Muestra un formulario con campos controlados y validación básica. Está diseñado para usarse dentro de `App.tsx` y se comunica con el padre mediante `onSave` y `onClose`.

Props

- `visible: boolean` — Controla la visibilidad del modal.
- `onClose: () => void` — Callback para cerrar el modal sin guardar.
- `onSave: (p: Player | (Omit<Player, "id"> & { id?: string })) => void` — Callback con el payload del jugador a guardar. Cuando `initialValue` existe, incluye `id` para edición.
- `categories: Category[]` — Lista de categorías/posiciones disponible (usa `src/types.ts`).
- `initialValue?: Player` — Valor inicial para editar un jugador.

 Tipos relevantes

- `Player` (ver `src/types.ts`):
  - `id: string`
  - `name: string`
  - `category: string` (id de la categoría)
  - `price: number`
  - `marked: boolean`
  - `position: string` 
  - `team: string`
  - `awards: string`

- `Category` (ver `src/types.ts`):
  - `id: string`
  - `name: string`
  - `icon?: string`
  - `color?: string`
  - `positionAbbr: string`

Comportamiento y validaciones

- Reinicia el formulario cuando `visible` cambia o hay `initialValue`.
- Validaciones:
  - `name` no puede estar vacío.
  - `price` debe ser número >= 0.
  - `team` no puede estar vacío.
  - `category` debe existir en la lista `categories`.
- Cuando el formulario es válido, construye un `payload` con `position` tomado de `selectedCategory.positionAbbr` y llama a `onSave(payload)`.

Estilos recomendados

- Fondo del modal: amarillo claro (`#fff5d6`) para mantener coherencia con el diseño del excalidraw.
- Inputs: fondo verde claro (`#e8f5e9`) con borde `#4caf50`.
- Botones principales: verde `#4caf50` (Guardar), botón secundario: azul `#2196f3` (Cancelar).

Notas de implementación

- Usa `ScrollView` con `contentContainerStyle` para asegurar que el formulario sea accesible en pantallas pequeñas o cuando el teclado esté abierto.
- La propiedad `positionAbbr` de la categoría se usa para guardar `position` en el `Player`.
- El componente delega la persistencia a la clase padre (`App.tsx`). No hace llamadas a almacenamiento por sí mismo.

Ejemplo de uso

```tsx
<AddEditModal
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  onSave={(payload) => handleSave(payload)}
  categories={CATEGORIES}
  initialValue={editingPlayer}
/>
```

Casos de borde

- `categories` vacío: el componente usa `categories[0]?.id ?? ""` como valor por defecto; considera bloquear guardar si no hay categorías.
- `price` con caracteres no numéricos: la validación lo rechazará.
