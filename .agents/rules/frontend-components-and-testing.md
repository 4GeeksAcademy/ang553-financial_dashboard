# Frontend Components And Testing

## Regla 1
- Nombre: Props tipadas para componentes reutilizables
- Alcance: Componentes del dashboard y componentes UI compartidos.
- Razon: El tipado actual define contratos claros y reduce errores de integracion.
- Regla: Todo componente reutilizable debe declarar interfaz de props tipada.
- Evidencia del repositorio: frontend/src/components/dashboard/kpi-row.tsx, frontend/src/components/dashboard/kpi-card.tsx
- Ejemplo de aplicacion: Al crear un nuevo card de metricas, definir tipo de props antes de implementar el render.
- Que evitar: Recibir props sin contrato tipado o con any.

## Regla 2
- Nombre: Variantes visuales tipadas
- Alcance: Componentes que manejan variantes de estilo/estado.
- Razon: Las variantes tipadas previenen combinaciones invalidas y mejoran consistencia visual.
- Regla: Las variantes visuales deben definirse mediante union types o estructuras equivalentes tipadas.
- Evidencia del repositorio: frontend/src/components/dashboard/kpi-card.tsx
- Ejemplo de aplicacion: Al sumar una variante nueva, actualizar el tipo de variante y el mapa de estilos en un mismo cambio.
- Que evitar: Variantes como strings libres sin validacion de tipo.

## Regla 3
- Nombre: Estados de visualizacion en componentes de datos
- Alcance: Componentes de graficas y tarjetas que dependen de datos remotos.
- Razon: El dashboard actual contempla estados utiles para usuario durante carga y ausencia de datos.
- Regla: Componentes de visualizacion deben contemplar loading y empty state cuando aplique.
- Evidencia del repositorio: frontend/src/components/dashboard/income-outcome-chart.tsx, frontend/src/components/dashboard/profit-percent-chart.tsx, frontend/src/components/dashboard/kpi-card.tsx
- Ejemplo de aplicacion: Si se agrega un grafico nuevo, incluir skeleton para carga y mensaje de no-data antes del render principal.
- Que evitar: Mostrar grafico vacio sin contexto o saltar directamente a null.

## Regla 4
- Nombre: Pruebas de render para componentes criticos del dashboard
- Alcance: Componentes KPI y componentes de graficas.
- Razon: Fase 2 detecto cobertura visible en utilidades, pero no en render de componentes clave.
- Regla: Los componentes criticos del dashboard deben tener pruebas de renderizado para estados principales.
- Evidencia del repositorio: frontend/src/components/dashboard/kpi-card.tsx, frontend/src/components/dashboard/income-outcome-chart.tsx, frontend/src/components/dashboard/profit-percent-chart.tsx
- Ejemplo de aplicacion: Crear tests que validen loading, empty y data-ready para cada componente critico.
- Que evitar: Confiar solo en pruebas de utilidades para detectar problemas de UI.
