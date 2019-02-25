import ValidateOrderForm from '../ValidateOrderForm';
import { orders } from '../../scripts/data';

const fixOrder = () => {
  if (orders) {
    orders[0].products[0].name = [
      {
        name: orders[0].products[0].name.toString(),
        id: orders[0].products[0].id
      }
    ];
  }
};

const isValid = value => {
  return ValidateOrderForm().validate(value);
};

test('Validando regras do pedido', () => {
  fixOrder();

  expect(isValid(orders[0])).toBeTruthy();
});
