# Teste técnico Mercos (dev full stack)

Uma aplicação que adiciona pedidos e ​altera os pedidos existentes.

## Tecnologias

O uso das tecnologias descritas abaixo foram pensadas em uma arquitetura serveless, escalável e com portabilidade.

#### Front End

- [React](https://github.com/facebook/react)
- [Next.js](https://nextjs.org/)

#### Deploy

- [Now](https://zeit.co/now)

#### Database NoSQL

- [Cloud Firestore](https://firebase.google.com/products/firestore/)

## Usando localmente

Antes de tudo, é necessário criar um arquivo `.env` com as suas chaves do [Cloud Firestore](https://firebase.google.com/products/firestore/).

```
FIREBASE_API_KEY=<api_key_aqui>
FIREBASE_AUTH_DOMAIN=<auth_domain_aqui>
FIREBASE_DATABASE_URL=<databse_url_aqui>
FIREBASE_PROJECT_ID=<project_id_aqui>
FIREBASE_STORAGE_BUCKET=<storage_bucket_aqui>
FIREBASE_MESSAGING_SENDER_ID=<messaging_sender_id_aqui>
```

#### Necessário

- [Node.js](https://nodejs.org/) (mais recentes)
- [Yarn](https://yarnpkg.com/)

#### Comandos

- `git clone git@github.com:murillo94/teste-mercos-fullstack.git`
- `yarn install`
- `yarn dev`

## url

https://teste-mercos-fullstack.now.sh
