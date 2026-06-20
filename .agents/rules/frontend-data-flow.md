# Frontend Data Flow

## Regla 1
- Nombre: Estados de carga remota completos
- Alcance: Componentes frontend que solicitan datos al backend.
- Razon: El flujo principal del dashboard ya contempla estados de carga, error y datos cargados.
- Regla: Toda carga remota debe manejar de forma explicita loading, error y success.
- Evidencia del repositorio: frontend/src/App.tsx
- Ejemplo de aplicacion: Al agregar una nueva vista con datos remotos, crear estados dedicados para loading y error antes de renderizar resultados.
- Que evitar: Hacer fetch y renderizar directamente sin fallback de carga o sin manejo de error.

## Regla 2
- Nombre: Validacion de respuesta HTTP antes de parsear
- Alcance: Todas las llamadas fetch del frontend.
- Razon: El flujo actual valida el estado HTTP antes de leer JSON.
- Regla: Toda llamada fetch debe validar response.ok y lanzar error controlado si falla.
- Evidencia del repositorio: frontend/src/App.tsx
- Ejemplo de aplicacion: Antes de usar response.json(), verificar response.ok y construir un error que incluya status.
- Que evitar: Asumir que toda respuesta es exitosa y parsear JSON sin validacion.

## Regla 3
- Nombre: Efectos con cancelacion o cleanup
- Alcance: useEffect con operaciones asincronas de red.
- Razon: El riesgo identificado en Fase 2 es que las peticiones en efectos pueden quedar sin control al desmontar.
- Regla: Las llamadas remotas dentro de useEffect deben considerar cancelacion o cleanup cuando aplique.
- Evidencia del repositorio: frontend/src/App.tsx
- Ejemplo de aplicacion: Al implementar una nueva consulta en useEffect, incorporar AbortController o bandera de mounted para evitar updates tardios.
- Que evitar: Dejar promesas activas que actualicen estado cuando el componente ya no esta montado.

## Regla 4
- Nombre: Error amigable para usuario y contexto tecnico para diagnostico
- Alcance: Manejo de errores de red en frontend.
- Razon: El usuario necesita un mensaje claro, pero el equipo necesita contexto para depurar.
- Regla: Mostrar mensaje amigable en UI y conservar detalle tecnico para diagnostico en desarrollo.
- Evidencia del repositorio: frontend/src/App.tsx
- Ejemplo de aplicacion: En catch, setear mensaje visible para usuario y registrar detalle del error en canal tecnico controlado.
- Que evitar: Exponer trazas tecnicas al usuario final o perder por completo la causa original del error.
