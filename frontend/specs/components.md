# Especificación de componentes frontend

## Funcionalidad 1 — Filtro de rango de fechas en dashboard principal

### Objetivo de UI
Permitir que la vista principal del dashboard filtre los datos globales por rango de fechas sin romper el comportamiento actual del dashboard. El filtro debe ser opcional y debe dejar claro cuál es el rango disponible según la API.

### Componentes propuestos
- DateRangeFilter: especificación de contenedor visual para el filtro de fechas.
- DateInputField: especificación de input reutilizable para fecha inicial o final.
- AvailableDateRangeHint: especificación de texto auxiliar que muestra el rango mínimo y máximo permitido.
- DateRangeFilterActions: especificación de acciones de aplicar y limpiar filtro si la implementación decide no aplicar automáticamente.

### Ubicación sugerida en la pantalla
Ubicar DateRangeFilter debajo de DashboardHeader y por encima de KPIRow, de forma que el filtro afecte KPIs y gráficos sin competir visualmente con las tarjetas existentes.

### Props esperadas con tipos
- DateRangeFilter
	- facets: FacetsResponse | null
	- value: DateRangeFilter
	- onChange: (nextValue: DateRangeFilter) => void
	- onApply?: (nextValue: DateRangeFilter) => void
	- onClear?: () => void
	- loading?: boolean
	- disabled?: boolean
- DateInputField
	- label: string
	- value?: DateString
	- min?: DateString
	- max?: DateString
	- onChange: (nextValue?: DateString) => void
	- disabled?: boolean
	- describedBy?: string
- AvailableDateRangeHint
	- min_date: DateString
	- max_date: DateString

### Estado que debe manejar
- Estado local del valor start_date.
- Estado local del valor end_date.
- Estado de validación cuando start_date sea posterior a end_date.
- Estado de carga mientras se obtiene FacetsResponse.
- Estado deshabilitado si la vista principal todavía no puede aplicar filtros.
- Estado derivado isPristine cuando ambos campos están vacíos.

### Validaciones de fecha
- Ambos inputs son opcionales.
- Si ambos están vacíos, se muestran todos los datos.
- Si solo hay fecha inicial, se filtra desde esa fecha.
- Si solo hay fecha final, se filtra hasta esa fecha.
- Si ambos existen, start_date debe ser menor o igual a end_date.
- El valor de start_date no debe ser anterior a facets.min_date cuando FacetsResponse ya esté disponible.
- El valor de end_date no debe ser posterior a facets.max_date cuando FacetsResponse ya esté disponible.
- Si el usuario selecciona un rango inválido, la UI debe mostrar error de validación y evitar disparar el refresco de datos hasta corregirlo.

### Renderizado condicional
- Mientras facets sea null y loading sea true, renderizar placeholders o inputs deshabilitados.
- Si facets ya existe, mostrar AvailableDateRangeHint con min_date y max_date.
- Si hay error de validación, mostrar mensaje inline bajo el control afectado o bajo el grupo completo.
- Si la vista principal ya tiene un error de carga global, el filtro puede seguir visible pero deshabilitado para preservar contexto.

### Estados vacíos o comportamiento cuando no hay fechas
- Cuando no hay fechas seleccionadas, el estado visual debe indicar “Sin filtro de fechas” o equivalente.
- Limpiar ambos campos debe restablecer la consulta de GET /api/metrics sin start_date ni end_date.
- El hint de rango disponible debe seguir visible aunque no haya fechas activas.

### Relación con DateRangeFilter y FacetsResponse
- DateRangeFilter define el shape del estado de consulta: start_date?: DateString y end_date?: DateString.
- FacetsResponse aporta min_date y max_date para límites de UI y también puede servir como fuente futura para validación adicional de operation_types, business_types y categories.
- GET /api/metrics/facets no acepta parámetros en la API actual, así que DateRangeFilter no debe intentar enviar query params a ese endpoint.
- GET /api/metrics sí acepta start_date y end_date, por lo que este filtro debe mapearse directamente a esos nombres de query string.

### Endpoints relacionados
- GET /api/metrics/facets
- GET /api/metrics

## Funcionalidad 2 — Tabla de alertas de anomalías

### Objetivo de UI
Mostrar al usuario períodos con anomalías de egresos sin ocultar la sección cuando no existan resultados. La tabla debe responder al rango de fechas activo del dashboard y permitir ajustar el threshold de sensibilidad.

### Componentes propuestos
- AnomalyAlertsTable: especificación de contenedor principal de la funcionalidad.
- AlertsThresholdInput: especificación de control numérico para threshold.
- AlertsTable: especificación de tabla de resultados.
- AlertsEmptyState: especificación de estado vacío persistente.
- AlertsSectionHeader: especificación de cabecera con título, descripción y control de threshold.

