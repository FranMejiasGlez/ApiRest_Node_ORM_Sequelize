// services/FranmejiasService.js
import { Franmejias } from '../models/franmejias.js';

class FranmejiasService {
  constructor() {
    this.model = Franmejias;
  }

  // CREATE
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error al crear franmejias: ${error.message}`);
    }
  }

  // READ ALL
  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error(`Error al obtener franmejiass: ${error.message}`);
    }
  }

  // READ BY ID
  async findById(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Franmejias con ID ${id} no encontrado`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error al obtener franmejias: ${error.message}`);
    }
  }

  // UPDATE
  async update(id, data) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Franmejias con ID ${id} no encontrado`);
      }
      return await item.update(data);
    } catch (error) {
      throw new Error(`Error al actualizar franmejias: ${error.message}`);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const item = await this.model.findByPk(id);
      if (!item) {
        throw new Error(`Franmejias con ID ${id} no encontrado`);
      }
      await item.destroy();
      return { message: `Franmejias eliminado correctamente` };
    } catch (error) {
      throw new Error(`Error al eliminar franmejias: ${error.message}`);
    }
  }
}

export default new FranmejiasService();
