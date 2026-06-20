# Current State

## Features implementadas observables
- El frontend monta una unica pantalla principal de dashboard.
- El dashboard consume datos desde /api/metrics.
- Se calculan KPIs y agregados mensuales en frontend/src/lib/financial-utils.ts.
- Se muestran KPIs, grafica de ingresos/egresos y grafica de profit porcentual.
- El backend expone endpoints de metricas, facets, summary, top categories, comparison, alerts, b2b y b2c.
- Existen pruebas unitarias para utilidades financieras y pruebas backend para endpoints y filtros observados.

## Flujo principal actual
1. frontend/src/main.tsx monta App.
2. frontend/src/App.tsx hace fetch a /api/metrics.
3. frontend/vite.config.ts redirige /api al backend.
4. backend/app/routes.py responde movimientos financieros.
5. El frontend calcula KPIs y datos mensuales.
6. El dashboard renderiza tarjetas y graficas.

## Gaps conocidos o riesgos ya identificados
- No se observan pruebas visibles de componentes dashboard.
- frontend/src/lib/mock-data.ts existe, pero el flujo principal observado usa API desde frontend/src/App.tsx.
- Locale y moneda aparecen fijos en frontend/src/lib/financial-utils.ts.
- Los endpoints avanzados del backend deben validarse antes de afirmar que estan integrados en la UI.
- En App.tsx no se observa cancelacion explicita del fetch en useEffect.
- El mensaje de error para usuario en App.tsx no conserva detalle tecnico visible para diagnostico.

## Siguientes prioridades recomendadas
- Validar si los endpoints avanzados del backend tienen consumo real en UI actual o si son preparacion para fases futuras.
- Mantener y aplicar las reglas definidas en .agents/rules para flujo de datos, logica financiera, componentes y configuracion.
- Si se expande el dashboard, priorizar pruebas de render para componentes criticos.
- Documentar de forma consistente el rol de mock-data frente al flujo principal basado en API.

## Que no se debe asumir todavia
- No asumir que mock-data alimenta la pantalla principal actual.
- No asumir que todos los endpoints del backend estan integrados en el frontend.
- No asumir que locale y currency actuales son decisiones definitivas de producto.
- No asumir que la cobertura de pruebas frontend incluye la UI del dashboard.

## Evidencia del repositorio
- docs/handover-inicial.md
- docs/engineering-practices-phase-2.md
- .agents/rules/frontend-data-flow.md
- .agents/rules/frontend-business-logic.md
- .agents/rules/frontend-components-and-testing.md
- .agents/rules/frontend-configuration-and-mocks.md
- frontend/src/App.tsx
- frontend/src/main.tsx
- frontend/src/lib/financial-utils.ts
- frontend/src/lib/financial-utils.test.ts
- frontend/vite.config.ts
- backend/app/main.py
- backend/app/routes.py
- backend/tests/test_routes.py
- docker-compose.yml
- README.md
- README.es.md
