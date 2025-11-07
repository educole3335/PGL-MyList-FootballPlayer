# Diseño de la Interfaz

## Mockups realizados en Excalidraw

Se diseñaron tres pantallas principales:

1. **Pantalla Principal (Lista de Jugadores)**
   - Encabezado "Mercado"
   - Contadores:
     - Total de jugadores
     - Jugadores seleccionados
     - Valor total de seleccionados
   - Lista de jugadores
   - Botones de acción (Añadir, Borrar todo)

2. **Modal Añadir Jugador**
   - Formulario con campos:
     - Nombre del jugador
     - Precio
     - Posición
     - Equipo
     - Premios
   - Botones Guardar/Cancelar

3. **Modal Editar Jugador**
   - Similar al modal de añadir
   - Pre-rellena los campos con datos existentes

## Elementos de diseño

### Colores
- Verde principal: #1fa07a (tarjetas de jugador)
- Amarillo claro: #e8f5e9 (fondos)
- Blanco: #ffffff (textos y elementos)
- Gris: #666666 (textos secundarios)
- Rojo: #ff6b6b (botón borrar)

### Tarjeta de Jugador
- Avatar circular con posición
- Nombre y categoría
- Equipo y premios con iconos
- Checkbox de selección
- Precio en esquina inferior
- Botones de editar/borrar

### Categorías y Posiciones
- Delantero (DEL): ⚽️
- Medio Campo (MC): 🎯
- Defensa (DEF): 🛡️
- Portero (P): 🧤

### Estados
- Normal: Tarjeta verde
- Seleccionado: Borde resaltado
- Lista vacía: Mensaje informativo
- Botón borrar todo: Deshabilitado si no hay elementos