# FinPro - Aplicación de Finanzas Personales

Una aplicación web completa para la gestión de finanzas personales, desarrollada con tecnologías modernas.

## Tecnologías Utilizadas

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Node.js, Express, Prisma, PostgreSQL

## Instalación y Configuración

### Requisitos Previos
- Node.js
- PostgreSQL

### Pasos para Ejecutar

1.  **Base de Datos**:
    -   Asegúrate de que PostgreSQL esté corriendo.
    -   Crea una base de datos llamada `finanzas_db`.
    -   Configura el archivo `.env` en la carpeta `server` con tu `DATABASE_URL`.

2.  **Backend (Servidor)**:
    ```bash
    cd server
    npm install
    npx prisma migrate dev --name init
    npm run dev
    ```
    El servidor correrá en `http://localhost:4001`.

3.  **Frontend (Cliente)**:
    ```bash
    cd client_app
    npm install
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Funcionalidades

- Autenticación de Usuarios (Registro e Inicio de Sesión)
- Dashboard con estadísticas en tiempo real
- Gestión de Transacciones (Ingresos y Gastos)
- Gráficos interactivos

---
Desarrollado por **Jose Milla**.
