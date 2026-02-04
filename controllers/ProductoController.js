// controllers/ProductoController.js
/**
 * Controlador específico para Producto
 * Hereda del controlador base y puede ser extendido con lógica personalizada
 */
import { ProductoBaseController } from './base/ProductoBaseController.js';
import ProductoService from '../services/ProductoService.js';

class ProductoController extends ProductoBaseController {
  constructor() {
    super(ProductoService);
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

export default new ProductoController();
