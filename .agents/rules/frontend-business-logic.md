# Frontend Business Logic

## Regla 1
- Nombre: Logica financiera fuera de componentes visuales
- Alcance: Componentes del dashboard y modulos de utilidades financieras.
- Razon: La separacion actual facilita mantenimiento y reduce acoplamiento entre UI y calculo.
- Regla: Los calculos financieros deben vivir en utilidades de dominio, no dentro de JSX.
- Evidencia del repositorio: frontend/src/lib/financial-utils.ts, frontend/src/App.tsx
- Ejemplo de aplicacion: Si se agrega un nuevo KPI, implementarlo primero en utilidades y luego consumirlo desde el componente.
- Que evitar: Calcular totales, porcentajes o agregaciones directamente dentro de componentes de presentacion.

## Regla 2
- Nombre: Reutilizar utilidades financieras existentes
- Alcance: Todo calculo de KPIs, datos mensuales y formato monetario/porcentual.
- Razon: Ya existe un punto unico de calculo y formato para el dashboard.
- Regla: Usar financial-utils.ts como fuente principal para KPIs, agregaciones y formateos.
- Evidencia del repositorio: frontend/src/lib/financial-utils.ts, frontend/src/App.tsx
- Ejemplo de aplicacion: Para mostrar un nuevo valor monetario en UI, usar la funcion de formato existente antes de crear una nueva.
- Que evitar: Crear funciones paralelas de formato o agregacion en varios archivos.

## Regla 3
- Nombre: Nuevas utilidades con pruebas unitarias obligatorias
- Alcance: Archivos de utilidades financieras en frontend/src/lib.
- Razon: El repositorio ya valida utilidades de negocio con pruebas unitarias.
- Regla: Toda nueva utilidad financiera debe incluir o actualizar pruebas unitarias en el archivo de test correspondiente.
- Evidencia del repositorio: frontend/src/lib/financial-utils.ts, frontend/src/lib/financial-utils.test.ts
- Ejemplo de aplicacion: Si se agrega computeQuarterlyData, incluir casos de prueba normal y de borde en test.
- Que evitar: Agregar logica de negocio sin cobertura minima de pruebas.

## Regla 4
- Nombre: Evitar duplicacion de calculos de negocio
- Alcance: Componentes dashboard, hooks y utilidades.
- Razon: Duplicar calculos crea resultados inconsistentes y mas puntos de mantenimiento.
- Regla: Si un calculo financiero ya existe en utilidades, debe reutilizarse en lugar de reimplementarse.
- Evidencia del repositorio: frontend/src/lib/financial-utils.ts, frontend/src/App.tsx
- Ejemplo de aplicacion: Reusar computeMonthlyData para series temporales en vez de volver a agrupar movimientos en cada componente.
- Que evitar: Copiar y pegar formulas de ganancia o margen en multiples componentes.
