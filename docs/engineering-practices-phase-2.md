# Fase 2 — Analisis de practicas de ingenieria

## 1. Objetivo
Esta fase busca identificar buenas practicas, riesgos potenciales y reglas propuestas para mantener el repositorio de forma mas segura, mantenible y facil de evolucionar.

El foco principal esta en frontend, usando backend, Docker y configuracion solo cuando aportan contexto directo al hallazgo.

## 2. Criterio de analisis
Los hallazgos de este documento se basan en evidencia observada en archivos reales del repositorio.

No se incluyen suposiciones ni conclusiones genericas sin respaldo en codigo.

## 3. Buenas practicas identificadas

| Categoria | Buena practica | Archivo(s) | Evidencia observada | Por que importa | Regla propuesta |
|---|---|---|---|---|---|
| Frontend | Manejo de loading, error y success en la pantalla principal | `frontend/src/App.tsx` | Se observan estados `loading`, `error`, `metrics` y `monthlyData`; se actualizan en `useEffect` con `catch` y `finally` antes de renderizar KPIs y graficas. | Mejora la experiencia de usuario y evita comportamientos ambiguos durante la carga de datos. | Toda carga remota debe manejar explicitamente estados de loading, error y success. |
| Frontend | Validacion de `response.ok` antes de leer JSON | `frontend/src/App.tsx` | En `fetchFinancialData`, se valida `response.ok` y se lanza error cuando la respuesta HTTP no es exitosa, antes de `response.json()`. | Reduce fallos silenciosos y permite controlar errores HTTP de forma consistente. | Toda llamada `fetch` debe validar `response.ok` antes de procesar la respuesta. |
| Arquitectura | Calculos financieros separados de la UI | `frontend/src/lib/financial-utils.ts`, `frontend/src/App.tsx` | `computeKPIs` y `computeMonthlyData` estan en utilidades; `App.tsx` los invoca al recibir movimientos desde API. | Facilita mantenimiento, pruebas y reutilizacion de logica de negocio. | Los calculos financieros deben vivir fuera de componentes visuales. |
| Testing | Pruebas unitarias para utilidades financieras | `frontend/src/lib/financial-utils.test.ts` | Hay pruebas para `computeKPIs`, `computeMonthlyData`, `formatCurrency` y `formatPercent`, incluyendo casos de borde como ingresos en cero. | Protege calculos criticos ante regresiones y da confianza al refactorizar utilidades. | Toda utilidad financiera critica debe tener pruebas unitarias con casos normales y borde. |
| Frontend | Componentes reutilizables con props tipadas | `frontend/src/components/dashboard/kpi-row.tsx`, `frontend/src/components/dashboard/kpi-card.tsx` | Se definen interfaces de props (`KPIRowProps`, `KPICardProps`) y variantes tipadas (`income`, `outcome`, `profit`, `profitPercent`). | Mejora legibilidad, reduce errores de integracion y hace mas seguro el reuso de componentes. | Todo componente reusable del dashboard debe exponer props tipadas y contrato claro de uso. |

## 4. Riesgos o areas de mejora

| Categoria | Riesgo o area de mejora | Archivo(s) | Evidencia observada | Por que importa | Regla propuesta |
|---|---|---|---|---|---|
| Frontend | Riesgo potencial: fetch en `useEffect` sin cancelacion explicita | `frontend/src/App.tsx` | Se observa llamada a `fetchFinancialData()` dentro de `useEffect`, pero no se ve `AbortController` ni funcion de cleanup. | Puede generar actualizaciones tardias si cambia el ciclo de vida del componente o si hay multiples montajes en desarrollo. | Toda llamada remota en `useEffect` debe contemplar cancelacion o cleanup cuando aplique. |
| Frontend | Riesgo potencial: mensaje de error generico sin detalle tecnico | `frontend/src/App.tsx` | En `catch`, se setea un mensaje fijo para UI y no se conserva el error original para diagnostico tecnico visible. | Dificulta depuracion de incidentes en desarrollo y soporte. | Los errores de red deben mostrar mensaje amigable y conservar detalle tecnico para diagnostico (por ejemplo, logging controlado). |
| Datos | Riesgo potencial: locale y moneda fijos | `frontend/src/lib/financial-utils.ts` | `toLocaleDateString("en-US")` y `Intl.NumberFormat` con moneda `USD` estan hardcodeados. | Puede limitar internacionalizacion o generar formatos no deseados en otros contextos de negocio. | Locale y moneda deben ser configurables por entorno o por configuracion central. |
| Datos / Frontend | Riesgo potencial: existencia de datos mock fuera del flujo principal observado | `frontend/src/lib/mock-data.ts`, `frontend/src/App.tsx` | Existe `mockMovements` en `mock-data.ts`, pero en `App.tsx` el flujo principal consume `/api/metrics`. | Puede confundir a contribuidores sobre la fuente real de datos del dashboard. | Todo archivo de datos mock debe documentar su uso y su relacion con el flujo principal. |
| Testing | Riesgo potencial: no se observan pruebas visibles para componentes del dashboard | `frontend/src/components/dashboard/kpi-card.tsx`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx`, `frontend/src/lib/financial-utils.test.ts` | Se observan pruebas en utilidades (`financial-utils.test.ts`), pero no se observan archivos de prueba visibles para esos componentes de UI. | Cambios en renderizado, estados de loading o empty state pueden romper UI sin deteccion automatica temprana. | Los componentes criticos del dashboard deben tener pruebas de renderizado para estados principales. |

## 5. Reglas propuestas iniciales
- Toda carga remota debe manejar loading, error y success.
- Toda llamada `fetch` debe validar `response.ok` antes de leer JSON.
- Los calculos financieros deben vivir fuera de componentes visuales.
- Toda utilidad financiera debe tener pruebas unitarias.
- Los componentes criticos del dashboard deben tener pruebas de renderizado.
- Los datos mock deben estar documentados si no forman parte del flujo principal.
- Las llamadas remotas en `useEffect` deben considerar cancelacion o cleanup cuando aplique.
- Los errores deben conservar contexto tecnico para diagnostico en desarrollo.
- Locale y moneda deben ser configurables cuando el alcance del producto lo requiera.

## 6. Conclusion
El frontend muestra una base mantenible: separa logica de calculo, valida respuestas HTTP y tiene pruebas unitarias en utilidades financieras.

Tambien existen riesgos potenciales razonables para iteraciones futuras: cobertura de pruebas de UI, manejo de errores con mayor trazabilidad tecnica, configuraciones fijas de formato y claridad sobre el rol de `mock-data.ts` frente al flujo principal basado en API.

Este analisis no afirma errores absolutos; identifica puntos de mejora priorizables segun el contexto del proyecto y su evolucion.
