# API Operaciones Cripto

API Operaciones Cripto es una API RESTful desarrollada en Node.js que permite gestionar usuarios, operaciones y consultas relacionadas con criptomonedas. El proyecto está diseñado para ser escalable, seguro y fácil de mantener, utilizando buenas prácticas de desarrollo y herramientas modernas.

## Características

- **Registro y autenticación de usuarios** con JWT y contraseñas hasheadas.
- **Gestión de operaciones de trading** de criptomonedas.
- **Consultas de información de criptomonedas**.
- **Validación de datos** robusta con Zod.
- **Manejo centralizado de errores**.
- **Documentación y pruebas de endpoints** mediante archivos `.http`.

## Tecnologías y herramientas utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para la creación de APIs.
- **Prisma ORM**: Acceso y gestión de la base de datos de manera segura y tipada.
- **MySQL**: Motor de base de datos relacional.
- **JWT (JSON Web Token)**: Autenticación segura basada en tokens.
- **bcrypt**: Hashing seguro de contraseñas.
- **dotenv**: Gestión de variables de entorno.
- **Zod**: Validación de esquemas y datos.
- **HTTP Client (VS Code)**: Pruebas de endpoints mediante archivos `.http`.

## Estructura del proyecto

```
/controllers      # Lógica de controladores para rutas
/services         # Lógica de negocio y acceso a datos
/routes           # Definición de rutas de la API
/schema           # Validaciones de datos con Zod
/Errors           # Manejo centralizado de errores personalizados
/http             # Archivos para pruebas de endpoints
app.js            # Punto de entrada de la aplicación
.env              # Variables de entorno (no versionado)
```

## Configuración y ejecución

1. **Clona el repositorio**  
   ```sh
   git clone https://github.com/tuusuario/API-Operaciones-Cripto.git
   cd API-Operaciones-Cripto
   ```

2. **Instala las dependencias**  
   ```sh
   npm install
   ```

3. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz con las siguientes variables:
   ```
   DB_HOST=
    DB_USER=
    DB_PASS=
    DB_NAME=
    SECRET_JWT_KEY=
   ```

4. **Ejecuta las migraciones de Prisma**  
   ```sh
   npx prisma migrate deploy
   ```

5. **Inicia la aplicación**  
   ```sh
   npm start
   ```

## Casos de Uso

En la carpeta `/http` encontrarás ejemplos de peticiones para registro y login de usuarios.