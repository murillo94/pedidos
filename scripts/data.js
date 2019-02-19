export const customers = [
  {
    id: 1,
    name: 'Darth Vader'
  },
  {
    id: 2,
    name: 'Obi-Wan Kenobi'
  },
  {
    id: 3,
    name: 'Luke Skywalker'
  },
  {
    id: 4,
    name: 'Imperador Palpatine'
  },
  {
    id: 5,
    name: 'Han Solo'
  }
];

export const products = [
  { id: 1, name: 'Millenium​ ​Falcon', price: '550.000,00', multiple: 0 },
  { id: 2, name: 'X-Wing', price: '60.000,00', multiple: 2 },
  {
    id: 3,
    name: 'Super​ ​Star​ ​Destroyer',
    price: '4.570.000,00',
    multiple: 0
  },
  { id: 4, name: 'TIE​ ​Fighter', price: '75.000,00', multiple: 2 },
  { id: 5, name: 'Lightsaber', price: '6.000,00', multiple: 5 },
  {
    id: 6,
    name: 'DLT-19​ ​Heavy​ ​Blaster​ ​Rifle',
    price: '5.800,00',
    multiple: 0
  },
  {
    id: 7,
    name: 'DL-44​ ​Heavy​ ​Blaster​ ​Pistol',
    price: '1.500,00',
    multiple: 10
  }
];

export const orders = [
  {
    id: 1,
    customer: { id: 1, name: 'Darth Vader' },
    products: [
      {
        id: 2,
        name: 'X-Wing',
        price: '60.001,00',
        priceFixed: '60.000,00',
        multiple: 2,
        quantity: 4,
        profitability: 'high'
      }
    ],
    date: 1549965600,
    profitability: 'high'
  },
  {
    id: 2,
    customer: { id: 3, name: 'Luke Skywalker' },
    products: [
      {
        id: 4,
        name: 'TIE​ ​Fighter',
        price: '75.000,00',
        priceFixed: '75.000,00',
        multiple: 2,
        quantity: 2,
        profitability: 'medium'
      }
    ],
    date: 1550136000,
    profitability: 'medium'
  }
];
