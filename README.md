# Project Express Type Ibero

## Curso Flutter Iberoamericana

-  Creando nuestro recurso APi

-  Desarrollo del sistema Api, para nuestra aplicación flutter.

### Docker imagen Backend

```yaml
version: '3.3'
services:
   postgres:
      image: postgres:13
      container_name: serverPostgres
      restart: always
      ports:
         - '5432:5432'
      environment:
         POSTGRES_DB: adminer
         POSTGRES_USER: adminer
         POSTGRES_PASSWORD: adminer2023
         PGDATA: /var/lib/postgresql/data
      volumes:
         - pgdata:/var/lib/postgresql/data:rw
      networks:
         - tpostgres

   pgadmin:
      image: elestio/pgadmin:latest
      container_name: serverPgadmin
      restart: always
      environment:
         PGADMIN_DEFAULT_EMAIL: soportesistemas.comfaca@gmail.com
         PGADMIN_DEFAULT_PASSWORD: adminer2023
         PGADMIN_LISTEN_PORT: 8080
      ports:
         - '4000:8080'
      networks:
         - tpgadmin
         - tpostgres
volumes:
   pgdata:
networks:
   tpostgres:
      driver: bridge
   tpgadmin:
      driver: bridge
```

### Comandos Docker

```bash
   docker-compose up

   docker-compose up -d postgres

   docker-compose logs

   docker ps

   docker exec -it serverPostgres  bash

   docker network ls

   docker network prune

   docker inspect serverPgadmin | grep IPAddress

   docker inspect serverPostgres | grep IPAddress
```

### Out bash inspect

```bash
   "SecondaryIPAddresses": null,
   "IPAddress": "",
            "IPAddress": "172.23.0.2",
            "IPAddress": "172.22.0.3",
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
Generar el archivo de migración

```bash
   docker-compose up -d --build

   npm run migrations:generate
```

procesar el archivo de migración

```bash
npm run migrations:run
npm run migrations:log
npm run migrations:show
```

### Test Enpoint POSTMAN

Se requiere de importar en POSTMAN el archivo de "import.postman.json", para consumo de la Api.

### Usando Curl

```bash
   curl -X POST -d '{"email":"elegroag@ibero.edu.co","password":"202adminer"}' \
   -H 'Content-Type: application/json' \
   http://localhost:3011/api/login/token
```
