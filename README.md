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

#### Necessário

- [Node.js](https://nodejs.org/) (mais recentes)
- [Yarn](https://yarnpkg.com/)

#### Comandos

- `git clone git@github.com:murillo94/teste-mercos-fullstack.git`
- `yarn install`

Criae um arquivo `.env` com as suas chaves do [Cloud Firestore](https://firebase.google.com/products/firestore/).

```
FIREBASE_API_KEY=<API_KEY>
FIREBASE_AUTH_DOMAIN=<PROJECT_ID>.firebaseapp.com
FIREBASE_DATABASE_URL=https://<DATABASE_NAME>.firebaseio.com
FIREBASE_PROJECT_ID=<PROJECT_ID>
FIREBASE_STORAGE_BUCKET=<BUCKET>.appspot.com
FIREBASE_MESSAGING_SENDER_ID=<SENDER_ID>
```

Depois de criado o `.env`, execute o script abaixo:

- `yarn init-firebase`
- `yarn dev`

## url

https://teste-mercos-fullstack.now.sh
