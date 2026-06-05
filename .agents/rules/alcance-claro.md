# Regla: Alcance Claro

**Alcance:** Definición de funciones, variables, clases, módulos, componentes y endpoints.

**Razón:** Definir claramente el alcance (scope) de cada elemento previene efectos secundarios inesperados, facilita el testing y promueve la reutilización.

**Cómo aplicarla en este proyecto:**
- Las funciones deben operar sobre sus argumentos y no modificar variables fuera de su contexto.
- Los endpoints deben limitarse a procesar la petición y delegar la lógica a funciones bien delimitadas.
- Los componentes de frontend deben recibir props y evitar depender de estados globales innecesarios.

**Ejemplo:**
- ✅ Una función que solo modifica datos locales o retorna un nuevo valor sin efectos colaterales.
- ❌ Una función o endpoint que modifica variables globales o estados compartidos sin justificación.
