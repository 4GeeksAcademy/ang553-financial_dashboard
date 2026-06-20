# Tech Stack

## Frontend
- React y React DOM como base de UI.
- TypeScript para tipado.
- Vite como entorno de desarrollo y build.
- Componentes de dashboard ubicados en frontend/src/components/dashboard.
- Utilidades financieras en frontend/src/lib/financial-utils.ts.
- Graficas con recharts.
- Iconos con lucide-react.
- Alias de imports con @ configurado en frontend/vite.config.ts.

## Backend
- FastAPI como framework API.
- Rutas y logica principal en backend/app/routes.py.
- App principal y CORS en backend/app/main.py.
- Datos mock generados en backend mediante generate_mock_movements con seed fija en los endpoints observados.

## Testing
- Frontend: pruebas unitarias visibles para utilidades financieras en frontend/src/lib/financial-utils.test.ts.
- Backend: pruebas de endpoints y filtros en backend/tests/test_routes.py.
- Frameworks observables: vitest en frontend y pytest en backend.

## Infraestructura y tooling
- Docker Compose para levantar servicios de desarrollo.
- Puerto 5173 para frontend.
- Puerto 8000 para backend.
- Puerto 5678 expuesto para debug del backend.
- Proxy /api configurado en frontend/vite.config.ts hacia http://backend:8000.

## Dependencias clave observables
### Frontend
- react
- react-dom
- recharts
- lucide-react
- vite
- typescript
- vitest
- tailwindcss
- @vitejs/plugin-react

Fuente: frontend/package.json

### Backend
- fastapi
- uvicorn[standard]
- debugpy
- pytest
- pytest-cov
- httpx

Fuente: backend/requirements.txt

## Evidencia del repositorio
- frontend/package.json
- frontend/vite.config.ts
- frontend/src/App.tsx
- frontend/src/lib/financial-utils.ts
- frontend/src/lib/financial-utils.test.ts
- backend/app/main.py
- backend/app/routes.py
- backend/tests/test_routes.py
- backend/requirements.txt
- docker-compose.yml
