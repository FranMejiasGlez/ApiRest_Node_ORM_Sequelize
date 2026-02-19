// controllers/FranmejiasController.js
/**
 * Controlador específico para Franmejias
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { FranmejiasBaseController } from './base/FranmejiasBaseController.js';
import FranmejiasService from '../services/FranmejiasService.js';

class FranmejiasController extends FranmejiasBaseController {
  constructor() {
    super(FranmejiasService);
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

export default new FranmejiasController();
