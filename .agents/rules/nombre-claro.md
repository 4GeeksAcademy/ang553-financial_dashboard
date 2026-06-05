# Regla: Nombre Claro

**Alcance:** Archivos, carpetas, funciones, variables, clases, componentes y endpoints.

**Razón:** Un nombre claro facilita la comprensión del propósito y uso de cada elemento, mejora la mantenibilidad y reduce la curva de aprendizaje para nuevos colaboradores.

**Cómo aplicarla en este proyecto:**
- Los endpoints deben reflejar claramente la acción y el recurso, por ejemplo `/movements/summary`.
- Los componentes deben indicar su función, por ejemplo `KpiCard` o `IncomeOutcomeChart`.
- Las funciones deben describir la operación que realizan, por ejemplo `computeKPIs` o `formatCurrency`.

**Ejemplo:**
- ✅ `getUserById`, `IncomeOutcomeChart`, `/movements/summary` (claros)
- ❌ `gubid`, `Comp1`, `/doit` (no claros)
