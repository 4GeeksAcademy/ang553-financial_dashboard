# context.md

## Resumen del Proyecto: Financial Dashboard

Este proyecto es un dashboard financiero que permite visualizar y analizar datos financieros clave. Está estructurado en dos grandes partes: backend y frontend, y utiliza contenedores Docker para facilitar su despliegue y desarrollo.

### 1. Backend

- Ubicación: backend/
- Lenguaje principal: Python
- Framework probable: FastAPI o Flask (por la estructura y nombres de archivos como main.py y routes.py)
- Funcionalidad: expone una API para servir datos financieros al frontend.
- Testing: incluye pruebas automatizadas en backend/tests/ usando pytest.
- Dependencias: gestionadas en requirements.txt.
- Docker: contiene un Dockerfile para facilitar la construcción del contenedor backend.

### 2. Frontend

- Ubicación: frontend/
- Lenguaje principal: TypeScript + React
- Herramienta de build: Vite (por vite.config.ts)
- Estructura de componentes: 
  - dashboard/ (componentes visuales principales del dashboard)
  - ui/ (componentes reutilizables de interfaz)
- Lógica y utilidades: en frontend/src/lib/
- Estilos: index.css
- Docker: contiene un Dockerfile para el frontend.
- Configuración y dependencias: package.json, tsconfig.json, etc.

### 3. Integración y despliegue

- docker-compose.yml: orquesta ambos servicios (backend y frontend) para desarrollo o despliegue conjunto.
- Documentación: README.md y README.es.md (en inglés y español).

### 4. Objetivo

El objetivo principal es ofrecer una plataforma visual para monitorear KPIs financieros, visualizar ingresos, egresos, y métricas de rentabilidad, facilitando la toma de decisiones basada en datos.

---
