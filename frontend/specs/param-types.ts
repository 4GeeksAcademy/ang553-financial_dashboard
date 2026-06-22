import type { BusinessType, DateString, OperationType } from "./api-types";

// Funcionalidad 1 - Filtro de rango de fechas

/**
 * Filtro reutilizable de rango de fechas para endpoints que aceptan fechas de inicio y fin.
 * Respaldo actual de API: GET /api/metrics, GET /api/metrics/alerts y GET /api/metrics/categories/top.
 * Nota: GET /api/metrics/facets no acepta parametros de consulta en la API actual.
 */
export interface DateRangeFilter {
	/**
	 * Fecha inicial inclusiva en formato YYYY-MM-DD.
	 */
	start_date?: DateString;
	/**
	 * Fecha final inclusiva en formato YYYY-MM-DD.
	 */
	end_date?: DateString;
}

// Funcionalidad 2 - Tabla de alertas de anomalias

/**
 * Parametros de consulta para GET /api/metrics/alerts.
 * Nota: la API actual tambien acepta group_by y business_type, pero no aparecen como requisito explicito de esta funcionalidad en la especificacion disponible.
 */
export interface AlertsParams extends DateRangeFilter {
	/**
	 * Umbral minimo de incremento relativo para marcar una anomalia.
	 * En la API actual es opcional y su valor por defecto es 0.3.
	 */
	threshold?: number;
}

// Funcionalidad 3 - Vista comparativa B2B vs B2C

/**
 * Parametros de consulta para GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
	/**
	 * Tipo de operacion usado para construir el ranking.
	 * Para esta funcionalidad debe ser siempre income porque la vista compara ingresos.
	 */
	operation_type: Extract<OperationType, "income">;
	/**
	 * Cantidad maxima de categorias a devolver.
	 * La API actual acepta valores entre 1 y 20 y usa 5 por defecto.
	 * Para esta funcionalidad se espera top 5 salvo que la vista defina otra configuracion.
	 */
	limit?: number;
	/**
	 * Segmento de negocio para comparar resultados entre B2B y B2C.
	 * Para esta funcionalidad es obligatorio porque la vista consulta B2B y B2C por separado.
	 */
	business_type: BusinessType;
}
