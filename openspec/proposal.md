# Propuesta del Sistema: CONSORCIO SINME S.A.C.

## 1. Contexto del problema
El Consorcio SINME S.A.C. opera en un entorno logístico donde la administración del inventario, la relación con proveedores y la emisión de órdenes de compra requieren coordinación constante entre datos dispersos y procesos manuales. En la práctica, la gestión de materiales, el registro de stock y la elaboración de documentos de compra se realizaban de forma parcialmente manual, lo que dificultaba el control operativo, la trazabilidad y la toma de decisiones.

El sistema propuesto busca centralizar estas funciones en una plataforma web que permita visualizar el estado del inventario, registrar materiales, mantener un directorio de proveedores y generar órdenes de compra con información estructurada y lista para impresión. La solución implementada está orientada a cubrir las necesidades inmediatas del negocio con un enfoque funcional, escalable y orientado a la validación práctica.

## 2. Objetivo general
Desarrollar un sistema web para la gestión operativa de inventario y adquisiciones, que permita a la empresa controlar materiales, identificar alertas de stock, gestionar proveedores y generar órdenes de compra de forma más ágil, ordenada y documentada.

## 3. Objetivos específicos
- Implementar una interfaz web para consultar y administrar materiales del inventario.
- Permitir el registro de nuevos materiales con datos básicos como SKU, nombre, unidad de medida, stock mínimo y stock actual.
- Facilitar la visualización del estado de stock mediante reglas de alerta y clasificación visual.
- Mantener un directorio de proveedores con datos de contacto y acciones rápidas para comunicación.
- Generar órdenes de compra desde la selección de un proveedor y un conjunto de materiales del inventario.
- Integrar el sistema con Supabase como capa de persistencia para asegurar almacenamiento centralizado de datos.
- Establecer una base tecnológica que facilite futuras extensiones, como reportes, movimientos de entrada/salida y aprobación de compras.

## 4. Alcance funcional
### 4.1 Módulo de autenticación
- Inicio de sesión mediante correo electrónico y contraseña.
- Validación de credenciales contra la tabla de usuarios en Supabase.
- Control de acceso básico a la aplicación tras la autenticación exitosa.

### 4.2 Módulo de inventario
- Visualización de materiales en una tabla principal.
- Búsqueda por código SKU o nombre.
- Registro de nuevos materiales desde un modal interactivo.
- Clasificación automática del estado de stock según el umbral definido por el usuario.

### 4.3 Módulo de proveedores
- Directorio de proveedores con información de empresa, contacto y medios de contacto.
- Registro de nuevos proveedores desde la interfaz.
- Acciones rápidas para generar una orden de compra o contactar al proveedor.

### 4.4 Módulo de órdenes de compra
- Generación de órdenes de compra a partir de un proveedor seleccionado.
- Agregado dinámico de materiales y cantidades desde el inventario.
- Cálculo automático de subtotal, IGV y total final.
- Vista preparada para impresión en formato de documento formal.

## 5. Usuarios y roles
### 5.1 Administrador
- Acceso completo a la interfaz.
- Gestión de materiales, proveedores y órdenes de compra.
- Consulta del estado del sistema y control de operaciones críticas.

### 5.2 Operador / usuario logueado
- Acceso a las pantallas principales del sistema.
- Registro de datos básicos y visualización de información relevante.
- Uso del sistema para apoyar la operación diaria de inventario y compras.

> Nota: En la implementación actual, la lógica de permisos se basa principalmente en la sesión activa del usuario, mientras que la autorización detallada por rol aún se puede fortalecer en futuras versiones.

## 6. Requisitos funcionales
1. El sistema debe permitir iniciar sesión con credenciales válidas almacenadas en Supabase.
2. El usuario debe poder consultar una lista de materiales con su información básica.
3. El sistema debe permitir crear materiales con SKU, nombre, unidad de medida, stock mínimo y stock actual.
4. El sistema debe mostrar un estado visual de alerta cuando el stock actual es menor o igual al mínimo.
5. El usuario debe poder registrar proveedores con razón social, contacto, teléfono, correo y estado.
6. El sistema debe permitir generar una orden de compra asociada a un proveedor seleccionado.
7. El usuario debe poder agregar materiales a la orden de compra con cantidad y precio unitario.
8. El sistema debe calcular automáticamente el subtotal, IGV y total a pagar.
9. El sistema debe ofrecer una vista compatible con impresión para generar un documento formal.

## 7. Requisitos no funcionales
- La solución debe ejecutarse como una aplicación web de una sola página (SPA).
- La interfaz debe ofrecer una experiencia clara, responsiva y orientada a operaciones frecuentes.
- La persistencia de datos debe estar basada en Supabase para garantizar acceso remoto y estructura de base de datos relacional.
- La aplicación debe ser mantenible y modular, separando lógica de interfaz, servicios y utilidades.
- El sistema debe incluir pruebas unitarias para la lógica principal de negocio relacionada con stock.
- La aplicación debe poder desplegarse de forma sencilla mediante Vite y GitHub Pages.

## 8. Procesos de negocio soportados
### 8.1 Proceso de autenticación
El usuario ingresa correo y contraseña. El sistema consulta la tabla de usuarios y valida la existencia del correo, coincidencia de contraseña, y estado activo del registro antes de iniciar sesión.

### 8.2 Proceso de registro de inventario
El operador registra un nuevo material con su información básica. El sistema envía el registro al backend de Supabase y recarga la tabla de inventario para que el cambio sea visible inmediatamente.

### 8.3 Proceso de gestión de proveedores
El usuario registra un proveedor y este queda disponible dentro del directorio para futuras operaciones de compra o contacto.

### 8.4 Proceso de generación de órdenes de compra
El usuario selecciona un proveedor, agrega materiales del inventario, define cantidades y precios unitarios y genera una orden con totales calculados automáticamente.

## 9. Arquitectura de alto nivel
La solución está organizada en un frontend React que consume directamente a Supabase mediante un cliente configurado con variables de entorno. La lógica de negocio se concentra en componentes de página y utilidades independientes, lo que facilita su mantenimiento y futura evolución hacia servicios más robustos.

## 10. Valor esperado del sistema
El sistema aporta valor al reducir la dependencia de procesos manuales, mejorar la trazabilidad de inventario y facilitar la gestión de compras mediante una herramienta accesible para el equipo operativo. Además, sirve como base tecnológica para futuras funcionalidades como reportes, control de movimientos y aprobación de órdenes.

## 11. Criterios de aceptación
- El usuario puede autenticarse correctamente.
- El inventario refleja los materiales registrados en la base de datos.
- El sistema identifica alertas de stock de forma automática.
- El usuario puede registrar proveedores y generar órdenes de compra.
- La información puede visualizarse y usarse en contexto de operación diaria.
- La solución puede ejecutarse localmente y desplegarse de forma sencilla.