# Diseño del Sistema

## 1. Objetivo del diseño
El diseño del sistema busca reflejar la arquitectura real implementada en la aplicación web actual: una interfaz React para operaciones de gestión, un cliente de Supabase para persistencia y una estructura modular que permite escalar el proyecto sin romper el flujo de uso.

## 2. Stack tecnológico implementado
- Frontend: React 19 con Vite 8.
- Enrutamiento: React Router DOM.
- Estilos: Tailwind CSS con clases utilitarias.
- Iconografía: lucide-react.
- Base de datos: Supabase (PostgreSQL como motor de persistencia).
- Pruebas: Vitest + Testing Library.
- Despliegue: Vite + GitHub Pages mediante scripts de build y deploy.

## 3. Arquitectura general
La aplicación sigue un modelo de frontend orientado a vistas, con componentes de página que encapsulan la lógica principal y utilizan un único cliente de Supabase para interactuar con la base de datos.

### 3.1 Separación de responsabilidades
- Componentes de interfaz: gestionan la presentación visual y los formularios.
- Páginas principales: contienen la lógica de negocio específica de cada módulo.
- Utilidades: centralizan funciones de soporte, como la lógica de estado de stock.
- Configuración de acceso a datos: define y exporta el cliente de Supabase.

### 3.2 Flujo de ejecución
1. El usuario inicia sesión desde la pantalla de Login.
2. La aplicación carga la vista principal con barra lateral y encabezado.
3. El usuario navega hacia Inventario, Proveedores u Órdenes de Compra.
4. Cada vista consulta o modifica datos en Supabase según la operación requerida.
5. Los cambios se reflejan en la interfaz de forma inmediata tras recargar o actualizar el estado local.

## 4. Estructura del proyecto
- src/App.jsx: define la navegación principal y el layout general.
- src/main.jsx: punto de entrada de React.
- src/supabase.js: configuración del cliente de Supabase.
- src/pages/Login.jsx: pantalla de autenticación.
- src/pages/Inventario.jsx: gestión del inventario.
- src/pages/Proveedores.jsx: directorio de proveedores.
- src/pages/OrdenesCompra.jsx: generación y visualización de órdenes de compra.
- src/utils/stockLogic.js: lógica de evaluación del estado de stock.
- src/utils/__tests__/stockLogic.test.js: pruebas unitarias de la lógica de alertas.

## 5. Diseño de la interfaz de usuario
La interfaz utiliza una paleta corporativa basada en azul oscuro y dorado para diferenciar la navegación principal de las acciones de alto impacto. Se emplea una estructura de paneles con tarjetas y tablas para presentar información de forma clara y ordenada.

### 5.1 Principios visuales aplicados
- Jerarquía visual definida por encabezados y secciones bien delimitadas.
- Uso de botones de acción en color dorado para resaltar tareas críticas.
- Uso de estados visuales para alertas: rojo para reabastecimiento, verde para stock óptimo.
- Diseño orientado a operaciones frecuentes y carga mínima de información.

## 6. Diseño de datos y persistencia
La aplicación usa Supabase como capa de almacenamiento. La implementación actual se apoya en tablas con nombres en minúsculas, tal como se consumen desde el cliente, y se accede a ellas mediante operaciones básicas de select e insert.

### 6.1 Entidades principales
#### Usuarios
- Utilizada en la pantalla de login.
- Campos relevantes: email, password_hash, nombre_completo, rol, activo.
- Propósito: autenticar al usuario y determinar si puede acceder a la aplicación.

#### Materiales
- Utilizada en la vista de inventario y en la generación de órdenes de compra.
- Campos relevantes: id_material, codigo_sku, nombre, unidad_medida, stock_minimo, stock_actual.
- Propósito: registrar el catálogo de materiales y sus niveles de stock.

#### Proveedores
- Utilizada en el directorio de proveedores.
- Campos relevantes: razon, contacto, tel, email, estado.
- Propósito: centralizar información de contacto y habilitar la creación de órdenes de compra.

#### Órdenes de compra
- La vista de órdenes de compra construye el documento de forma dinámica en memoria.
- No se persiste aún como registro formal en Supabase en la implementación actual.
- Propósito: generar un documento de compra con detalle de ítems, subtotales y totales.

## 7. Manejo de autenticación
El flujo de login se implementa en la vista Login.jsx. El proceso consiste en:
1. Capturar correo y contraseña.
2. Normalizar los valores ingresados.
3. Consultar la tabla usuarios en Supabase mediante filtro case-insensitive.
4. Validar existencia del correo, coincidencia de contraseña y estado activo.
5. Almacenar el usuario como sesión activa en el estado local del componente App.jsx.

Esta solución es funcional para un prototipo y permite demostrar el flujo completo de acceso, aunque todavía puede mejorarse con mecanismos más seguros de hash y manejo de sesiones.

## 8. Lógica funcional del inventario
La vista de inventario presenta una tabla de materiales y un modal de creación. La lógica incluye:
- Carga inicial de materiales desde Supabase.
- Búsqueda en tiempo real por SKU o nombre.
- Inserción de nuevos materiales a través de Supabase.
- Evaluación del estado de stock mediante la función verificarEstadoStock.

La función de alerta se utiliza para clasificar los materiales como:
- Agotado: cuando stock_actual = 0.
- Reabastecer: cuando stock_actual <= stock_minimo.
- Optimo: en cualquier otro caso.

## 9. Diseño del flujo de órdenes de compra
El flujo de órdenes de compra está estructurado en dos etapas:
1. Selección del proveedor desde el directorio de proveedores.
2. Composición de la orden con materiales, cantidades y precios unitarios.

Los datos del pedido se mantienen en el estado local del componente de órdenes de compra y se calculan de forma reactiva. La vista incluye un bloque de documento formal con totales y una opción de impresión del navegador.

## 10. Consideraciones de diseño para escalabilidad
- El proyecto puede evolucionar hacia un modelo con servicios dedicados para cada módulo.
- La lógica de UI podría extraerse a componentes reutilizables.
- La persistencia podría ampliarse para registrar órdenes, detalles y movimientos de inventario de manera formal.
- La autenticación puede reforzarse con sesiones seguras, control por permisos y cifrado de contraseñas.

## 11. Estrategia de pruebas
La capa de pruebas actual está enfocada en la lógica de negocio del inventario. Los tests verifican que la clasificación del estado de stock sea consistente para los casos límite de cero, igualdad y exceso respecto al mínimo.

## 12. Decisiones de diseño clave
- Se priorizó una implementación simple, visual y funcional sobre una arquitectura excesivamente compleja.
- Se eligió Supabase por su facilidad de integración con React y su enfoque de base de datos en la nube.
- Se optó por un diseño orientado a pantallas claras y acciones directas para usuarios no técnicos.
- Se implementó un enfoque incremental, con módulos que pueden extenderse sin reescribir la arquitectura base.