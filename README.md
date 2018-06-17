
# Incapacidad temporal óptima

Applicación para calcular los días de baja óptima según las tablas proporcionadas por la seguridad social.
[demo](https://optimal-work-disability.herokuapp.com/)

## Stack tecnológico

|                              | Nombre  | Versión
|---|---|---|
| Lenguaje                     | Python  | 3.6 |
| Framework                    | Flask | 0.12.2 |
| Base de datos                | No | |
| FrontEnd                     | React | 16.4.1 |

El servidor web Flask contiene la api.
El servidor web Flask sirve el index.html de la applicación React.

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

## Desplegar

Es necesario compilar la applicatión de react para que la pueda servir el web server
```
cd front && npm run build

```
## Info
http://www.seg-social.es/Internet_1/LaSeguridadSocial/Publicaciones/Publicacionesporcon28156/Informacionsobrepen47075/Incapacidadtemporal/index.htm#documentoXLSM
http://www.seg-social.es/prdi00/groups/public/documents/binario/122970.pdf
