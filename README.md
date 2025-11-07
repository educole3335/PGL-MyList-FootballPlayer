# Mercado de Jugadores de Fútbol

Esta aplicación es un gestor de mercado de jugadores de fútbol desarrollada con React Native y Expo. Permite a los usuarios:

- Ver una lista de jugadores con sus detalles (nombre, posición, equipo, premios, precio)
- Marcar/desmarcar jugadores para realizar acciones sobre ellos
- Ver totales (número de jugadores, seleccionados, valor total)
- Añadir nuevos jugadores mediante un formulario modal
- Editar jugadores existentes
- Eliminar jugadores individualmente o todos a la vez
## Documentación

- [Diseño de la Interfaz](./docs/design.md)
- [Diseño de PlayerItem](./docs/PlayerItem.md)
- [Diseño de AddEditModal](./docs/AddEditModal.md)
- [Diseño de App](./docs/App.md)
- [Explicacion de la implementacion](./docs/implementation.md)
## Estructura del Proyecto

```
PGL-MyList-FootPlayer/
├── App.tsx           # Componente principal
├── src/
│   └── types.ts     # Definiciones de tipos
├── components/
│   ├── PlayerItem.tsx    # Tarjeta de jugador
│   └── AddEditModal.tsx  # Modal para añadir/editar
└── docs/            # Documentación
```
![alt text](image.png)