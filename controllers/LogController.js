// controllers/LogController.js
/**
 * Controlador específico para Log
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { LogBaseController } from './base/LogBaseController.js';
import LogService from '../services/LogService.js';

class LogController extends LogBaseController {
  constructor() {
    super(LogService);
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

export default new LogController();
