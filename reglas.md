# reglas.md

## Reglas propuestas para el proyecto

### Arquitectura
- No utilizar datos mockeados en endpoints productivos. Los datos simulados solo deben usarse en entornos de desarrollo o pruebas.
  - **Ejemplo:**
    - ✅ Usar datos reales en producción.
    - ❌ `generate_mock_movements(seed=42)` en endpoints productivos.
- Mantener la separación de responsabilidades: rutas, lógica de negocio y modelos deben estar en archivos/módulos independientes.
  - **Ejemplo:**
    - ✅ `routes.py`, `models.py`, `services.py` separados.
- Implementar autenticación y autorización en todos los endpoints sensibles del backend.
  - **Ejemplo:**
    - ✅ Uso de JWT, OAuth2 o API Keys en endpoints protegidos.

### Seguridad
- Configurar CORS para permitir únicamente orígenes confiables en producción.
  - **Ejemplo:**
    - ✅ `allow_origins=["https://midominio.com"]` en producción.
    - ❌ `allow_origins=["*"]` en producción.
- No exponer información sensible (claves, tokens, datos de usuarios) en logs, respuestas o variables públicas.
- Validar y sanitizar todos los datos recibidos desde el frontend antes de procesarlos.

### Naming (Nomenclatura)
- Usar nombres descriptivos y consistentes para variables, funciones, componentes y modelos.
  - **Ejemplo:**
    - ✅ `totalIncome`, `FinancialMovement`, `get_metrics_summary`
    - ❌ `data1`, `temp`, `foo`

### Testing
- Mantener y actualizar pruebas automatizadas para toda la lógica crítica del backend y frontend.
- Cubrir casos de error y validaciones en los tests.
  - **Ejemplo:**
    - ✅ Pruebas para respuestas exitosas y para errores (inputs inválidos, excepciones, etc.)

### DX (Developer Experience)
- Usar tipado estricto en todo el código (TypeScript en frontend, Pydantic en backend).
- Proveer mensajes de error claros y útiles tanto para usuarios como para desarrolladores.
- Documentar funciones, componentes y endpoints con comentarios o docstrings.
  - **Ejemplo:**
    - ✅ `/** Calcula los KPIs principales */` en funciones de frontend.
    - ✅ `"""Devuelve el resumen de métricas agrupado por mes"""` en backend.

### Manejo de errores
- Implementar manejo centralizado de errores en el backend (middleware o decoradores).
- Evitar que errores no controlados lleguen al usuario final.
  - **Ejemplo:**
    - ✅ Middleware de FastAPI para capturar y formatear errores.

### Documentación
- Mantener actualizados los archivos README y context.md con instrucciones claras de uso, despliegue y contribución.
- Documentar reglas y convenciones en un archivo practicas.md o similar.
