```mermaid
classDiagram
    direction LR

    class User {
        +String username
        +String email
        +String profile
        +Date birthDate
    }

    class Build {
        +String name
        +Number totalPrice
        +Date createdAt
    }

    class Part {
        +String name (PC_PARTS)
    }

    class CPU {
        +String manufacturer
        +String model
        +Number core_count
        +Number tdp
        +Number price
    }

    class Mobo {
        +String manufacturer
        +String socket
        +String form_factor
        +String ram_type
        +Number price
    }

    class GPU {
        +String series
        +String gpu_type
        +Number tdp
        +Object ports
        +Number price
    }

    class RAM {
        +String manufacturer
        +Object modules
        +String ram_type
        +Number price
    }

    class Storage {
        +String capacity
        +String type
        +String interface
        +Number price
    }

    class PSU {
        +String manufacturer
        +String eff_rating
        +String modular
        +Number price
    }

    class Case {
        +String manufacturer
        +String case_type
        +String form_factor
        +Number price
    }

    class OS {
        +String name
        +Number price
    }

    %% Relaciones
    User "1" -- "*" Build : owner
    Build "1" --> "1" CPU : cpu
    Build "1" --> "1" Mobo : mobo
    Build "1" --> "1" PSU : psu
    Build "1" --> "1" Case : case
    Build "1" --> "1..*" RAM : ram
    Build "1" --> "1..*" Storage : storage
    Build "1" --> "0..1" GPU : gpu
    Build "1" --> "0..1" OS : os

    %% Relación con PartType
    CPU ..> Part : partType
    Mobo ..> Part : partType
    GPU ..> Part : partType
    RAM ..> Part : partType
    Storage ..> Part : partType
    PSU ..> Part : partType
    Case ..> Part : partType
    OS ..> Part : partType
```

```mermaid
graph TD
    subgraph Cliente [Capa de Presentación - Frontend]
        A[Navegador Web] --> B[App Angular]
    end

    subgraph Servidor [Capa de Lógica - Backend]
        B -- "Peticiones HTTP (JSON)" --> C[API REST - Express]
        C --> D[Middlewares / Validaciones]
        D --> E[Controladores / Lógica de Negocio]
    end

    subgraph Datos [Capa de Persistencia]
        E --> F[Mongoose ODM]
        F --> G[(MongoDB Atlas)]
    end
```

```bash
npx tree-node-cli -I "node_modules|tmp"
tree -I 'node_modules'

backExpress
├── package-lock.json
├── package.json
└── src
    ├── build-engine
    │   ├── compatibility.engine.js     
    │   ├── power.engine.js
    │   ├── price.engine.js
    │   └── validation.engine.js        
    ├── config
    │   ├── logger.config.js
    │   ├── mongodb.config.js
    │   └── swagger.config.js
    ├── constants
    │   ├── case_type.constant.js       
    │   ├── gpu.constant.js
    │   ├── index.constant.js
    │   ├── manufacturer.constant.js    
    │   ├── mobo_form_factor.constant.js    │   ├── os.constant.js
    │   ├── pc_parts.constant.js        
    │   ├── psu.constant.js
    │   ├── ram.constant.js
    │   ├── storage.constant.js
    │   └── wireless.constant.js        
    ├── database
    │   ├── buildSeeds
    │   │   └── builds.seed.js
    │   ├── seeds
    │   │   ├── partTypes.seed.js       
    │   │   └── parts.seed.js
    │   └── userSeeds
    │       └── users.seed.js
    ├── docs
    │   ├── _responses.yaml
    │   ├── auth.docs.yaml
    │   ├── build.docs.yaml
    │   ├── case.docs.yaml
    │   ├── cpu.docs.yaml
    │   ├── gpu.docs.yaml
    │   ├── home.docs.yaml
    │   ├── mobo.docs.yaml
    │   ├── os.docs.yaml
    │   ├── part.docs.yaml
    │   ├── psu.docs.yaml
    │   ├── ram.docs.yaml
    │   ├── storage.docs.yaml
    │   └── user.docs.yaml
    ├── index.js
    ├── middlewares
    │   ├── errorHandler.mw.js
    │   ├── jwt.mw.js
    │   ├── morgan.mw.js
    │   └── profile.mw.js
    ├── models
    │   ├── build.model.js
    │   ├── case.model.js
    │   ├── cpu.model.js
    │   ├── gpu.model.js
    │   ├── mobo.model.js
    │   ├── os.model.js
    │   ├── part.model.js
    │   ├── psu.model.js
    │   ├── ram.model.js
    │   ├── storage.model.js
    │   └── user.model.js
    ├── modules
    │   ├── auth
    │   │   ├── auth.controller.js      
    │   │   ├── auth.routes.js
    │   │   └── auth.service.js
    │   ├── build
    │   │   ├── build.controller.js     
    │   │   ├── build.routes.js
    │   │   └── build.service.js        
    │   ├── case
    │   │   ├── case.controller.js      
    │   │   ├── case.routes.js
    │   │   └── case.service.js
    │   ├── cpu
    │   │   ├── cpu.controller.js       
    │   │   ├── cpu.routes.js
    │   │   └── cpu.service.js
    │   ├── gpu
    │   │   ├── gpu.controller.js       
    │   │   ├── gpu.routes.js
    │   │   └── gpu.service.js
    │   ├── mobo
    │   │   ├── mobo.controller.js      
    │   │   ├── mobo.routes.js
    │   │   └── mobo.service.js
    │   ├── os
    │   │   ├── os.controller.js        
    │   │   ├── os.routes.js
    │   │   └── os.service.js
    │   ├── part
    │   │   ├── part.controller.js      
    │   │   ├── part.routes.js
    │   │   └── part.service.js
    │   ├── psu
    │   │   ├── psu.controller.js       
    │   │   ├── psu.routes.js
    │   │   └── psu.service.js
    │   ├── ram
    │   │   ├── ram.controller.js       
    │   │   ├── ram.routes.js
    │   │   └── ram.service.js
    │   ├── storage
    │   │   ├── storage.controller.js   
    │   │   ├── storage.routes.js       
    │   │   └── storage.service.js      
    │   └── user
    │       ├── user.controller.js      
    │       ├── user.routes.js
    │       └── user.service.js
    ├── public
    │   └── favicon.ico
    ├── routes
    │   └── index.routes.js
    ├── tests
    │   └── pcbuilder.echoapi.json      
    ├── utils
    │   ├── AppError.js
    │   ├── apiResponse.js
    │   ├── asyncHandler.js
    │   └── bcrypt.js
    ├── validators
    │   ├── array.validator.js
    │   └── integer.validator.js        
    └── views
```