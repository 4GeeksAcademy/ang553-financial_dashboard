# Handover inicial del proyecto

## 1. Objetivo de la Fase 1
Esta fase busca comprender como esta organizado el repositorio, validar el resumen generado por IA y documentar evidencia real del codigo.

El objetivo no es cambiar funcionalidades, sino entender el estado actual del proyecto con base en archivos existentes.

## 2. Mapa simple del repositorio
Mapa rapido de ubicacion de archivos importantes:

- `README.md`
- `README.es.md`
- `docker-compose.yml`
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/mock-data.ts`
- `backend/requirements.txt`
- `backend/app/main.py`
- `backend/app/routes.py`
- `backend/tests/test_routes.py`

## 3. Separacion entre frontend y backend
- Frontend: todo lo que esta dentro de `frontend/`. Aqui vive la interfaz del dashboard (pantalla, componentes, estilos y utilidades para mostrar datos).
- Backend: todo lo que esta dentro de `backend/`. Aqui vive la API de metricas y la logica de generacion/filtrado de datos que consume el frontend.

## 4. Archivos clave revisados
- `frontend/src/App.tsx`: pantalla principal del dashboard; carga datos desde la API y compone tarjetas y graficas.
- `backend/app/routes.py`: define modelos, funciones de calculo/filtrado y endpoints de metricas.
- `frontend/vite.config.ts`: configura Vite y el proxy de `/api` hacia el servicio backend.
- `docker-compose.yml`: define y levanta los servicios `frontend` y `backend` con puertos y volumenes.
- `frontend/src/lib/financial-utils.ts`: contiene funciones para calcular KPIs, datos mensuales y formateos.
- `frontend/src/lib/mock-data.ts`: contiene dataset mock local de movimientos financieros para referencia/pruebas.

## 5. Flujo principal de la aplicacion
1. El frontend inicia en `frontend/src/main.tsx`.
2. La pantalla principal se carga en `frontend/src/App.tsx`.
3. `App.tsx` hace una peticion a `/api/metrics`.
4. `frontend/vite.config.ts` configura el proxy de `/api` hacia el backend.
5. `backend/app/routes.py` responde con endpoints de metricas.
6. El frontend usa `financial-utils.ts` para calcular KPIs y datos mensuales.
7. El dashboard muestra tarjetas y graficas.

## 6. Validaciones realizadas
- Se confirmo que `App.tsx` usa `fetch` para pedir datos a `/api/metrics`.
- Se confirmo que `routes.py` contiene endpoints relacionados con metricas.
- Se confirmo que `vite.config.ts` contiene configuracion de proxy para `/api`.
- Se confirmo que `docker-compose.yml` levanta dos servicios: frontend y backend.
- Se confirmo que `financial-utils.ts` contiene funciones de calculo como KPIs y datos mensuales.
- Se confirmo que `mock-data.ts` existe, pero el flujo principal observado usa la API desde `App.tsx`.

## 7. Partes pendientes de validar
- Confirmar si los endpoints avanzados del backend se usan en la UI actual o son para uso futuro.
- Confirmar si el archivo `.env.example` deberia existir, ya que el README lo menciona.
- Confirmar si la configuracion CORS abierta es solo para entorno academico/desarrollo.

## 8. Conclusion breve
El proyecto es un dashboard financiero con frontend React/TypeScript y backend FastAPI.

El frontend y backend se conectan mediante rutas `/api` (proxy en Vite) y ambos servicios se levantan con Docker Compose.
