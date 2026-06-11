# API Copa Mundial FIFA 🏆⚽

API REST construida con Node.js y Express que expone información sobre las ediciones de la Copa Mundial de la FIFA.

## Tecnologías

- **Node.js** v22+
- **Express** v5
- **SQLite** (nativo de Node.js, módulo `node:sqlite`)
- **Zod** (validación de datos)
- **pnpm** (gestor de paquetes)

## Requisitos previos

- Node.js v22 o superior
- pnpm instalado

```bash
npm install -g pnpm
```

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd mundial-api

# Instalar dependencias
pnpm install
```

## Poblar la base de datos

Antes de iniciar el servidor, es necesario crear y poblar la base de datos SQLite:

```bash
pnpm run createdb
```

Esto leerá `data/data.json` y creará el archivo `data/mundiales.db` con los 10 mundiales.

## Iniciar el servidor

```bash
# Producción
pnpm start

# Desarrollo (con recarga automática)
pnpm dev
```

El servidor escucha en `http://localhost:4321`.

## Rutas disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información general de la API |
| GET | `/mundiales` | Lista de slugs de todas las ediciones |
| GET | `/mundiales?include=full` | Lista completa con todos los datos |
| GET | `/mundial/:slug` | Datos de una edición específica |
| GET | `/campeon/:pais` | Slugs de ediciones ganadas por ese país |
| GET | `/random` | Una edición aleatoria |
| GET | `/search/:text` | Búsqueda por texto (mínimo 3 caracteres) |
| GET | `/imagenes/:archivo` | Imágenes de las ediciones (.avif) |

## Códigos HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK — la petición fue exitosa |
| 400 | Bad Request — validación de entrada (Zod) falló |
| 404 | Not Found — recurso o ruta no encontrada |

## Ejemplos de uso con xh

```bash
xh GET :4321/mundiales
xh GET :4321/mundiales include==full
xh GET :4321/mundial/qatar-2022
xh GET :4321/mundial/inexistente       # -> 404 JSON
xh GET :4321/campeon/Argentina
xh GET :4321/random
xh GET :4321/search/final
xh GET :4321/search/ab                 # -> 400 JSON (mínimo 3 caracteres)
```

## Estructura del proyecto

```
mundial-api/
├── data/
│   ├── CREATE.SQL        # Script SQL para crear la tabla
│   ├── createdb.js       # Script para poblar la BD
│   ├── data.json         # Datos fuente (10 ediciones)
│   ├── mundiales.js      # Repositorio de datos (patrón repositorio)
│   └── mundiales.db      # Base de datos SQLite (generada)
├── public/
│   └── imagenes/         # Imágenes .avif de cada edición
├── routes/
│   └── mundiales/
│       ├── getAll.js           # GET /mundiales
│       ├── getBySlug.js        # GET /mundial/:slug
│       ├── getByCampeon.js     # GET /campeon/:pais
│       ├── random.js           # GET /random
│       ├── search.js           # GET /search/:text
│       ├── search.schema.js    # Schema Zod para búsqueda
│       └── slug.schema.js      # Schema Zod para slug
├── .env                  # Variables de entorno (HOST, PORT)
├── .gitignore
├── index.js              # Entrada principal de la API
├── package.json
├── README.md
└── REFERENCIAS.md
```

## Estructura de datos

```json
{
  "nombre": "Copa Mundial Qatar 2022",
  "anio": 2022,
  "sede": "Qatar",
  "campeon": "Argentina",
  "subcampeon": "Francia",
  "goleador": "Kylian Mbappe",
  "equipos": 32,
  "imagen": "qatar-2022.avif",
  "slug": "qatar-2022",
  "resumen": "Argentina campeon tras una final epica ante Francia.",
  "descripcion": "Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo."
}
```
