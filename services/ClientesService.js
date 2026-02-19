// services/ClientesService.js
import { Cliente } from '../models/clientes.js';

class ClientesService {
  constructor() {
    this.model = Cliente;
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error al crear clientes: ${error.message}`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Error al obtener clientess: ${error.message}`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Clientes con ID ${id} no encontrado`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error al obtener clientes: ${error.message}`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Clientes con ID ${id} no encontrado`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(`Error al actualizar clientes: ${error.message}`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Clientes con ID ${id} no encontrado`);
      }
      await item.destroy();
      return { message: `Clientes eliminado correctamente` };
    } catch (error) {
      throw new Error(`Error al eliminar clientes: ${error.message}`);
    }
  }
}

export default new ClientesService();
