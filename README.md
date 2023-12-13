# Project Express Type Ibero

## Curso Flutter Iberoamericana

-  Creando nuestro recurso APi

-  Desarrollo del sistema Api, para nuestra aplicación flutter.

### Docker imagen Backend

```yaml
version: '3.8'
services:
   postgres:
      image: postgres:13
      container_name: serverPostgres
      restart: always
      ports:
         - 5432:5432
      environment:
         - POSTGRES_DB=adminer
         - POSTGRES_USER=adminer
         - POSTGRES_PASSWORD=adminer2023
         - PGDATA=/var/lib/postgresql/data/pgdata
      volumes:
         - ./pgdata:/var/lib/postgresql/data
volumes:
   pgdata: {}
```

### Comandos Docker

```bash
docker-compose up

docker-compose up -d postgres

docker-compose logs

docker ps

docker exec -it serverPostgres  bash
```

### Remove imagen docker, network volumens

```bash
docker-compose down --rmi all --volumes
```

### Access Database Postgresql

```bash
docker exec -it serverPostgres  bash

psql -h localhost -d adminer -U adminer
\l
\c adminer
\q
```

## Migration

Realizar la migración de la base de datos

generar el archivo de migración

```bash
npm run migrations:generate
```

procesar el archivo de migración

```bash
npm run migrations:run
npm run migrations:log
npm run migrations:show
```
