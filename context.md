# Contexto del proyecto

## Que es este proyecto

Este repositorio implementa un dashboard de metricas financieras con arquitectura full stack.

- Frontend: visualiza KPIs y graficos (ingresos vs egresos y porcentaje de ganancia).
- Backend: expone una API REST que genera datos mock de movimientos financieros, aplica filtros y calcula agregados.
- Orquestacion: ambos servicios corren con Docker Compose.

El objetivo principal es servir como proyecto de practica para inspeccion de codigo con agentes de IA, definicion de reglas y memoria de trabajo.

## Stack utilizado

### Frontend

- React 19 + TypeScript
- Vite 8 (dev server y build)
- Tailwind CSS 4 (via plugin de Vite)
- Recharts (graficos)
- Lucide React (iconos)
- Vitest + coverage v8 (tests unitarios)
- ESLint 9 + typescript-eslint

Detalles relevantes:

- Alias `@` configurado hacia `src`.
- Proxy en desarrollo de `/api` hacia `http://backend:8000`.
- Estilos con tokens CSS (tema claro/oscuro) en `index.css`.
- Imagen base de contenedor: `node:24-alpine`.

### Backend

- Python
- FastAPI
- Uvicorn (ASGI server)
- Pydantic (modelos de respuesta/entrada)
- Pytest + pytest-cov + TestClient/httpx
- debugpy (depuracion)
- Imagen base de contenedor: `python:3.13-slim`.

## Arquitectura y flujo

### 1) Capa API (backend)

En `backend/app/main.py` se inicializa FastAPI, se habilita CORS abierto y se registra el router.

En `backend/app/routes.py` vive casi toda la logica:

- Modelos de dominio: `FinancialMovement`, `MetricsFacets`, `MetricsSummaryItem`, `TopCategoryItem`, `MetricsComparison`, `MetricsAlert`.
- Generacion de dataset mock anual: 360 movimientos (12 meses x 30), con semilla fija (`seed=42`) para resultados consistentes.
- Funciones de negocio: filtros por fecha/categoria/tipo, resumen por periodo (dia/semana/mes), top categorias, comparacion contra periodo previo y deteccion de alertas de egresos.

Endpoints principales:

- `GET /health`
- `GET /api/metrics`
- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`

### 2) Capa UI (frontend)

`src/App.tsx`:

- consume `GET /api/metrics`
- calcula metricas en cliente con utilidades (`computeKPIs`, `computeMonthlyData`)
- renderiza:
  - encabezado de dashboard
  - fila de KPI cards
  - grafico de ingresos/egresos
  - grafico de porcentaje de ganancia

Componentes estan organizados por dominio (`components/dashboard`) y base UI (`components/ui`).

El alcance actual de la UI consume `GET /api/metrics` y realiza en cliente el calculo de KPI y agregacion mensual.
Aunque el backend expone endpoints adicionales (summary, comparacion, alertas, top categorias y facets), esos recursos todavia no se integran en vistas dedicadas dentro de `App.tsx`.

### 3) Infraestructura local

`docker-compose.yml` levanta:

- `frontend` en puerto 5173
- `backend` en puerto 8000 (y 5678 para debug)

Con `docker compose up --build` se obtiene una experiencia local completa.

## Despliegue y ejecucion

- Comando principal: `docker compose up --build`.
- Frontend disponible en `http://localhost:5173`.
- Backend disponible en `http://localhost:8000`.
- Documentacion OpenAPI en `http://localhost:8000/docs`.
- Puerto `5678` habilitado para depuracion del backend con `debugpy`.

## Que realiza funcionalmente

1. Simula operaciones financieras de una compania (ingresos/egresos) para un ano movil.
2. Permite filtrar y segmentar por fechas, categoria, tipo de operacion y tipo de negocio (B2B/B2C).
3. Entrega agregados listos para analitica:
   - series temporales
   - top categorias
   - comparativas entre periodos
   - alertas por incremento anomalo de egresos
4. Presenta una vista ejecutiva con KPIs y visualizaciones para lectura rapida.

## Calidad y pruebas

- Backend: `backend/tests/test_routes.py` valida endpoints, filtros, orden cronologico, facets, summary, comparacion y alertas.
- Frontend: `src/lib/financial-utils.test.ts` valida calculos de KPI, agregacion mensual y formateadores.

Cobertura de pruebas centrada en logica de negocio y contratos API/utilidades; no hay pruebas E2E del flujo completo frontend-backend en este repositorio.

## Observaciones tecnicas

- El backend usa datos mock en memoria (no base de datos), ideal para demo/prototipo.
- Parte del analisis (KPIs base) se calcula en frontend sobre `/api/metrics`, mientras otras metricas avanzadas ya existen en endpoints dedicados.
- La estructura del proyecto esta preparada para evolucionar hacia datos reales y filtros avanzados en UI.