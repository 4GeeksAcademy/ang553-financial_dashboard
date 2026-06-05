# Financial Metrics Dashboard — Overview

## Evidencia verificada del repositorio

### Descripción general
Este proyecto es un dashboard financiero que permite visualizar y analizar datos financieros clave. Está compuesto por dos grandes módulos:
- **Frontend:** React + TypeScript (ubicado en `frontend/`)
- **Backend:** FastAPI en Python (ubicado en `backend/`)

### Funcionalidad principal
- Visualización de métricas ejecutivas: ingresos, egresos, utilidad y margen de utilidad.
- Gráficas de evolución mensual de ingresos y egresos.
- Visualización de margen de utilidad en el tiempo.
- Componentes reutilizables para tarjetas KPI y gráficos.
- Backend expone endpoints para obtener datos financieros y métricas agregadas.

### Evidencia en el repositorio
- Documentación en `README.md` y `README.es.md`.
- Componentes clave en `frontend/src/components/dashboard/` como `kpi-card.tsx`, `income-outcome-chart.tsx`, `profit-percent-chart.tsx`, `dashboard-header.tsx`, `kpi-row.tsx`.
- Lógica de negocio y tipos en `frontend/src/lib/`.
- Backend con modelos y rutas en `backend/app/routes.py`.
- Pruebas automatizadas en `backend/tests/`.
- Despliegue local con Docker (`docker-compose.yml`).

### Ejecución local
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentación API: http://localhost:8000/docs

### Referencias
- [README.md](../README.md)
- [README.es.md](../README.es.md)
- [context.md](../context.md)

---
Este overview se basa únicamente en archivos y estructuras presentes en el repositorio.