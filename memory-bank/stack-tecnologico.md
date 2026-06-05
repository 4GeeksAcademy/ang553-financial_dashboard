# Stack Tecnológico — Financial Metrics Dashboard

## Frontend
- **Framework:** React
- **Lenguaje:** TypeScript
- **Herramienta de build:** Vite
- **Gestor de paquetes:** npm
- **Principales dependencias:**
  - `react`, `react-dom`: núcleo de la UI
  - `lucide-react`: iconografía
  - `recharts`: gráficos y visualizaciones
  - `clsx`: utilidades para clases CSS
- **Estructura:**
  - Componentes principales en `frontend/src/components/dashboard/`
  - Utilidades y tipos en `frontend/src/lib/`
  - Estilos en `frontend/src/index.css`

## Backend
- **Framework:** FastAPI
- **Lenguaje:** Python 3
- **Gestor de dependencias:** pip (requirements.txt)
- **Principales dependencias:**
  - `fastapi`: framework web
  - `pydantic`: validación de datos
  - `pytest`: testing
- **Estructura:**
  - Lógica y rutas en `backend/app/`
  - Pruebas en `backend/tests/`

## Infraestructura y Tooling
- **Contenedores:** Docker (Dockerfile en frontend y backend)
- **Orquestación:** docker-compose (`docker-compose.yml`)
- **Testing:** pytest (backend), Vitest (frontend)
- **Documentación:** OpenAPI (FastAPI expone `/docs`)
- **Configuración:**
  - Variables de entorno para el frontend (`.env.example`)
  - Configuración de TypeScript (`tsconfig.json`)

## Referencias
- [frontend/package.json](../frontend/package.json)
- [backend/requirements.txt](../backend/requirements.txt)
- [docker-compose.yml](../docker-compose.yml)

---
Este stack está basado en la evidencia directa de archivos y dependencias presentes en el repositorio.