import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import data from "./data.json" with { type: "json" };

const DATABASE_FILE = `${cwd()}/data/mundiales.db`;
const CREATE_SCRIPT = `${cwd()}/data/CREATE.SQL`;

const db = new DatabaseSync(DATABASE_FILE);

const sql = readFileSync(CREATE_SCRIPT, "utf-8");
db.exec(sql);

const insert = db.prepare(`
  INSERT OR IGNORE INTO mundiales
    (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
  VALUES
    (:nombre, :anio, :sede, :campeon, :subcampeon, :goleador, :equipos, :imagen, :slug, :resumen, :descripcion)
`);

for (const mundial of data) {
  insert.run(mundial);
}

console.log("Base de datos creada y poblada con exito.");
db.close();
