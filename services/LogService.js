// services/LogService.js
import { Log } from '../models/log.js';

class LogService {
  constructor() {
    this.model = Log;
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error al crear log: ${error.message}`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Error al obtener logs: ${error.message}`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Log con ID ${id} no encontrado`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error al obtener log: ${error.message}`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Log con ID ${id} no encontrado`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(`Error al actualizar log: ${error.message}`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Log con ID ${id} no encontrado`);
      }
      await item.destroy();
      return { message: `Log eliminado correctamente` };
    } catch (error) {
      throw new Error(`Error al eliminar log: ${error.message}`);
    }
  }
}

export default new LogService();
