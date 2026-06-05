# Regla: Razón Clara

**Alcance:** Mensajes de commit, descripciones de PR, comentarios en código y documentación de endpoints.

**Razón:** Explicar el motivo de cada cambio o decisión permite a cualquier miembro del equipo comprender el contexto, facilita la revisión y el mantenimiento, y ayuda a evitar errores por malentendidos.

**Cómo aplicarla en este proyecto:**
- Los mensajes de commit deben indicar el problema que resuelven o la mejora que aportan, no solo describir la acción.
- Las descripciones de PR deben incluir el porqué del cambio, especialmente si afecta endpoints, lógica de negocio o estructura de carpetas.
- Los comentarios en código deben usarse solo cuando la razón no es obvia por el propio código.
- La documentación de endpoints debe justificar parámetros opcionales, paginación, filtros, etc.

**Ejemplo:**
- ✅ "Se agregó paginación al endpoint `/movements` para evitar respuestas demasiado grandes y mejorar la performance."
- ❌ "Agrega paginación."
