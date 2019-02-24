import {
  profitabilityOptions,
  profitabilityTypeWithNumber,
  profitabilityTypeWithArray
} from '../Profitability';

describe('Verifcando as opções de profitabilityOptions border', () => {
  const border = { high: '#43a074', medium: '#f2b350', low: '#ff6666' };

  test('Verificando se existe a chave border', () => {
    expect(profitabilityOptions).toHaveProperty('border');
  });

  test('Comparando os valores da chave border', () => {
    expect(profitabilityOptions.border).toMatchObject(border);
  });
});

describe('Verifcando as opções de profitabilityOptions backgroundColor', () => {
  const backgroundColor = {
    high: '#8ec6ab',
    medium: '#f7d196',
    low: '#ffa5a5'
  };

  test('Verificando se existe a chave backgroundColor', () => {
    expect(profitabilityOptions).toHaveProperty('backgroundColor');
  });

  test('Comparando os valores da chave backgroundColor', () => {
    expect(profitabilityOptions.backgroundColor).toMatchObject(backgroundColor);
  });
});

describe('Verifcando as opções de profitabilityOptions text', () => {
  const text = {
    high: 'Rentabilidade ótima',
    medium: 'Rentabilidade boa'
  };

  test('Verificando se existe a chave text', () => {
    expect(profitabilityOptions).toHaveProperty('text');
  });

  test('Comparando os valores da chave text', () => {
    expect(profitabilityOptions.text).toMatchObject(text);
  });
});

describe('Verifcando as opções de profitabilityTypeWithNumber', () => {
  test('Verificando se valor informado retorna high', () => {
    expect(profitabilityTypeWithNumber('R$ 10.000,00', 'R$ 10.001,00')).toBe(
      'high'
    );
  });

  test('Verificando se valor informado retorna medium', () => {
    expect(profitabilityTypeWithNumber('R$ 10.000,00', 'R$ 09.000,00')).toBe(
      'medium'
    );
  });

  test('Verificando se valor informado retorna low', () => {
    expect(profitabilityTypeWithNumber('R$ 10.000,00', 'R$ 04.000,00')).toBe(
      'low'
    );
  });
});

describe('Verifcando as opções de profitabilityTypeWithArray', () => {
  test('Verificando se valor informado retorna high', () => {
    expect(profitabilityTypeWithArray([{ profitability: 'high' }])).toBe(
      'high'
    );
  });

  test('Verificando se valor informado retorna medium', () => {
    expect(profitabilityTypeWithArray([{ profitability: 'medium' }])).toBe(
      'medium'
    );
  });

  test('Verificando se lista informado retorna medium', () => {
    expect(profitabilityTypeWithArray([])).toBe('medium');
  });

  test('Verificando se valor informado retorna low', () => {
    expect(profitabilityTypeWithArray([{ profitability: 'low' }])).toBe('low');
  });
});
