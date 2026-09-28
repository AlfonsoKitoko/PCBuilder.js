# PCBUILDER

> **PCBUILDER** es una aplicación web pensada para ayudar a usuarios con poca o nula experiencia en el montaje de ordenadores, facilitando la creación de presupuestos personalizados y asegurando la compatibilidad de hardware en tiempo real.

---

## Características Principales

* **Configurador de Builds Guiado:** Permite al usuario seleccionar componentes de hardware de manera intuitiva.
* **Build Engine (Motor de Validación):**
  * **Compatibilidad:** Validación física y lógica (sockets de CPU/Mobo, módulos de RAM, factor de forma de caja/Mobo, puertos de vídeo y consumo energético frente a la PSU).
  * **Consumo Estimado:** Cálculo dinámico de vatios acumulados.
  * **Cálculo de Precio:** Cálculo del presupuesto total en tiempo real.
  * **Alertas Inteligentes:** Clasificación entre errores críticos (que bloquean la selección) y advertencias de rendimiento óptimo.
* **Control de Accesos por Roles (RBAC):**
  * **Invitado:** Consulta del catálogo de piezas, especificaciones y builds públicas de la comunidad.
  * **Usuario Registrado:** Gestión de builds propias (crear, editar, eliminar), vista de usuarios específicos y edición de perfil.
  * **Administrador:** CRUD completo de piezas y categorías, gestión de usuarios y asignación de roles.
* **Seguridad:** Comunicaciones encriptadas bajo el protocolo seguro **HTTPS**, autenticación basada en **JWT** y encriptación de contraseñas con **BCrypt**.

---

## Stack Tecnológico

| Capa / Ámbito | Tecnología / Herramienta |
| :--- | :--- |
| **Arquitectura General** | Stack **MEAN** (*MongoDB, Express, Angular, Node.js*) |
| **Base de Datos** | MongoDB Atlas (NoSQL) con Mongoose |
| **Backend** | Node.js + Express (JavaScript, ES Modules) |
| **Frontend** | Angular (TypeScript) - *Single Page Application (SPA)* |
| **Runtime & Gestor** | **Bun** (Velocidad optimizada de despliegue) |
| **Diseño y Estilos** | Tailwind CSS + daisyUI (Soporte modo Claro / Oscuro) |
| **Seguridad** | JWT, BCrypt, HTTPS (Certificados SSL) |
| **Documentación API** | Swagger (OpenAPI en formato YAML) |

---

## Estructura del Proyecto

El proyecto está completamente desacoplado en dos grandes directorios independientes:

```text
PcBuilder/
├── backExpress/        # Servidor Express (Arquitectura Modular Orientada a Dominios)
│   ├── src/
│   │   ├── certs/      # Credenciales y certificados SSL para HTTPS
│   │   ├── build-engine/ # Motor centralizado de compatibilidad y validación
│   │   ├── config/     # Configuraciones globales (DB, Logger, Swagger)
│   │   ├── constants/  # Diccionarios fijos de especificaciones de hardware
│   │   ├── database/   # Seeds automatizados para poblar la DB
│   │   ├── docs/       # Especificaciones de la API en Swagger
│   │   ├── middlewares/# JWT, RBAC, Morgan y controlador central de errores
│   │   ├── models/     # Esquemas de Mongoose para MongoDB Atlas
│   │   ├── modules/    # API por dominios (Routes -> Controller -> Service)
│   │   ├── routes/     # Índice unificado de rutas del backend
│   │   ├── utils/      # Respuestas estándar, AppError, BCrypt, NodeMailer
│   │   └── validators/ # Validadores de formato para datos de entrada
│   └── .env            # Variables de entorno del backend
│
└── frontAngular/       # Cliente Angular (Feature-Based Architecture)
    ├── src/app/
    │   ├── features/   # Módulos funcionales (auth, builds, cpus, etc.)
    │   └── shared/     # Infraestructura común reutilizable
    │       ├── components/  # Navbar, Footer, Toast, Modales
    │       ├── constants/   # Diccionarios de hardware sincronizados con el Back
    │       ├── guards/      # Control de rutas y permisos de usuario
    │       ├── interceptors/# Inyección automática del Token JWT en peticiones
    │       ├── models/      # Interfaces de TypeScript para tipado fuerte
    │       ├── services/    # Consumo asíncrono HTTP mediante RxJS Observables
    │       └── utils/       # Paleta de marca, mapeadores de imagen y buscador
    └── environments/   # Configuración de URLs y variables de entorno del cliente
