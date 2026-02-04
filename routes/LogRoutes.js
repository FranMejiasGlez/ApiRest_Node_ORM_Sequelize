// routes/LogRoutes.js
import express from 'express';
import LogController from '../controllers/LogController.js';

const router = express.Router();

// CRUD Routes
router.get('/', LogController.findAll.bind(LogController));
router.get('/:id', LogController.findById.bind(LogController));
router.post('/', LogController.create.bind(LogController));
router.put('/:id', LogController.update.bind(LogController));
router.delete('/:id', LogController.delete.bind(LogController));

export default router;
