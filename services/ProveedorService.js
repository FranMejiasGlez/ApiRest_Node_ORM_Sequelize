// services/ProveedorService.js
import { Proveedor } from '../models/proveedor.js';

class ProveedorService {
  constructor() {
    this.model = Proveedor;
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error al crear proveedor: ${error.message}`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Error al obtener proveedors: ${error.message}`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Proveedor con ID ${id} no encontrado`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error al obtener proveedor: ${error.message}`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Proveedor con ID ${id} no encontrado`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(`Error al actualizar proveedor: ${error.message}`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Proveedor con ID ${id} no encontrado`);
      }
      await item.destroy();
      return { message: `Proveedor eliminado correctamente` };
    } catch (error) {
      throw new Error(`Error al eliminar proveedor: ${error.message}`);
    }
  }
}

export default new ProveedorService();
