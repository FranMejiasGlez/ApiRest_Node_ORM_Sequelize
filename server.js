import express from "express";
import { sequelize } from "./config/db.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

// Rutas API (generadas por AutoCRUD)
app.use("/api", routes);

// Sincronizar base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas.");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
