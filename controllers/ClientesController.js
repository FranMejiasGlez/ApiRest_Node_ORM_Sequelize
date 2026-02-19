// controllers/ClientesController.js
/**
 * Controlador específico para Clientes
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { ClientesBaseController } from './base/ClientesBaseController.js';
import ClientesService from '../services/ClientesService.js';

class ClientesController extends ClientesBaseController {
  constructor() {
    super(ClientesService);
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

export default new ClientesController();
