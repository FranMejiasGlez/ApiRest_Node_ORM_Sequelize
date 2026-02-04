// controllers/ProveedorController.js
/**
 * Controlador específico para Proveedor
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { ProveedorBaseController } from './base/ProveedorBaseController.js';
import ProveedorService from '../services/ProveedorService.js';

class ProveedorController extends ProveedorBaseController {
  constructor() {
    super(ProveedorService);
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

export default new ProveedorController();
