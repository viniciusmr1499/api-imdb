# API-IMDB

API-IMDB - Seguindo os padrões REST e RESTfull

## Requerimentos

* Git
* Yarn ou Npm
* Docker
* docker-compose
* E você também vai precisar de um editor, eu indico o [VSCode](https://code.visualstudio.com/)

## Obtendo o código fonte

Para baixar o código fonte na sua máquina execute o comando abaixo.

` $ git clone https://github.com/viniciusmr1499/api-imdb.git `

## Executar os testes

` $ yarn test `
<br />
ou
<br />
` $ npm run test`

## Rodando as Migrations

A aplicação usa banco de dados Postgres.

` $ yarn typeorm migration:run `

OBS: Para conhecer mais comandos digite ` typeorm --help ` ou acesso o site:

[https://typeorm.io/](https://typeorm.io/)

Alguns comandos úteis:
* typeorm migration:show
<!-- * typeorm migration:create -n "nome-migration" -->
* typeorm:migration:create "nome-migration" (comando personalizado)
* typeorm migration:revert
* etc...

## Executar aplicação em ambiente de desenvolvimento

` $ docker-compose up `
<br />
ou
<br />
` $ docker-compose up -d (em segundo plano)`

## Encerrar aplicação

` $ docker-compose down `

## Buildar aplicação para executar em produção

` $ yarn build `
<br />
ou
<br />
` $ npm run build`

## Executar aplicação em ambiente de produção
` $ yarn start `
<br />
ou
<br />
` $ npm run start`
