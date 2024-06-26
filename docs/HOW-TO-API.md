# Como utilizar a API

A API é feita para uso interno, tanto do aplicativo, quanto da interface administrativa. Ela é responsável por fazer a comunicação entre o banco de dados, serviços externos e as aplicações que consomem os dados.

A aplicação é feita com a linguagem Typescript e utiliza o framework [NestJS](https://nestjs.com/). Como o banco de dados é SQLite, não é necessário instalar nenhum banco de dados adicional. A integração com o banco é feita com o ORM [Prisma](https://www.prisma.io/).

## Como rodar

Esse passo a passo você pode encontrar no arquivo [README.md](./README.md) na raiz da documentação.

## Endpoints

Após executar a aplicação, você pode acessar a documentação dos endpoints em [`http://localhost:2309/api/reference`](http://localhost:2309/api/reference).

A documentação está disponível como um schema OpenAPI, então você pode importar em ferramentas como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

Além disso você pode consultar a documentação diretamente no navegador.

## Autenticação

A API utiliza autenticação via JWT. Para acessar os endpoints protegidos, você precisa enviar o token no header. Você também precisa enviar um Refresh Token para obter um novo JWT pois o tempo de vida do token de acesso é reduzido para aumentar a segurança.
