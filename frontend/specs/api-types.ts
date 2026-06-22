/**
 * Fecha serializada por la API en formato YYYY-MM-DD.
 */
export type DateString = string;

/**
 * Tipo de operacion financiera expuesto por la API.
 */
export type OperationType = "income" | "outcome";

/**
 * Tipo de negocio expuesto por la API.
 */
export type BusinessType = "B2B" | "B2C";

/**
 * Categoria financiera expuesta por la API.
 */
export type Category =
	| "suppliers"
	| "sales"
	| "operational"
	| "administrative"
	| "others";

// Funcionalidad 1 - Filtro de rango de fechas

/**
 * Respuesta de GET /api/metrics/facets.
 */
export interface FacetsResponse {
	/**
	 * Tipos de operacion disponibles para filtrar metricas.
	 */
	operation_types: OperationType[];
	/**
	 * Tipos de negocio disponibles para filtrar metricas.
	 */
	business_types: BusinessType[];
	/**
	 * Categorias disponibles para filtrar metricas.
	 */
	categories: Category[];
	/**
	 * Fecha minima disponible en la serie, en formato YYYY-MM-DD.
	 */
	min_date: DateString;
	/**
	 * Fecha maxima disponible en la serie, en formato YYYY-MM-DD.
	 */
	max_date: DateString;
}

// Funcionalidad 2 - Tabla de alertas de anomalias

/**
 * Entrada individual de GET /api/metrics/alerts.
 */
export interface AlertEntry {
	/**
	 * Periodo agrupado donde se detecto la anomalia.
	 */
	period: string;
	/**
	 * Total de egresos observado en el periodo.
	 */
	outcome_total: number;
	/**
	 * Promedio historico de egresos usado como linea base.
	 */
	baseline_average: number;
	/**
	 * Incremento relativo respecto a la linea base.
	 */
	increase_ratio: number;
}

/**
 * Respuesta de GET /api/metrics/alerts.
 */
export type AlertsResponse = AlertEntry[];

// Funcionalidad 3 - Vista comparativa B2B vs B2C

/**
 * Entrada individual de GET /api/metrics/categories/top.
 */
export interface CategoryEntry {
	/**
	 * Categoria agregada en el ranking.
	 */
	category: Category;
	/**
	 * Tipo de operacion usado para construir el ranking.
	 */
	operation_type: OperationType;
	/**
	 * Monto total acumulado para la categoria.
	 */
	total_amount: number;
}

/**
 * Respuesta de GET /api/metrics/categories/top.
 */
export type TopCategoriesResponse = CategoryEntry[];
