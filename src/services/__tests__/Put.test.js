import Put from '../Put';

test('Requisição deve retornar valores', async () => {
  const data = await Put('orders', 'TOKEN_TESTE', {});

  expect(data).toBeTruthy();
  expect(data).toBe('TOKEN_TESTE');
});

test('Requisição deve retornar error por não aceitar dado vazio', async () => {
  try {
    await Put('teste', 'TOKEN_TESTE', '');
  } catch (e) {
    expect(e.message).toBe(
      'Function DocumentReference.set() called with invalid data. Data must be an object, but it was: ""'
    );
  }
});
