// routes/ProductoRoutes.js
import express from 'express';
import ProductoController from '../controllers/ProductoController.js';

const router = express.Router();

// CRUD Routes
router.get('/', ProductoController.findAll.bind(ProductoController));
router.get('/:id', ProductoController.findById.bind(ProductoController));
router.post('/', ProductoController.create.bind(ProductoController));
router.put('/:id', ProductoController.update.bind(ProductoController));
router.delete('/:id', ProductoController.delete.bind(ProductoController));

export default router;
