import ValidateOrderForm from '../ValidateOrderForm';
import { orders } from '../../scripts/data';

const isValid = value => {
  return ValidateOrderForm().validate(value);
};

test('Validando regras do pedido', () => {
  if (orders) {
    orders[0].products[0].name = [
      { name: orders[0].products[0].name, id: orders[0].products[0].id }
    ];
  }

  expect(isValid(orders[0])).toBeTruthy();
});
