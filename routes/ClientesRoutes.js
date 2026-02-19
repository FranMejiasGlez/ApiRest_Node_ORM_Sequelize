// routes/ClientesRoutes.js
import express from 'express';
import ClientesController from '../controllers/ClientesController.js';

const router = express.Router();

// CRUD Routes
router.get('/', ClientesController.findAll.bind(ClientesController));
router.get('/:id', ClientesController.findById.bind(ClientesController));
router.post('/', ClientesController.create.bind(ClientesController));
router.put('/:id', ClientesController.update.bind(ClientesController));
router.delete('/:id', ClientesController.delete.bind(ClientesController));

export default router;
