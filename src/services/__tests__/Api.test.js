import initFirebase from '../Api';
import configFirebase from '../Api/configFirebase';

test('Verificando arquivo .env', () => {
  expect(configFirebase).toBeTruthy();
  expect(configFirebase).not.toBe({});
});

test('Verificando chaves do arquivo .env', () => {
  expect(process.env.FIREBASE_API_KEY).toBeTruthy();
  expect(process.env.FIREBASE_AUTH_DOMAIN).toBeTruthy();
  expect(process.env.FIREBASE_DATABASE_URL).toBeTruthy();
  expect(process.env.FIREBASE_PROJECT_ID).toBeTruthy();
  expect(process.env.FIREBASE_STORAGE_BUCKET).toBeTruthy();
  expect(process.env.FIREBASE_MESSAGING_SENDER_ID).toBeTruthy();
});

test('Verificando retorno da conexão com o firebase', () => {
  expect(initFirebase()).toBeTruthy();
});
