// controllers/base/ClientesBaseController.js
/**
 * ControladorBase genérico reutilizable
 * Implementa el patrón Template Method para CRUD
 */

export class ClientesBaseController {
  constructor(service) {
    this.service = service;
  }

  // CREATE
  async create(req, res) {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json({
        success: true,
        data: result,
        message: 'Recurso creado correctamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear'
      });
    }
  }

  // READ ALL
  async findAll(req, res) {
    try {
      const results = await this.service.findAll();
      res.status(200).json({
        success: true,
        data: results,
        count: results.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error al obtener datos'
      });
    }
  }

  // READ BY ID
  async findById(req, res) {
    try {
      const result = await this.service.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'No encontrado'
      });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const result = await this.service.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: result,
        message: 'Recurso actualizado correctamente'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar'
      });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const result = await this.service.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message || 'Recurso eliminado correctamente'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al eliminar'
      });
    }
  }
}
