# Product Overview

## Que es el producto
Este repositorio implementa un dashboard de metricas financieras con frontend en React + TypeScript y backend en FastAPI.

## Que problema resuelve
Permite visualizar movimientos financieros y convertirlos en indicadores simples para seguimiento operativo, como ingresos, egresos, profit y margen de profit.

## Que muestra el dashboard
El flujo principal observado muestra:
- Una cabecera de dashboard.
- KPIs agregados.
- Una grafica de ingresos vs egresos por mes.
- Una grafica de profit porcentual por mes.

## Como se conectan frontend y backend
El frontend inicia en frontend/src/main.tsx y carga la pantalla principal en frontend/src/App.tsx.
App.tsx solicita datos a /api/metrics.
frontend/vite.config.ts configura un proxy de /api hacia http://backend:8000.
El backend expone esa ruta desde backend/app/routes.py.
Docker Compose levanta ambos servicios para desarrollo local.

## Evidencia del repositorio
- README.md
- README.es.md
- frontend/src/main.tsx
- frontend/src/App.tsx
- frontend/vite.config.ts
- backend/app/main.py
- backend/app/routes.py
- docker-compose.yml
- docs/handover-inicial.md
