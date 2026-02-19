// routes/index.js - Generado automáticamente por AutoCRUD
import express from 'express';
const router = express.Router();

import ClientesRoutes from './ClientesRoutes.js';
import FranmejiasRoutes from './FranmejiasRoutes.js';
import LogRoutes from './LogRoutes.js';
import ProductoRoutes from './ProductoRoutes.js';
import ProveedorRoutes from './ProveedorRoutes.js';

// Registrar todas las rutas
router.use('/clientes', ClientesRoutes);
router.use('/franmejias', FranmejiasRoutes);
router.use('/log', LogRoutes);
router.use('/producto', ProductoRoutes);
router.use('/proveedor', ProveedorRoutes);

export default router;
