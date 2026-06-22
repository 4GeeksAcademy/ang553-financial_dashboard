# Contrato de datos frontend

## Funcionalidad 1 — Filtro de rango de fechas en dashboard principal

### Objetivo
Definir el contrato de datos para filtrar la vista principal del dashboard por rango de fechas usando el rango disponible real de la API y sin perder el comportamiento por defecto de mostrar todos los datos.

### Endpoints consumidos
- GET /api/metrics/facets
- GET /api/metrics

### Parámetros enviados
- GET /api/metrics/facets
	- No recibe parámetros de consulta en la API actual.
- GET /api/metrics
	- start_date?: string en formato YYYY-MM-DD
	- end_date?: string en formato YYYY-MM-DD

### Tipos TypeScript usados
- FacetsResponse
- DateRangeFilter

### Valores válidos
- start_date y end_date deben serializarse como string en formato YYYY-MM-DD.
- FacetsResponse.min_date y FacetsResponse.max_date definen el rango disponible real informado por backend.

### Restricciones
- Ambos inputs son opcionales.
- Si ambos están vacíos, la UI debe consultar o representar todos los datos.
- Si solo hay fecha inicial, la UI debe filtrar desde esa fecha.
- Si solo hay fecha final, la UI debe filtrar hasta esa fecha.
- Si ambas fechas existen, start_date debe ser menor o igual a end_date.
- La UI no debe enviar parámetros a GET /api/metrics/facets porque la API actual no los acepta.
- La UI debe mostrar min_date y max_date como rango disponible antes o durante la interacción con el filtro.

### Casos edge
- start_date vacío y end_date vacío: mostrar todos los datos del dashboard.
- start_date definido y end_date vacío: mostrar datos desde start_date en adelante.
- start_date vacío y end_date definido: mostrar datos hasta end_date.
- start_date posterior a end_date: bloquear la aplicación del filtro y mostrar error de validación.
- Fecha fuera del rango de min_date y max_date: mostrar validación y evitar una consulta inválida desde UI.
- FacetsResponse todavía no disponible: mantener el filtro visible pero en estado de carga o deshabilitado.

### Qué debe mostrar la UI en cada caso
- Sin fechas: estado explícito de “sin filtro de fechas” y datos completos.
- Solo fecha inicial: indicador de filtro “desde” la fecha elegida.
- Solo fecha final: indicador de filtro “hasta” la fecha elegida.
- Rango completo válido: indicador visual del rango activo.
- Rango inválido: mensaje inline de validación y sin refresco de datos.
- FacetsResponse disponible: hint visible con min_date y max_date.

## Funcionalidad 2 — Tabla de alertas de anomalías

### Objetivo
Definir el contrato de datos para consultar y mostrar anomalías de egresos usando un threshold configurable y el mismo rango de fechas opcional del dashboard principal.

### Endpoint consumido
- GET /api/metrics/alerts

### Parámetros enviados
- threshold?: number
- start_date?: string en formato YYYY-MM-DD
- end_date?: string en formato YYYY-MM-DD

### Tipos TypeScript usados
- AlertsParams
- AlertEntry
- AlertsResponse

### Valores válidos
- threshold debe tratarse en frontend como valor numérico entre 0.01 y 1.0.
- El valor por defecto de threshold en la UI debe ser 0.3.
- start_date y end_date son opcionales y deben usar formato YYYY-MM-DD.

### Restricciones
- La API actual acepta threshold mayor o igual a 0, pero el contrato de producto para frontend restringe el input a 0.01-1.0.
- El rango de fechas es opcional y debe heredarse de la funcionalidad 1 cuando exista un filtro activo.
- AlertsResponse es una lista de AlertEntry; la ausencia de anomalías debe representarse como lista vacía, no como error.
- baseline_average llega desde backend, pero la API actual no garantiza que represente exactamente una media móvil de 3 períodos anteriores.
- La semántica “media móvil de 3 períodos anteriores” debe marcarse como pendiente de contrato/backend hasta confirmación o ajuste del endpoint.

### Casos edge
- threshold omitido: usar 0.3 como valor por defecto de UI.
- threshold fuera del rango 0.01-1.0: mostrar validación y no disparar consulta hasta corregirlo.
- start_date y end_date vacíos: consultar alertas para todo el conjunto disponible.
- Lista vacía en AlertsResponse: no ocultar la sección; renderizar estado vacío explícito.
- baseline_average presente pero sin garantía de media móvil de 3 períodos: mostrar etiqueta o copy neutral hasta cerrar contrato, o documentar esa limitación en la implementación.

