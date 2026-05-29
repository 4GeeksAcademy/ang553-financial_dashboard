# practicas.md

## Buenas prácticas

### Arquitectura
- Separación clara de responsabilidades entre backend (rutas, lógica, modelos) y frontend (componentes, utilidades, lógica).
- Uso de funciones puras y reutilizables en el frontend para el cálculo de KPIs y datos mensuales.

### Naming (Nomenclatura)
- Uso consistente y descriptivo de nombres para modelos, funciones y variables en ambos lados.

### Testing
- Existencia de pruebas automatizadas en el backend (carpeta tests/ y uso de pytest).

### DX (Developer Experience)
- Tipado estricto con Pydantic (backend) y TypeScript (frontend), facilitando el desarrollo y reduciendo errores.
- Manejo de errores en el frontend con mensajes claros para el usuario.

---

## Malas prácticas o riesgos

### Arquitectura
- Uso de datos mockeados en endpoints productivos del backend, lo que impide conectar con datos reales.
- Falta de autenticación/autorización en la API.

### Seguridad
- CORS abierto a todos los orígenes (`allow_origins=["*"]`), lo que expone la API a riesgos innecesarios.

### DX (Developer Experience)
- Variables de entorno con valores por defecto inseguros o poco claros en el frontend, lo que puede causar errores silenciosos.

### Manejo de errores
- Falta de manejo de excepciones en los endpoints del backend, lo que puede provocar caídas ante errores inesperados.

### Documentación
- No se detectaron comentarios o docstrings explicativos en el backend ni en el frontend, lo que puede dificultar la comprensión para nuevos desarrolladores.
