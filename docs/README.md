# DEVMED

Este repositório é um [monorepo](https://monorepo.tools/) que contém todos os projetos do DevMed, com exceção do [DevMed APP](https://github.com/devmedonline/mobile-app).

## Projetos

- [DevMed API](https://github.com/devmedonline/monorepo/tree/main/api)

- [DevMed Web](https://github.com/devmedonline/monorepo/tree/main/web)

- [DeveMed Mobile App](https://github.com/devmedonline/mobile-app)

## Documentações para usuários

- [Como usar a interface administrativa](./HOW-TO-ADM.md)
- [Como usar a API para integrações](./HOW-TO-API.md)
- [Como usar o aplicativo](./HOW-TO-APP.md)

## Como rodar

### Pré-requisitos

Você precisa ter instalado em sua máquina:

- [PNPM](https://pnpm.io/)
- [NodeJS](https://nodejs.org/en/)
- [SQLite](https://www.sqlite.org/index.html)

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/devmedonline/monorepo.git
```

2. Obtenha as variáveis de ambiente

Dentro da pasta `api`, crie um arquivo `.env.local` com as variáveis de ambiente necessárias. Você pode copiar o arquivo `.env.example` e preencher com as informações necessárias.

Faça a mesma coisa para a pasta `web`.

Dentro de `packages/db`, crie um arquivo `.env` com as variáveis de ambiente necessárias. Você pode copiar o arquivo `.env.example` e alterar as informações.

3. Instale as dependências

```bash
pnpm install
```

4. Execute os comandos necessários para criar o banco de dados, as tabelas e também o SDK do [Prisma](https://www.prisma.io/docs/getting-started)

```bash
pnpm turbo db:generate
pnpm turbo db:push
```

Com isso você tera o banco de dados criado e as tabelas necessárias, mas sem dados.

4. Execute os projetos

```bash
pnpm dev
```

Para executar os projetos separadamente, você pode filtrar o subrepositório desejado:

```bash
pnpm dev --filter=api
```

```bash
pnpm dev --filter=web
```

## Contribuição

Para contribuir com o projeto, siga as instruções do [CONTRIBUTING.md](./CONTRIBUTING.md).

## OBSERVAÇÃO

1. Para fazer upload de arquivos e imagens, é necessário configurar um bucket no [AWS S3](https://aws.amazon.com/pt/s3/). Você pode seguir o tutorial [aqui](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/creating-bucket.html).

Após criar o bucket, você deve configurar as variáveis de ambiente `AWS_BUCKET_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_ACCESS_SECRET_KEY` e `AWS_BUCKET_NAME` no arquivo `.env.local` da pasta `api`.

Lembre-se de configurar as permissões de acesso ao bucket corretamente para não ter problemas com o upload de arquivos.

Futuramente também será necessário configurar o [AWS CloudFront](https://aws.amazon.com/pt/cloudfront/) para servir os arquivos estáticos de forma mais rápida e segura.

2. Para fazer o envio de e-mails de confirmação de conta e recuperação de senha, é necessário configurar um serviço de envio de e-mails. Você pode usar o [Mailtrap](https://mailtrap.io/).

Faça o cadastro no Mailtrap e configure as variáveis de ambiente
`MAILER_API_KEY`, `MAILER_API_DOMAIN`, `MAILER_DOMAIN` e `MAILER_API_ENDPOINT` no arquivo `.env.local` da pasta `api`.

Esses são os serviços externos usados no projeto, mas futuramente outros serviços podem ser adicionados e alternativas locais serão implementadas.
