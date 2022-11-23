# Teste MKS

# API EM TYPESCRIPT, DOCKER, SWAGGER, REDDIS, POSTGRE
Backend desenvolvido em typescript, com autenticação JWT, typeorm, redis, postgreSQL, SWAGGER.
Validação feita com celebrate, JOI

# DEPLOY
Sistema publicado na https://www.vultr.com , em uma VPS com sistema operacional linux debian 9.
* Nodejs esta rodando via PM2.
* Redis e postgreeSQL estão rodando via docker.
## Comandos Docker
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=123123 -e PGDATA=/var/lib/postgresql/data/pgdata -v /custom/mount:/var/lib/postgresql/data postgres

# LINK SWAGGER RODANDO NO SISTEMA

## http://144.202.45.201:3000/api-docs/



## To run this project

yarn
yarn dev

## To compile this project

yarn tsc
yarn start

# Helder H Salvalaio

helder.hs@gmail.com

19 991717150
