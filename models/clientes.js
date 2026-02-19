import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Cliente = sequelize.define("Cliente", {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
}, {
  tableName: "clientes",
  timestamps: true
});
