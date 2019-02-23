import { render } from 'react-testing-library';

import Header from '../common/Header';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Header />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá conter um texto title', () => {
  const { getByTestId } = render(<Header title="Produtos" />);

  expect(getByTestId('header')).toHaveTextContent('Produtos');
});

test('Componente deverá conter um texto subTitle', () => {
  const { getByTestId } = render(<Header subTitle="0 produtos" />);

  expect(getByTestId('header')).toHaveTextContent('0 produtos');
});

test('Componente deverá conter botão', () => {
  const { queryByText } = render(<Header />);

  expect(queryByText('Adicionar')).toHaveAttribute('type', 'button');
});
