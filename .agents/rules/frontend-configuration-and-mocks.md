# Frontend Configuration And Mocks

## Regla 1
- Nombre: Datos mock con proposito documentado
- Alcance: Archivos de datos mock en frontend/src/lib.
- Razon: Existe data mock en el repositorio y debe quedar claro su rol para no confundir.
- Regla: Todo archivo de datos mock debe indicar su proposito y escenario de uso.
- Evidencia del repositorio: frontend/src/lib/mock-data.ts
- Ejemplo de aplicacion: Al agregar o mantener mock data, incluir nota de uso en documentacion y relacion con API real.
- Que evitar: Mantener mocks sin contexto que parezcan fuente oficial de datos en produccion.

## Regla 2
- Nombre: Criterio explicito entre mock y API real
- Alcance: Flujos de obtencion de datos en el frontend.
- Razon: El flujo principal actual consume API y no mock data.
- Regla: No mezclar datos mock y API real sin criterio explicito documentado por feature.
- Evidencia del repositorio: frontend/src/App.tsx, frontend/src/lib/mock-data.ts
- Ejemplo de aplicacion: Definir por feature si la fuente es API, mock o fallback, y mantenerlo consistente en implementacion y docs.
- Que evitar: Usar mock en unas rutas y API en otras sin explicacion ni señalizacion.

## Regla 3
- Nombre: Formatos de locale y currency centralizados o documentados
- Alcance: Utilidades de formato y presentacion financiera.
- Razon: Hoy los formatos estan definidos en un punto central, pero con valores fijos.
- Regla: Locale y currency deben centralizarse y, si se mantienen fijos por alcance del proyecto, documentarse de forma explicita.
- Evidencia del repositorio: frontend/src/lib/financial-utils.ts
- Ejemplo de aplicacion: Si cambia el alcance internacional, mover locale/currency a configuracion compartida y reutilizarla en utilidades.
- Que evitar: Repetir locale/currency hardcodeado en multiples componentes.

## Regla 4
- Nombre: Flujo principal de datos claramente comunicable
- Alcance: Onboarding tecnico y mantenimiento frontend.
- Razon: Futuros contribuidores necesitan identificar rapido la fuente de datos del dashboard.
- Regla: El flujo principal de datos debe quedar claro en codigo y documentacion para contribucion futura.
- Evidencia del repositorio: frontend/src/App.tsx, frontend/src/lib/mock-data.ts, frontend/src/lib/financial-utils.ts
- Ejemplo de aplicacion: Al introducir nueva fuente de datos, actualizar referencia en documentos de handover y en puntos de entrada de la feature.
- Que evitar: Dejar ambiguedad sobre si el dashboard depende de API o de datos locales.
