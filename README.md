# PCBUILDER

> Plataforma web para la configuración guiada de presupuestos de hardware y validación de compatibilidad de componentes en tiempo real.

---

## Tabla de Contenidos

* [Descripción General](https://www.google.com/search?q=%23descripci%C3%B3n-general&utm_source=gemini)
* [Características Principales](https://www.google.com/search?q=%23caracter%C3%ADsticas-principales&utm_source=gemini)
* [Stack Tecnológico](https://www.google.com/search?q=%23stack-tecnol%C3%B3gico&utm_source=gemini)
* [Arquitectura del Sistema](https://www.google.com/search?q=%23arquitectura-del-sistema&utm_source=gemini)
* [Estructura del Repositorio](https://www.google.com/search?q=%23estructura-del-repositorio&utm_source=gemini)
* [Diseño del Backend](https://www.google.com/search?q=%23dise%C3%B1o-del-backend&utm_source=gemini)
* [Diseño del Frontend](https://www.google.com/search?q=%23dise%C3%B1o-del-frontend&utm_source=gemini)


* [Build Engine (Motor de Validación)](https://www.google.com/search?q=%23build-engine-motor-de-validaci%C3%B3n&utm_source=gemini)
* [Control de Accesos y Seguridad](https://www.google.com/search?q=%23control-de-accesos-y-seguridad&utm_source=gemini)
* [Guía de Instalación y Despliegue Local](https://www.google.com/search?q=%23gu%C3%ADa-de-instalaci%C3%B3n-y-despliegue-local&utm_source=gemini)
* [Requisitos Previos](https://www.google.com/search?q=%23requisitos-previos&utm_source=gemini)
* [Variables de Entorno](https://www.google.com/search?q=%23variables-de-entorno&utm_source=gemini)
* [Instalación y Población de Datos](https://www.google.com/search?q=%23instalaci%C3%B3n-y-poblaci%C3%B3n-de-datos&utm_source=gemini)
* [Ejecución en Entorno de Desarrollo](https://www.google.com/search?q=%23ejecuci%C3%B3n-en-entorno-de-desarrollo&utm_source=gemini)


* [Líneas de Evolución Futura](https://www.google.com/search?q=%23l%C3%ADneas-de-evoluci%C3%B3n-futura&utm_source=gemini)
* [Acerca del Proyecto](https://www.google.com/search?q=%23acerca-del-proyecto&utm_source=gemini)
* [Licencia](https://www.google.com/search?q=%23licencia&utm_source=gemini)
* [Licencias de Terceros y Créditos](https://www.google.com/search?q=%23licencias-de-terceros-y-cr%C3%A9ditos&utm_source=gemini)
* [Contribuciones](https://www.google.com/search?q=%23contribuciones&utm_source=gemini)
* [Contacto y Entrega](https://www.google.com/search?q=%23contacto-y-entrega&utm_source=gemini)

---

## Descripción General

**PCBUILDER** es una solución web orientada a eliminar las barreras técnicas en el proceso de selección y ensamblaje de ordenadores personales. La plataforma permite a usuarios de diversos niveles técnicos estructurar presupuestos personalizados garantizando la viabilidad física, eléctrica y lógica de la configuración mediante un motor de reglas desacoplado.

El proyecto está diseñado bajo una arquitectura de sistemas distribuidos cliente-servidor completamente desacoplada, utilizando el stack **MEAN** (*MongoDB, Express, Angular, Node.js*) gestionado mediante el entorno de ejecución de alto rendimiento **Bun**.

---

## Características Principales

* **Configurador Asistido de Hardware:** Interfaz interactiva para la composición paso a paso de configuraciones de PC.
* **Motor de Validación Dinámico (Build Engine):** Verificación síncrona de reglas de compatibilidad de hardware sin recarga de página.
* **Cálculo de Consumo y Costes:** Estimación automática del consumo energético en vatios y cómputo acumulado del presupuesto.
* **Sistema de Alertas Inteligente:** Clasificación entre incoherencias críticas (bloqueantes) y advertencias de optimización de rendimiento.
* **Gestión Avanzada de Roles (RBAC):** Definición de permisos granulares para perfiles de Invitado, Usuario Autenticado y Administrador.
* **Comunicación Cifrada:** Uso de protocolo HTTPS nativo en desarrollo y producción mediante certificados SSL autofirmados.

---

## Stack Tecnológico

| Capa / Dominio | Tecnología / Herramienta | Función Técnica |
| --- | --- | --- |
| **Base de Datos** | MongoDB Atlas / Mongoose | Almacenamiento NoSQL con esquemas flexibles orientados a documentos. |
| **Servidor REST** | Node.js / Express.js | API RESTful desacoplada basada en arquitectura modular. |
| **Cliente Web** | Angular | *Single Page Application* (SPA) reactiva con arquitectura basada en características. |
| **Runtime & Package Manager** | Bun | Entorno de ejecución e instalación de dependencias de alta velocidad. |
| **Diseño y UI** | Tailwind CSS / daisyUI | Sistema de diseño adaptativo con soporte para temas Claro y Oscuro. |
| **Seguridad & Auth** | JWT / BCrypt / HTTPS | Autenticación basada en tokens, encriptación de contraseñas y tráfico cifrado. |
| **Documentación API** | Swagger (OpenAPI 3.0) | Especificación y documentación interactiva de endpoints en formato YAML. |

---

## Arquitectura del Sistema

### Estructura del Repositorio

El repositorio se organiza en dos grandes módulos independientes:

```text
PcBuilder/
├── backExpress/        # Servidor REST Express (Arquitectura Modular por Dominios)
│   ├── src/
│   │   ├── certs/      # Credenciales y certificados SSL para entorno HTTPS
│   │   ├── build-engine/ # Núcleo lógico de validación de compatibilidad
│   │   ├── config/     # Configuraciones globales (Conexión DB, Loggers, Swagger)
│   │   ├── constants/  # Especificaciones técnicas fijas del dominio de hardware
│   │   ├── database/   # Scripts de población automatizada (Seeds)
│   │   ├── docs/       # Especificación de la API en formato YAML (Swagger)
│   │   ├── middlewares/# Gestión de JWT, permisos RBAC, Morgan y captura de errores
│   │   ├── models/     # Modelos y esquemas de Mongoose
│   │   ├── modules/    # API organizada por dominios (Routes -> Controller -> Service)
│   │   ├── routes/     # Enrutador centralizado del servidor
│   │   ├── utils/      # Respuestas estandarizadas, controladores de error y correo
│   │   └── validators/ # Middleware de validación de formato para peticiones
│   └── .env            # Variables de entorno confidenciales
│
└── frontAngular/       # Cliente Web Angular (Feature-Based Architecture)
    ├── src/app/
    │   ├── features/   # Módulos funcionales aislados (autenticación, catálogo, builds)
    │   └── shared/     # Infraestructura común reutilizable
    │       ├── components/  # Componentes transversales UI (Navbar, Footer, Modales)
    │       ├── constants/   # Constantes sincronizadas con el dominio del backend
    │       ├── guards/      # Protección de rutas por estado de sesión y rol
    │       ├── interceptors/# Inyección de cabeceras HTTP y tokens JWT
    │       ├── models/      # Interfaces TypeScript para tipado estricto
    │       ├── services/    # Comunicación asíncrona mediante RxJS Observables
    │       └── utils/       # Utilidades globales (mapeo de medios, buscadores)
    └── environments/   # Configuración de entornos de despliegue

```

### Diseño del Backend

El servidor backend implementa una **Arquitectura Modular Orientada a Dominios**. Cada entidad de negocio (procesadores, placas base, memoria RAM, etc.) se encuentra encapsulada dentro de su propio módulo en la carpeta `modules/`, aplicando el patrón **Routes ➔ Controller ➔ Service**:

1. **Routes:** Captura las peticiones HTTP y aplica los middlewares de autenticación y validación.
2. **Controller:** Gestiona el flujo de entrada/salida y captura excepciones.
3. **Service:** Concentra la lógica de negocio pura e interacciona con los modelos de Mongoose.

### Diseño del Frontend

El cliente Angular se organiza bajo una **Arquitectura Basada en Características (*Feature-Based Architecture*)**. Las vistas principales se encapsulan en `features/`, permitiendo el uso de *Lazy Loading* para optimizar el tiempo de carga inicial. La carpeta `shared/` actúa como núcleo de infraestructura compartida, centralizando interceptores HTTP, guards de seguridad y servicios de comunicación asíncrona basados en **RxJS Observables**.

---

## Build Engine (Motor de Validación)

El núcleo técnico de la aplicación es el **Build Engine**, un motor de validación desacoplado de los frameworks web que evalúa tres ámbitos críticos:

1. **Motor de Compatibilidad Lógica y Física:**
* Coincidencia de *sockets* entre procesador (CPU) y placa base (*motherboard*).
* Verificación de tipo, estándar y disposición de módulos de memoria RAM.
* Correspondencia de factores de forma entre chasis y placa base.
* Coincidencia y disponibilidad de puertos de salida de vídeo (CPU/GPU/Mobo).


2. **Motor de Consumo Energético:** Cómputo dinámico del consumo térmico y eléctrico (TDP) frente al suministro nominal de la fuente de alimentación (PSU).
3. **Motor de Cómputo Económico:** Cálculo en tiempo real del coste total de la configuración.

El motor retorna un objeto estructurado clasificando las inconsistencias en **Errores** (impiden el guardado de la build) y **Advertencias** (sugerencias de optimización técnica).

---

## Control de Accesos y Seguridad

El sistema implementa un modelo de **Control de Acceso Basado en Roles (RBAC)** integrado con tokens **JWT (JSON Web Tokens)**:

* **Invitado:** Acceso de lectura al catálogo de componentes, especificaciones técnicas y configuraciones públicas creadas por la comunidad.
* **Usuario Autenticado:** Permisos para la creación, edición, eliminación y gestión de configuraciones propias, así como la actualización del perfil personal.
* **Administrador:** Privilegios globales para la gestión del catálogo de hardware (CRUD de piezas y categorías), gestión de usuarios y asignación de roles.

La capa de transporte está protegida mediante cifrado **HTTPS** con certificados SSL, y las contraseñas de los usuarios se almacenan cifradas mediante el algoritmo **BCrypt**.

---

## Guía de Instalación y Despliegue Local

### Requisitos Previos

* **Bun** (v1.0+) o **Node.js** (v18+).
* Instancia activa de **MongoDB Atlas** o servidor local de MongoDB.
* CLI de Angular instalado globalmente (`npm install -g @angular/cli`).

### Variables de Entorno

Crear un archivo `.env` dentro del directorio `backExpress/` con los siguientes parámetros:

```env
PORT=3010
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/pcbuilder
JWT_SECRET=clave_secreta_para_firmar_tokens_jwt
NODE_ENV=development

```

### Instalación y Población de Datos

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/PCBUILDER.git
cd PCBUILDER

```


2. **Instalar dependencias del Backend:**
```bash
cd backExpress
bun install

```


3. **Instalar dependencias del Frontend:**
```bash
cd ../frontAngular
bun install

```


4. **Ejecutar el proceso de siembra (Seeds):**
Para poblar la base de datos vacía con componentes reales, usuarios de prueba y configuraciones de muestra, ejecutar desde `backExpress/`:
```bash
bun run seed

```



### Ejecución en Entorno de Desarrollo

1. **Iniciar el servidor Backend:**
```bash
cd backExpress
bun run dev
# Servidor activo en https://localhost:3010

```


2. **Iniciar el cliente Frontend:**
```bash
cd frontAngular
ng serve --ssl
# Cliente activo en https://localhost:4201

```



> **Advertencia de Certificado SSL:** Al utilizar certificados SSL autofirmados en entorno de desarrollo, es necesario abrir en el navegador tanto la URL del backend (`https://localhost:3010/api/v1`) como la del frontend (`https://localhost:4201`) y confirmar la excepción de seguridad para permitir la comunicación HTTPS sin bloqueos por contenido mixto.

---

## Líneas de Evolución Futura

* **Integración con APIs Comercializadoras:** Conexión asíncrona con distribuidores para la actualización de precios y disponibilidad de stock en tiempo real.
* **Internacionalización (i18n):** Implementación de soporte multiidioma (español / inglés) en el cliente Angular.
* **Ampliación del Build Engine:** Incorporación de comprobación de tolerancias físicas (longitud de GPU, altura de disipadores) y generación de diagramas visuales de conexión.

---

## Acerca del Proyecto

PCBUILDER nace como un Proyecto Final de Ciclo (PFC) orientado a resolver la complejidad técnica a la que se enfrentan los usuarios con poca experiencia al seleccionar componentes de hardware. El objetivo fundamental del proyecto ha sido desarrollar una solución integral desacoplada que combine la flexibilidad de las bases de datos NoSQL con un motor de reglas estricto en el servidor y una interfaz de usuario reactiva en el cliente.

---

## Contribuciones

Este proyecto ha sido desarrollado como un trabajo académico individual. Sin embargo, las sugerencias, reporte de errores o propuestas de mejora son bienvenidas mediante el uso de *Issues* o *Pull Requests* en el repositorio oficial.

---

## Contacto y Entrega

* **Autor:** Alfonso Martínez Kitoko
* **Repositorio del Proyecto:** [https://github.com/AlfonsoKitoko/PcBuilder.js](https://github.com/AlfonsoKitoko/PcBuilder.js)
* **Entorno Académico:** Proyecto Final de Ciclo
