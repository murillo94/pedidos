import { customers, products, orders } from '../data';

describe('Verifcando opções de customers', () => {
  test('Verifando tamanho do array', () => {
    expect(customers).toHaveLength(5);
  });

  test.each(customers)('Verifando as chaves', item => {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
  });
});

describe('Verifcando opções de products', () => {
  test('Verifando tamanho do array', () => {
    expect(products).toHaveLength(7);
  });

  test.each(products)('Verifando as chaves', item => {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
    expect(item).toHaveProperty('multiple');
  });
});

describe('Verifcando opções de orders', () => {
  test('Verifando tamanho do array', () => {
    expect(orders).toHaveLength(2);
  });

  test.each(orders)('Verifando as chaves', item => {
    expect(item).toHaveProperty('customer');
    expect(item).toHaveProperty('products');
    expect(item).toHaveProperty('date');
    expect(item).toHaveProperty('profitability');
  });
});