### Ubicación sugerida debajo de los gráficos existentes
Ubicar AnomalyAlertsTable debajo de la sección actual de gráficos del dashboard principal, como un bloque de ancho completo con suficiente separación vertical respecto a IncomeOutcomeChart y ProfitPercentChart.

### Props esperadas con tipos
- AnomalyAlertsTable
	- params: AlertsParams
	- data: AlertsResponse | null
	- loading?: boolean
	- error?: string | null
	- onParamsChange: (nextValue: AlertsParams) => void
	- onRetry?: () => void
- AlertsThresholdInput
	- value?: number
	- defaultValue?: number
	- min: number
	- max: number
	- step?: number
	- onChange: (nextValue?: number) => void
	- disabled?: boolean
- AlertsTable
	- rows: AlertsResponse
	- loading?: boolean

### Estado que debe manejar
- Estado local o controlado del threshold.
- Estado derivado para usar 0.3 cuando threshold no esté definido.
- Estado de carga de la tabla.
- Estado de error de carga.
- Estado vacío cuando la API responda una lista vacía.
- Estado sincronizado con el rango activo de la funcionalidad 1.

### Validación del threshold
- El threshold es numérico.
- Rango válido de UI: 0.01 a 1.0.
- Valor por defecto: 0.3.
- Si el usuario borra temporalmente el input, la UI puede retener estado vacío local, pero al aplicar consulta debe volver a 0.3 o exigir un valor válido.
- Si el usuario introduce un valor fuera del rango, la UI debe mostrar validación inline y evitar refrescar resultados hasta corregirlo.
- La API actual solo exige threshold mayor o igual a 0, así que el rango 0.01 a 1.0 debe tratarse como regla de producto en frontend.

### Renderizado condicional
- Si loading es true, mostrar skeleton o filas de carga manteniendo visible el encabezado de la sección.
- Si error existe, mostrar mensaje de error con acción de retry sin ocultar el control de threshold.
- Si data contiene filas, renderizar la tabla completa.
- Si data es una lista vacía, renderizar AlertsEmptyState dentro del mismo bloque visual; la sección no desaparece.

### Estado vacío cuando no hay anomalías
- Mostrar mensaje explícito, por ejemplo: “No se detectaron anomalías para el rango y threshold seleccionados”.
- Mantener visibles el encabezado, el threshold y la referencia al rango de fechas activo para que el usuario entienda el contexto del resultado vacío.

### Estructura de columnas
- Período.
- Outcome registrado.
- Media móvil de 3 períodos anteriores.
- Incremento porcentual.

### Relación con AlertsParams, AlertEntry y AlertsResponse
- AlertsParams aporta threshold y también start_date y end_date mediante herencia de DateRangeFilter.
- La tabla debe respetar el rango de fechas activo de la funcionalidad 1 reenviando start_date y end_date a GET /api/metrics/alerts cuando existan.
- AlertsResponse es un arreglo de AlertEntry.
- AlertEntry ofrece period, outcome_total, baseline_average e increase_ratio.
- La API actual devuelve baseline_average, pero en backend ese valor representa el promedio histórico acumulado y no confirma una media móvil de 3 períodos anteriores.
- La especificación de producto pide media móvil de 3 períodos anteriores, por lo que la implementación debe tratar ese punto como requisito pendiente de validación o extensión backend antes de etiquetar baseline_average como “media móvil de 3 períodos”.
- increase_ratio llega desde la API como razón relativa; la UI debe presentarlo como porcentaje formateado.

### Endpoints relacionados
- GET /api/metrics/alerts

## Funcionalidad 3 — Vista comparativa B2B vs B2C

### Objetivo de UI
Presentar una comparación paralela entre ingresos B2B e ingresos B2C usando el endpoint de categorías top, permitiendo identificar rápidamente concentración por categoría y diferencia total visible entre ambos segmentos.

### Componentes propuestos
- BusinessComparisonView: especificación de contenedor principal de la nueva vista o página.
- BusinessComparisonToolbar: especificación de barra superior con rango de fechas y contexto del rango disponible.
- BusinessCategoryTable: especificación de tabla reutilizable para una sección B2B o B2C.
- BusinessCategorySection: especificación de bloque para un segmento individual.
- BusinessTotalsComparisonChart: especificación de gráfico comparativo inferior.
- BusinessSectionEmptyState: especificación de estado vacío por segmento.

