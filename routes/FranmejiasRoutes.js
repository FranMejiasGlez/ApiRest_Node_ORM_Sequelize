// routes/FranmejiasRoutes.js
import express from 'express';
import FranmejiasController from '../controllers/FranmejiasController.js';

const router = express.Router();

// CRUD Routes
router.get('/', FranmejiasController.findAll.bind(FranmejiasController));
router.get('/:id', FranmejiasController.findById.bind(FranmejiasController));
router.post('/', FranmejiasController.create.bind(FranmejiasController));
router.put('/:id', FranmejiasController.update.bind(FranmejiasController));
router.delete('/:id', FranmejiasController.delete.bind(FranmejiasController));

export default router;
