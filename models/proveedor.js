import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Proveedor = sequelize.define("Proveedor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
}, {
    tableName: "proveedores",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
