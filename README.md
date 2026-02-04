# 🧩 API REST con Node.js, Sequelize y AutoCRUD

API REST con arquitectura **MVC reducida** y generación automática de CRUD (AutoCRUD).

---

## 📁 Estructura del Proyecto

```
📦 ApiRest_Node_ORM_Sequelize
├── config/
│   └── db.js                 # Configuración de base de datos
├── models/                   # Modelos Sequelize
│   ├── producto.js
│   └── log.js
├── services/                 # Capa de servicios (lógica de negocio)
│   ├── ProductoService.js
│   └── LogService.js
├── controllers/
│   ├── base/                 # Controladores base reutilizables
│   │   ├── ProductoBaseController.js
│   │   └── LogBaseController.js
│   ├── ProductoController.js # Controladores específicos
│   └── LogController.js
├── routes/                   # Definición de rutas
│   ├── index.js              # Índice de rutas (auto-generado)
│   ├── ProductoRoutes.js
│   └── LogRoutes.js
├── scripts/
│   └── autocrud.js           # Script de generación automática
├── server.js                 # Punto de entrada
├── .env                      # Variables de entorno (crear manualmente)
└── package.json
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/FranMejiasGlez/ApiRest_Node_ORM_Sequelize.git
cd ApiRest_Node_ORM_Sequelize
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Instalar dotenv (opcional pero recomendado)
```bash
npm install dotenv
```

---

## ⚙️ Configuración (.env)

### Opción A: Usando archivo .env (recomendado)

1. Crear archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=api_rest_db
DB_PORT=3306
PORT=3000
```

2. Modificar `config/db.js` para usar variables de entorno:
```javascript
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "api_rest_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false
  }
);
```

### Opción B: Configuración directa

Editar `config/db.js` con tus credenciales:
```javascript
export const sequelize = new Sequelize("api_rest_db", "root", "tu_password", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});
```

### Crear la base de datos

```sql
CREATE DATABASE IF NOT EXISTS api_rest_db;
```

---

## 🗄️ Sincronización de tablas (Migraciones)

Las tablas se crean/actualizan **automáticamente** al iniciar el servidor gracias a:
```javascript
await sequelize.sync({ alter: true });
```

> **Nota:** No se usan migraciones tradicionales. El sistema sincroniza automáticamente los modelos con la base de datos.

---

## 🖥️ Ejecutar el servidor

### Modo desarrollo (con hot-reload)
```bash
npm run dev
```

### Modo producción
```bash
node server.js
```

El servidor estará disponible en: `http://localhost:3000`

---

## 🔧 Ejecutar AutoCRUD

El AutoCRUD genera automáticamente la estructura MVC para cada modelo:

```bash
npm run autocrud
```

### ¿Qué genera?

Por cada archivo en `models/` genera:
- ✅ **Servicio**: `services/{Modelo}Service.js`
- ✅ **Controlador Base**: `controllers/base/{Modelo}BaseController.js`
- ✅ **Controlador**: `controllers/{Modelo}Controller.js`
- ✅ **Rutas**: `routes/{Modelo}Routes.js`
- ✅ **Índice de rutas**: `routes/index.js`

### Agregar un nuevo modelo

1. Crear el modelo en `models/`:
```javascript
// models/cliente.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "clientes",
  timestamps: true
});
```

2. Ejecutar AutoCRUD:
```bash
npm run autocrud
```

3. Reiniciar el servidor:
```bash
npm run dev
```

¡Listo! Los endpoints CRUD ya están disponibles automáticamente.

---

## 📡 Endpoints API

Base URL: `http://localhost:3000/api`

### Producto (`/api/producto`)

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | `/api/producto` | Listar todos | - |
| GET | `/api/producto/:id` | Obtener por ID | - |
| POST | `/api/producto` | Crear nuevo | `{ "nombre": "...", "precio": 0, "stock": 0 }` |
| PUT | `/api/producto/:id` | Actualizar | `{ "nombre": "...", "precio": 0, "stock": 0 }` |
| DELETE | `/api/producto/:id` | Eliminar | - |

### Log (`/api/log`)

| Método | Endpoint | Descripción | Body (JSON) |
|--------|----------|-------------|-------------|
| GET | `/api/log` | Listar todos | - |
| GET | `/api/log/:id` | Obtener por ID | - |
| POST | `/api/log` | Crear nuevo | `{ "log": "mensaje de log" }` |
| PUT | `/api/log/:id` | Actualizar | `{ "log": "mensaje actualizado" }` |
| DELETE | `/api/log/:id` | Eliminar | - |

---

## 📝 Ejemplos de uso (cURL)

### Crear un producto
```bash
curl -X POST http://localhost:3000/api/producto \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Laptop", "precio": 999.99, "stock": 10}'
```

### Listar todos los productos
```bash
curl http://localhost:3000/api/producto
```

### Obtener producto por ID
```bash
curl http://localhost:3000/api/producto/1
```

### Actualizar producto
```bash
curl -X PUT http://localhost:3000/api/producto/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Laptop Pro", "precio": 1299.99, "stock": 5}'
```

### Eliminar producto
```bash
curl -X DELETE http://localhost:3000/api/producto/1
```

### Crear un log
```bash
curl -X POST http://localhost:3000/api/log \
  -H "Content-Type: application/json" \
  -d '{"log": "Usuario creó un nuevo producto"}'
```

---

## 📋 Respuestas de la API

### Respuesta exitosa (GET all)
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### Respuesta exitosa (GET by ID / POST / PUT)
```json
{
  "success": true,
  "data": {...},
  "message": "Recurso creado/actualizado correctamente"
}
```

### Respuesta de error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🛠️ Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| dev | `npm run dev` | Inicia servidor con nodemon (hot-reload) |
| autocrud | `npm run autocrud` | Genera estructura MVC automáticamente |

---

## 📦 Dependencias

### Producción
- `express` - Framework web
- `sequelize` - ORM para base de datos
- `mysql2` - Driver MySQL

### Desarrollo
- `nodemon` - Hot-reload para desarrollo
- `sequelize-auto` - Generación automática de modelos

---

## 🎯 Objetivo educativo

Este proyecto permite:
- Comprender la estructura MVC en Node.js
- Practicar la comunicación entre API y base de datos relacional
- Experimentar con la automatización de código (AutoCRUD)
- Aprender a trabajar con ORM para abstraer consultas SQL

---

