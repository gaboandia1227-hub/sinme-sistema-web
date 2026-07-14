# Diseño del Sistema

## 1. Stack Tecnológico
- **Frontend:** React + Vite + Tailwind CSS.
- **Backend / Base de Datos:** Supabase (PostgreSQL).
- **Identidad Visual:** 
  - Azul Oscuro: `#0A2E50` (Estructura y navegación).
  - Dorado: `#C59B63` (Botones y acciones principales).

## 2. Modelo de Datos (PostgreSQL)
El modelo relacional implementa las siguientes tablas principales con integridad referencial:
- `ROLES` y `USUARIOS` (Control de accesos y auditoría).
- `MATERIALES` y `MOVIMIENTOS_INVENTARIO` (Trazabilidad transaccional).
- `PROVEEDORES` (Directorio).
- `SOLICITUDES_COTIZACION` (Almacenamiento de cotizaciones externas en formato JSONB).
- `ORDENES_COMPRA` y `DETALLE_ORDEN_COMPRA` (Generación formal de documentos de adquisición).