# App (Pantalla principal)

Archivo: `App.tsx`

Descripción

Componente raíz que contiene la lista de jugadores, contador de totales, acciones globales (Añadir, Borrar todo) y el `AddEditModal` para crear/editar jugadores.

Estados principales

- `players: Player[]` — Lista de jugadores mostrados en la app.
- `modalVisible: boolean` — Controla visibilidad del modal de añadir/editar.
- `editing: Player | null` — Jugador que se está editando.

Funciones clave

- `openAdd()` — Abre el modal en modo creación (limpia `editing`).
- `openEdit(p: Player)` — Abre el modal con `initialValue` para editar.
- `handleSave(data)` — Guarda (crea o edita) un jugador. Si `data.id` existe actualiza, si no crea con `generateUUID()`.
- `handleDelete(id)` — Elimina un jugador (con confirmación `Alert`).
- `handleToggle(id)` — Marca/desmarca un jugador.
- `handleDeleteAll()` — Borra toda la lista (confirmación `Alert`).

Inicialización

- La app incluye `DEFAULT_PLAYERS` con cuatro jugadores de ejemplo para desarrollo/demo. Puedes cambiar o eliminar estos seeds en `App.tsx`.

Integración con el modal

- `AddEditModal` recibe `onSave={handleSave}` y `initialValue={editing}` para reutilizar la misma UI en crear/editar.

Persistencia (sugerencia)

- Actualmente la lista reside solo en memoria. Para persistir entre sesiones, usa `AsyncStorage` o `expo-secure-store`:
  - Al iniciar la app, leer `players` desde storage y si está vacío usar `DEFAULT_PLAYERS`.
  - Al guardar/borrar actualizar el storage.

Ejemplo de render

- Muestra un header con el título "Mercado", una tarjeta de totales y la lista de jugadores (`FlatList`).
- Si `players.length === 0` se muestra un estado vacío con indicación para añadir jugadores.


Notas finales

- Los UUIDs se generan con `src/utils/uuid.ts` (implementación compatible con React Native) para evitar errores relacionados con `crypto.getRandomValues()`.
- Si más adelante se instala `@types/uuid`, se puede migrar a la librería oficial `uuid` con la importación `v4`.
