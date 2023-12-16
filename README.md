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
#correr el docker imagen, y comprobar el proceso de creación en primer plano
$~ docker-compose up

#correr el docker imagen, proceso de creación en segundo plano
$~ docker-compose up -d serverPostgres

#ver el log de la imagen en ejecución
$~ docker-compose logs

#ver imagenes en ejecución
$~ docker ps

#ingresar al bash de la imagen corriendo
$~ docker exec -it serverPostgres  bash

#inspeccionar la red del docker
$~ docker network ls

#limpiar las nets no usadas
$~ docker network prune

#ver que ip usa determinada imagen
$~ docker inspect serverPgadmin | grep IPAddress

$~ docker inspect serverPostgres | grep IPAddress
```

### Out bash inspect

```bash
$~ docker inspect serverPostgres | grep IPAddress

   "SecondaryIPAddresses": null,
   "IPAddress": "",
            "IPAddress": "172.23.0.2",
            "IPAddress": "172.22.0.3",
```

### Remove imagen docker, network volumens

```bash
$~ docker-compose down --rmi all --volumes
```

### Access Database Postgresql

```bash
$~ docker exec -it serverPostgres  bash

psql -h localhost -d adminer -U adminer
\l
\c adminer
\q
```

## Migration

Realizar la migración de la base de datos  
Generar el archivo de migración

```bash
$~ docker-compose up -d --build
```

Procesar el archivo de migración

```bash
$~ npm run migrations:generate
$~ npm run migrations:run
$~ npm run migrations:log
$~ npm run migrations:show
```

## Run Api CLIBash

```bash
$~ npm run dev

   [INFO] 11:56:31 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 4.9.5)
   Data Source has been initialized!
   Server incializa en puerto 3011 Hora: 12/16/2023
```

### Test Enpoint POSTMAN

Se requiere de importar en POSTMAN el archivo de "import.postman.json", para consumo de la Api.

### Usando Curl

```bash
$~ curl -X POST -d '{"email":"user@ibero.edu.co","password":"202adminer"}' \
-H 'Content-Type: application/json' \
http://localhost:3011/api/login/token
```
