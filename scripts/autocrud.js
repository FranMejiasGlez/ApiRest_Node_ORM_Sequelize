// scripts/autocrud.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsPath = path.join(__dirname, '../models');
const servicesPath = path.join(__dirname, '../services');
const controllersBasePath = path.join(__dirname, '../controllers/base');
const controllersPath = path.join(__dirname, '../controllers');
const routesPath = path.join(__dirname, '../routes');

// Crear directorios si no existen
[servicesPath, controllersBasePath, controllersPath, routesPath].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

// Leer modelos (excluir init-models.js y archivos que no sean .js)
const models = fs
    .readdirSync(modelsPath)
    .filter(f => f.endsWith('.js') && f !== 'init-models.js');

console.log('🚀 Iniciando AutoCRUD...\n');

for (const modelFile of models) {
    const modelName = path.basename(modelFile, '.js'); // ej: productos
    // Capitalizar primera letra para el nombre de clase
    const className = modelName.charAt(0).toUpperCase() + modelName.slice(1); // ej: Productos
    const singular = modelName.toLowerCase(); // ej: productos
    const plural = singular + 's'; // ej: productoss (o ajustar según necesidad)

    console.log(`📦 Generando para modelo: ${className}`);

    // ==================== SERVICIO ====================
    const serviceContent = `// services/${className}Service.js
import { ${className} } from '../models/${modelFile.replace('.js', '')}.js';

class ${className}Service {
  constructor() {
    this.model = ${className};
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(\`Error al crear ${singular}: \${error.message}\`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(\`Error al obtener ${plural}: \${error.message}\`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(\`${className} con ID \${id} no encontrado\`);
      }
      return item;
    } catch (error) {
      throw new Error(\`Error al obtener ${singular}: \${error.message}\`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(\`${className} con ID \${id} no encontrado\`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(\`Error al actualizar ${singular}: \${error.message}\`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(\`${className} con ID \${id} no encontrado\`);
      }
      await item.destroy();
      return { message: \`${className} eliminado correctamente\` };
    } catch (error) {
      throw new Error(\`Error al eliminar ${singular}: \${error.message}\`);
    }
  }
}

export default new ${className}Service();
`;

    fs.writeFileSync(path.join(servicesPath, `${className}Service.js`), serviceContent);

    // ==================== CONTROLADOR BASE ====================
    const baseControllerContent = `// controllers/base/${className}BaseController.js
/**
 * ControladorBase genérico reutilizable
 * Implementa el patrón Template Method para CRUD
 */

export class ${className}BaseController {
  constructor(service) {
    this.service = service;
  }

  // CREATE
  async create(req, res) {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        data: result,
        message: 'Recurso creado correctamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear'
      });
    }
  }

  // READ ALL
  async findAll(req, res) {
    try {
      const results = await this.service.findAll();
      res.status(200).json({
        success: true,
        data: results,
        count: results.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener datos'
      });
    }
  }

  // READ BY ID
  async findById(req, res) {
    try {
      const result = await this.service.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'No encontrado'
      });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const result = await this.service.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: 'Recurso actualizado correctamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar'
      });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const result = await this.service.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message || 'Recurso eliminado correctamente'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al eliminar'
      });
    }
  }
}
`;

    fs.writeFileSync(
        path.join(controllersBasePath, `${className}BaseController.js`),
        baseControllerContent
    );

    // ==================== CONTROLADOR EXTENDIDO ====================
    const controllerContent = `// controllers/${className}Controller.js
/**
 * Controlador específico para ${className}
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { ${className}BaseController } from './base/${className}BaseController.js';
import ${className}Service from '../services/${className}Service.js';

class ${className}Controller extends ${className}BaseController {
  constructor() {
    super(${className}Service);
  }

  // Aquí puedes agregar métodos personalizados adicionales
  // Ejemplo:
  // async findByCustomFilter(req, res) {
  //   try {
  //     // lógica personalizada
  //   } catch (error) {
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // }
}

export default new ${className}Controller();
`;

    fs.writeFileSync(path.join(controllersPath, `${className}Controller.js`), controllerContent);

    // ==================== RUTA ====================
    const routeContent = `// routes/${className}Routes.js
import express from 'express';
import ${className}Controller from '../controllers/${className}Controller.js';

const router = express.Router();

// CRUD Routes
router.get('/', ${className}Controller.findAll.bind(${className}Controller));
router.get('/:id', ${className}Controller.findById.bind(${className}Controller));
router.post('/', ${className}Controller.create.bind(${className}Controller));
router.put('/:id', ${className}Controller.update.bind(${className}Controller));
router.delete('/:id', ${className}Controller.delete.bind(${className}Controller));

export default router;
`;

    fs.writeFileSync(path.join(routesPath, `${className}Routes.js`), routeContent);

    console.log(`  ✅ Servicio: services/${className}Service.js`);
    console.log(`  ✅ Controlador Base: controllers/base/${className}BaseController.js`);
    console.log(`  ✅ Controlador: controllers/${className}Controller.js`);
    console.log(`  ✅ Rutas: routes/${className}Routes.js\n`);
}

console.log('🎉 AutoCRUD completado exitosamente!');
console.log('\nEstructura generada:');
console.log('  📁 services/');
console.log('  📁 controllers/base/');
console.log('  📁 controllers/');
console.log('  📁 routes/');

// ==================== GENERAR INDEX DE RUTAS ====================
const routeFiles = fs.readdirSync(routesPath).filter(f => f.endsWith('Routes.js'));
let routesIndexContent = `// routes/index.js - Generado automáticamente por AutoCRUD
import express from 'express';
const router = express.Router();

`;

for (const routeFile of routeFiles) {
    const routeName = routeFile.replace('Routes.js', '');
    const routePath = routeName.toLowerCase();
    routesIndexContent += `import ${routeName}Routes from './${routeFile}';\n`;
}

routesIndexContent += `\n// Registrar todas las rutas\n`;

for (const routeFile of routeFiles) {
    const routeName = routeFile.replace('Routes.js', '');
    const routePath = routeName.toLowerCase();
    routesIndexContent += `router.use('/${routePath}', ${routeName}Routes);\n`;
}

routesIndexContent += `\nexport default router;\n`;

fs.writeFileSync(path.join(routesPath, 'index.js'), routesIndexContent);
console.log('  ✅ Índice de rutas: routes/index.js');

console.log('\n📝 Para usar las rutas, actualiza tu server.js:');
console.log("   import routes from './routes/index.js';");
console.log("   app.use('/api', routes);");
