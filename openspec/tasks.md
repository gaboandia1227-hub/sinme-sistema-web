# Plan de Implementación y Estado del Proyecto

## 1. Fase de configuración inicial
- [x] Crear el repositorio base con Vite y React.
- [x] Instalar y configurar las dependencias principales del proyecto.
- [x] Definir la estructura inicial de carpetas para páginas, utilidades y recursos visuales.
- [x] Configurar la integración con Supabase mediante variables de entorno.
- [x] Establecer la identidad visual corporativa con colores azul oscuro y dorado.
- [x] Preparar la estructura de documentación OpenSpec.

## 2. Fase de interfaz y navegación
- [x] Implementar el layout principal con barra lateral, encabezado y área de contenido.
- [x] Integrar navegación entre las pantallas principales con React Router.
- [x] Diseñar una vista de bienvenida para el usuario autenticado.
- [x] Incorporar componentes visuales consistentes para tablas, formularios y modales.

## 3. Fase de autenticación
- [x] Desarrollar la pantalla de login.
- [x] Implementar validación de correo, contraseña y estado activo del usuario.
- [x] Conectar la autenticación con la tabla usuarios de Supabase.
- [x] Gestionar la sesión activa desde el estado de la aplicación.

## 4. Fase de inventario
- [x] Desarrollar la vista de inventario.
- [x] Consultar materiales desde Supabase.
- [x] Implementar la creación de nuevos materiales desde un modal.
- [x] Añadir búsqueda por SKU o nombre.
- [x] Implementar la lógica de estado de stock con alertas visuales.
- [x] Crear pruebas unitarias para la lógica de stock.

## 5. Fase de proveedores
- [x] Desarrollar la vista de proveedores.
- [x] Implementar un directorio con datos de contacto y estado.
- [x] Permitir el registro de nuevos proveedores desde la interfaz.
- [x] Habilitar la navegación hacia la generación de órdenes de compra desde un proveedor seleccionado.

## 6. Fase de órdenes de compra
- [x] Implementar la vista de generación de órdenes de compra.
- [x] Permitir agregar materiales y cantidades al detalle del pedido.
- [x] Calcular subtotal, IGV y total final de forma automática.
- [x] Preparar la vista para impresión del documento formal.
- [x] Mostrar los datos del proveedor en el cuerpo del documento.

## 7. Fase de calidad y validación
- [x] Ejecutar pruebas unitarias del módulo de stock.
- [x] Validar que la aplicación pueda ejecutarse en modo desarrollo.
- [ ] Revisar y normalizar la estructura de datos de proveedores para que sea consistente entre las vistas de proveedores y órdenes de compra.
- [ ] Fortalecer la seguridad de autenticación con mecanismos más robustos de sesiones y cifrado.
- [ ] Ampliar el modelo de datos para registrar órdenes de compra, detalle de ítems y movimientos de inventario de forma persistente.
- [ ] Incorporar reportes y dashboards más completos para análisis de stock y compras.

## 8. Estado general del proyecto
El proyecto se encuentra en una etapa funcional intermedia: ya permite realizar operaciones esenciales de inventario, proveedores y órdenes de compra desde una interfaz web. La base tecnológica está consolidada y la arquitectura actual es suficiente para demostrar el funcionamiento del sistema, aunque aún existe espacio para mejorar la robustez del modelo de datos y la gestión de permisos.

## 9. Evidencias de implementación verificables
- La aplicación cuenta con rutas para Login, Inventario, Proveedores y Órdenes de Compra.
- El inventario se carga dinámicamente desde Supabase.
- La lógica de alerta de stock está cubierta por pruebas automatizadas.
- El flujo de órdenes de compra está integrado con el catálogo de materiales del inventario.
- El sistema está preparado para una entrega universitaria con alcance funcional real y documentación técnica asociada.