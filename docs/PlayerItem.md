# PlayerItem

Archivo: `components/PlayerItem.tsx`

Descripción

Componente que representa una tarjeta de jugador en la lista principal. Muestra avatar/abreviatura de posición, nombre, equipo, premios, precio y acciones (Editar/Borrar). También incluye un control para marcar/desmarcar el jugador.

Props

- `player: Player` — Datos del jugador (ver `src/types.ts`).
- `categories: Category[]` — Lista de categorías para resolver icono/color/posición.
- `onToggle: () => void` — Callback para alternar la marca (checked).
- `onEdit: () => void` — Callback para iniciar edición del jugador.
- `onDelete: () => void` — Callback para borrar el jugador.

Comportamiento

- Busca la `category` por `player.category` para mostrar el icono y color.
- `player.position` se muestra dentro del avatar como abreviatura.
- `onToggle` cambia el estado marcado en el padre (no se almacena localmente).
- Los botones `Editar` y `Borrar` llaman a los callbacks proporcionados.

Estilos

- Tarjeta: fondo en verde principal (`#4caf50`) con bordes redondeados.
- Avatar: círculo con fondo verde muy claro (`#e8f5e9`) y borde del color de la categoría.
- Texto principal: blanco para el nombre, tonos verdes para detalles.
- Botones: botón de acción claro para `Editar`, botón `Borrar` en azul (`#2196f3`).

Ejemplo de uso

```tsx
<PlayerItem
  player={player}
  categories={CATEGORIES}
  onToggle={() => handleToggle(player.id)}
  onEdit={() => openEdit(player)}
  onDelete={() => handleDelete(player.id)}
/>
```

Casos de borde

- `category` no encontrada: el componente usa valores por defecto (`''` para icono y `#ccc` para color del borde).
- `player.awards` vacío: se muestra `-`.

Sugerencias

- Añadir `TouchableOpacity` con ripple/feedback táctil en Android.
- Agregar soporte para avatar con imagen (prop nueva `avatarUrl`).
- Separar `Avatar` en un componente pequeño para reutilizar.
