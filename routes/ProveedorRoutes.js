// routes/ProveedorRoutes.js
import express from 'express';
import ProveedorController from '../controllers/ProveedorController.js';

const router = express.Router();

// CRUD Routes
router.get('/', ProveedorController.findAll.bind(ProveedorController));
router.get('/:id', ProveedorController.findById.bind(ProveedorController));
router.post('/', ProveedorController.create.bind(ProveedorController));
router.put('/:id', ProveedorController.update.bind(ProveedorController));
router.delete('/:id', ProveedorController.delete.bind(ProveedorController));

export default router;
