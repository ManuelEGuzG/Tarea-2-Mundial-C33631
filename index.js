import express from "express";
import { env, loadEnvFile } from "node:process";
import { cwd } from "node:process";

import { getAll } from "./routes/mundiales/getAll.js";
import { getBySlug } from "./routes/mundiales/getBySlug.js";
import { getByCampeon } from "./routes/mundiales/getByCampeon.js";
import { random } from "./routes/mundiales/random.js";
import { search } from "./routes/mundiales/search.js";

loadEnvFile("./.env");

const { HOST, PORT } = env;

const app = express();
app.enable("strict routing");

// Ruta raiz: informacion de la API
app.get("/", (req, res) => {
  res.json({
    nombre: "API Copa Mundial FIFA",
    version: "1.0.0",
    descripcion: "API REST con informacion de las ediciones de la Copa Mundial de la FIFA",
    rutas: {
      "GET /mundiales": "Lista de slugs de todas las ediciones",
      "GET /mundiales?include=full": "Lista completa con todos los datos",
      "GET /mundial/:slug": "Datos de una edicion por su slug",
      "GET /campeon/:pais": "Slugs de ediciones ganadas por un pais",
      "GET /random": "Una edicion aleatoria",
      "GET /search/:text": "Busqueda por texto (minimo 3 caracteres)",
      "GET /imagenes/:file": "Imagenes de las ediciones"
    }
  });
});

// Rutas principales
app.get("/mundiales", getAll);
app.get("/mundial/:slug", getBySlug);
app.get("/campeon/:pais", getByCampeon);
app.get("/random", random);
app.get("/search/:text", search);

// Archivos estaticos: imagenes
app.use("/imagenes", express.static(`${cwd()}/public/imagenes`));

// Catch-all: ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando: http://${HOST}:${PORT}`);
});