### Qué debe mostrar la UI en cada caso
- Carga: encabezado y estructura de tabla visibles con placeholders.
- Error: mensaje de error sin ocultar el control de threshold.
- Resultado con filas: tabla con período, outcome registrado, baseline_average y aumento porcentual formateado.
- Resultado vacío: mensaje explícito de que no hay anomalías para el rango y threshold actuales.
- Threshold inválido: error inline y sin actualización de resultados.

## Funcionalidad 3 — Vista comparativa B2B vs B2C

### Objetivo
Definir el contrato de datos para comparar ingresos B2B e ingresos B2C por categorías top, con dos consultas paralelas sobre el mismo endpoint y un rango de fechas opcional compartido.

### Endpoints consumidos
- GET /api/metrics/categories/top
- GET /api/metrics/facets

### Parámetros enviados
- GET /api/metrics/facets
	- No recibe parámetros de consulta en la API actual.
- GET /api/metrics/categories/top para B2B
	- operation_type: "income"
	- business_type: "B2B"
	- limit?: number, esperado 5
	- start_date?: string en formato YYYY-MM-DD
	- end_date?: string en formato YYYY-MM-DD
- GET /api/metrics/categories/top para B2C
	- operation_type: "income"
	- business_type: "B2C"
	- limit?: number, esperado 5
	- start_date?: string en formato YYYY-MM-DD
	- end_date?: string en formato YYYY-MM-DD

### Tipos TypeScript usados
- TopCategoriesParams
- CategoryEntry
- TopCategoriesResponse
- FacetsResponse

### Valores válidos
- operation_type debe ser "income" para esta funcionalidad.
- business_type debe consultarse como "B2B" y como "B2C" en consultas separadas.
- limit esperado: 5.
- start_date y end_date son opcionales y deben usar formato YYYY-MM-DD.
- FacetsResponse.min_date y FacetsResponse.max_date definen el rango visible permitido.

### Restricciones
- No se deben inventar endpoints dedicados de comparación; esta funcionalidad depende de dos llamadas reales a GET /api/metrics/categories/top.
- TopCategoriesResponse solo devuelve category, operation_type y total_amount.
- La API no devuelve porcentaje sobre el total del grupo; ese valor queda calculado en frontend a partir de total_amount.
- GET /api/metrics/facets no acepta parámetros de consulta y solo se usa como fuente de rango disponible y validación contextual.
- Si la implementación necesita el total absoluto de ingresos del grupo más allá del top 5 visible, eso queda pendiente de contrato/backend porque la respuesta actual no entrega un agregado total separado.

### Casos edge
- Rango de fechas vacío: consultar todo el histórico disponible para B2B y B2C.
- Solo start_date: filtrar desde esa fecha para ambos grupos.
- Solo end_date: filtrar hasta esa fecha para ambos grupos.
- B2B con lista vacía y B2C con datos: mantener ambas secciones visibles y mostrar estado vacío solo en B2B.
- B2C con lista vacía y B2B con datos: mantener ambas secciones visibles y mostrar estado vacío solo en B2C.
- Ambos grupos vacíos: mostrar dos estados vacíos y mantener visible el contexto de filtros.
- limit omitido: backend usa 5 por defecto; se puede considerar contrato válido para esta funcionalidad.

### Qué debe mostrar la UI en cada caso
- Respuesta con datos en ambos grupos: dos tablas paralelas con categoría, total_amount y porcentaje calculado en frontend.
- Solo un grupo con datos: una tabla con datos y la otra con mensaje explícito de ausencia de categorías.
- Ambos grupos vacíos: ambas secciones con estado vacío y gráfico comparativo en cero o estado neutral, sin desaparecer.
- FacetsResponse disponible: mostrar min_date y max_date como rango disponible del filtro compartido.
- Error de carga global: mantener visibles los controles y mostrar estado de error de la vista.

### Estado de contrato pendiente o calculado en frontend
- Pendiente de contrato/backend: confirmar si el total comparado en el gráfico inferior debe representar solo la suma del top 5 devuelto o el total absoluto completo del grupo.
- Calculado en frontend: porcentaje sobre total del grupo usando total_amount de TopCategoriesResponse.
