# Ejercicios — Power BI

## Ejercicio 1: Conectar y modelar datos
1. Descarga un dataset de ejemplo (ventas, finanzas o logística)
2. Conéctalo a Power BI Desktop
3. Limpia los datos con Power Query
4. Crea relaciones entre tablas

## Ejercicio 2: Dashboard de ventas
Crea un dashboard que muestre:
- Ventas totales (tarjeta KPI)
- Ventas por mes (gráfico de líneas)
- Ventas por categoría (barras apiladas)
- Top 10 productos (tabla)
- Mapa con ventas por región

## Ejercicio 3: DAX práctico
Crea estas medidas:
- `Ventas YTD = TOTALYTD(SUM(Ventas[Monto]), Calendario[Fecha])`
- `Margen Bruto = DIVIDE(SUM(Ventas[Utilidad]), SUM(Ventas[Monto]))`
- `Crecimiento vs Mes Anterior` (con CALCULATE y DATEADD)

## Ejercicio 4: Publicar y compartir
1. Publica tu dashboard en Power BI Service
2. Crea un dashboard compartido
3. Programa una actualización diaria de datos

## Ejercicio 5: Analítica con IA
Usa eyes-cli para analizar tu dashboard:
```bash
eyes "output/dashboard-ventas.png" "Analiza este dashboard de ventas y dame 3 recomendaciones para mejorarlo"
```

## Checklist de aprendizaje
- [ ] Puedo conectar Power BI a Excel, SQL y web
- [ ] Sé limpiar datos con Power Query
- [ ] Entiendo y uso DAX básico
- [ ] Puedo crear dashboards interactivos
- [ ] Sé publicar y compartir reportes
