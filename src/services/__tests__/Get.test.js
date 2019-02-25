import Get from '../Get';

test('Requisição deve retornar valores', async () => {
  const data = await Get('orders', 'date');

  expect(data).toBeTruthy();
});

test('Requisição deve retornar error por não aceitar collection vazio', async () => {
  try {
    await Get('', 'date');
  } catch (e) {
    expect(e.message).toBe(
      'Function Firestore.collection() requires its first argument to be of type non-empty string, but it was: ""'
    );
  }
});

test('Requisição deve retornar error por não aceitar orderBy vazio', async () => {
  try {
    await Get('orders', '');
  } catch (e) {
    expect(e.message).toBe(
      "Function Query.orderBy() called with invalid data. Invalid field path (). Paths must not be empty, begin with '.', end with '.', or contain '..'"
    );
  }
});
