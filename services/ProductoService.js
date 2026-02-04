// services/ProductoService.js
import { Producto } from '../models/producto.js';

class ProductoService {
  constructor() {
    this.model = Producto;
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      await item.destroy();
      return { message: `Producto eliminado correctamente` };
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
}

export default new ProductoService();
