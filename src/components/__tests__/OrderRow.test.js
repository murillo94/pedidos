import { render, fireEvent } from 'react-testing-library';

import OrderRow from '../rows/OrderRow';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<OrderRow />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá ter um texto nome do pedido', () => {
  const { queryByText } = render(<OrderRow customer={[{ name: 'Murillo' }]} />);

  expect(queryByText('Murillo')).toBeInTheDocument();
});

test('Componente deverá ter um texto quantidade de produtos no plural', () => {
  const { queryByText } = render(
    <OrderRow
      products={[{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]}
    />
  );

  expect(queryByText('4 produtos')).toBeInTheDocument();
});

test('Componente deverá ter um texto quantidade de produtos no singular', () => {
  const { queryByText } = render(<OrderRow products={[{ name: '1' }]} />);

  expect(queryByText('1 produto')).toBeInTheDocument();
});

test('Componente deverá ter um texto de rentabilidade', () => {
  const { queryByText } = render(<OrderRow profitability="high" />);

  expect(queryByText('Rentabilidade ótima')).toBeInTheDocument();
});

test('Componente deverá ter um botão', () => {
  const { queryByText } = render(<OrderRow />);

  expect(queryByText('Editar')).toBeInTheDocument();
});

test('Componente deverá chamar botão', () => {
  const onClick = jest.fn();
  const { queryByText } = render(<OrderRow handleEdit={onClick} />);

  fireEvent.click(queryByText('Editar'));
  expect(onClick).toHaveBeenCalledTimes(1);
});
