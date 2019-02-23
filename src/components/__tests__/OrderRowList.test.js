import { render } from 'react-testing-library';

import OrderRowList from '../rows/OrderRowList';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<OrderRowList />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá ter texto de carregamento', () => {
  const { queryByText } = render(<OrderRowList isLoading />);

  expect(queryByText('Carregando...')).toBeInTheDocument();
});

test('Componente deverá ter texto de erro', () => {
  const { queryByText } = render(<OrderRowList isError />);

  expect(
    queryByText('Algo deu errado, tente novamamente.')
  ).toBeInTheDocument();
});

test('Componente deverá ter texto de lista vazia', () => {
  const { queryByText } = render(<OrderRowList data={[]} />);

  expect(queryByText('Você não possui pedidos.')).toBeInTheDocument();
});

test('Componente deverá renderizar lista', () => {
  const { getAllByTestId } = render(
    <OrderRowList
      data={[
        { token: 1, customer: [{ name: 'Murillo' }] },
        { token: 2, customer: [{ name: 'Karol' }] }
      ]}
    />
  );
  const orderNames = getAllByTestId('order-row-name').map(x => x.textContent);

  expect(orderNames).toMatchInlineSnapshot(`
Array [
  "Murillo",
  "Karol",
]
`);
});