### Ubicación sugerida como nueva página o vista del dashboard
Implementar esta funcionalidad como una nueva página o vista del dashboard, separada de la pantalla principal actual. Dentro de esa vista, mostrar primero el toolbar de filtros, luego dos secciones en paralelo para B2B y B2C, y debajo un gráfico comparativo de totales.

### Props esperadas con tipos
- BusinessComparisonView
	- facets: FacetsResponse | null
	- b2bParams: TopCategoriesParams
	- b2cParams: TopCategoriesParams
	- b2bData: TopCategoriesResponse | null
	- b2cData: TopCategoriesResponse | null
	- loading?: boolean
	- error?: string | null
	- onDateRangeChange: (nextValue: DateRangeFilter) => void
	- onRetry?: () => void
- BusinessCategorySection
	- title: "B2B" | "B2C"
	- params: TopCategoriesParams
	- rows: TopCategoriesResponse
	- loading?: boolean
	- emptyMessage: string
- BusinessCategoryTable
	- rows: TopCategoriesResponse
	- loading?: boolean
	- businessType: BusinessType
- BusinessTotalsComparisonChart
	- b2bTotalIncome: number
	- b2cTotalIncome: number
	- loading?: boolean

### Estado que debe manejar
- Estado de rango de fechas opcional compartido entre ambas consultas.
- Estado de carga conjunto o independiente para B2B y B2C.
- Estado de error por vista completa o por cada sección, según la estrategia de implementación.
- Estado vacío cuando B2B no tenga categorías.
- Estado vacío cuando B2C no tenga categorías.
- Estado derivado para totales visibles de cada grupo calculados a partir de total_amount.

### Validaciones de fecha
- La vista acepta rango de fechas opcional.
- Si start_date y end_date están vacíos, se consultan todos los datos disponibles.
- Si solo start_date existe, se filtra desde esa fecha.
- Si solo end_date existe, se filtra hasta esa fecha.
- Si ambos existen, start_date debe ser menor o igual a end_date.
- Si facets está disponible, usar min_date y max_date para limitar selección y mostrar rango disponible.

### Renderizado condicional
- Mientras facets o las tablas estén cargando, mantener visible la estructura de la vista con placeholders.
- Si una sección tiene datos y la otra no, ambas secciones deben seguir renderizadas en paralelo para que la comparación no colapse visualmente.
- Si ocurre error de carga global, mostrar mensaje de error y mantener visibles los controles de filtro y retry.
- Si la vista no tiene error pero una sección está vacía, mostrar BusinessSectionEmptyState solo en esa columna.

### Estados vacíos para B2B o B2C sin categorías
- Si B2B no devuelve categorías, mostrar mensaje explícito en la sección B2B, por ejemplo: “No hay categorías de ingreso para el rango seleccionado en B2B”.
- Si B2C no devuelve categorías, mostrar mensaje equivalente en la sección B2C.
- El gráfico inferior debe manejar el caso de uno o ambos totales en cero sin desaparecer.

### Estructura visual requerida
- La vista tiene dos secciones en paralelo: B2B y B2C.
- Cada sección muestra una tabla con top 5 categorías de ingreso.
- Cada fila muestra nombre de categoría, total de ingresos y porcentaje sobre el total del grupo.
- Bajo ambas secciones debe haber un gráfico comparando total de ingresos B2B vs B2C.

### Relación con TopCategoriesParams, CategoryEntry, TopCategoriesResponse y FacetsResponse
- TopCategoriesParams ya fija operation_type: "income" y business_type obligatorio, por lo que la implementación debe crear una consulta con business_type: "B2B" y otra con business_type: "B2C".
- limit puede omitirse y dejar que la API aplique 5 por defecto, o enviarse explícitamente como 5 para que la intención de producto quede clara.
- start_date y end_date deben copiarse desde el filtro compartido de la vista cuando existan.
- TopCategoriesResponse es un arreglo de CategoryEntry.
- CategoryEntry solo devuelve category, operation_type y total_amount.
- La API no devuelve porcentaje sobre total del grupo; el frontend debe calcularlo a partir de total_amount dividido por la suma de total_amount de la lista devuelta para ese grupo.
- FacetsResponse aporta min_date y max_date para el control de fechas y business_types para validar que la segmentación esperada siga siendo B2B y B2C.
- El gráfico inferior puede calcular el total visible por grupo sumando total_amount de la respuesta de cada sección.
- Si producto exige que el gráfico represente el total absoluto de ingresos del grupo y no solo el total representado por las categorías devueltas, ese punto debe validarse contra backend porque GET /api/metrics/categories/top no expone un campo agregado explícito de total global.

### Endpoints relacionados
- GET /api/metrics/categories/top
- GET /api/metrics/facets
