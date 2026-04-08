
# Incapacidad temporal óptima

Applicación para calcular los días de baja óptima según las tablas proporcionadas por la seguridad social.
[demo](https://incapacidad-temporal-optima.fly.dev/)

## Stack tecnológico

|                              | Nombre  | Versión
|---|---|---|
| Lenguaje                     | Python  | 3.6 |
| Framework                    | Flask | 0.12.2 |
| Base de datos                | No | |
| FrontEnd                     | React | 16.4.1 |

El servidor web Flask contiene la api.
El servidor web Flask sirve el index.html y los assets de la applicación React.

## Instalación

```
docker-compose up
```

## API
```
GET /all-diseases
GET /all-age-rage
GET /all-gender-rage
GET /all-ocupation
POST /optimal-time
```

## Deploy

```
./deploy.sh
```

The script runs `fly deploy` against the `incapacidad-temporal-optima` app on [Fly.io](https://fly.io), always passing `--no-cache` to force a clean image build.

## Build & deployment process

The production image is built in **two stages** (multistage build) so Node.js and frontend build tooling are never shipped in the final image.

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1 — "front"  (node:20-slim)                              │
│                                                                 │
│  COPY front/package.json → npm install (incl. devDependencies)  │
│  COPY front/             → npm run build                        │
│                                 │                               │
│                                 ▼                               │
│                         /app/build/       ← compiled JS/CSS     │
└─────────────────────────────────┬───────────────────────────────┘
                                  │  COPY --from=front
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 2 — final image  (python:3.7-slim)                       │
│                                                                 │
│  COPY server/requirements.txt → pip install                     │
│  COPY server/                 → Flask app + business logic      │
│                                                                 │
│  /app/web/static/    ← /app/build/          (React assets)      │
│  /app/web/templates/ ← /app/build/index.html                    │
│                                                                 │
│  EXPOSE 8080                                                    │
│  CMD gunicorn --bind 0.0.0.0:8080 webapp:app                    │
└─────────────────────────────────────────────────────────────────┘
                                  │
                         ./deploy.sh
                     fly deploy --no-cache
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│  Fly.io  — app: incapacidad-temporal-optima                     │
│                                                                 │
│  VM: 1 shared CPU · 512 MB RAM                                  │
│  HTTPS enforced · auto-start/stop on traffic                    │
│  Internal port: 8080                                            │
└─────────────────────────────────────────────────────────────────┘
```

Flask serves both the API and the React static build from the same process — there is no separate web server or reverse proxy in production.

### Why multistage?

| Single stage | Multistage |
|---|---|
| Final image includes Node.js, npm, and devDependencies | Final image contains only Python, pip, and the compiled static assets |
| ~600–900 MB | ~200–300 MB |
| Larger attack surface | Minimal image, no build tooling |

### Local development

For development with hot-reload, `docker-compose` runs two independent containers:

```
docker-compose up
```

| Service | Port | Description |
|---|---|---|
| `api` | 5000 | Flask API (`server/`) with mounted volume |
| `front` | 3000 | React dev server with hot-reload |

## Info

http://www.seg-social.es/Internet_1/LaSeguridadSocial/Publicaciones/Publicacionesporcon28156/Informacionsobrepen47075/Incapacidadtemporal/index.htm#documentoXLSM
http://www.seg-social.es/prdi00/groups/public/documents/binario/122970.pdf
