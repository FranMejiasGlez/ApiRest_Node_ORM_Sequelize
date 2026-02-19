import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Franmejias = sequelize.define("Franmejias", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombreApellidos: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: "franmejias",
  timestamps: false
});
