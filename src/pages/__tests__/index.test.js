import { render } from 'react-testing-library';

import Order from '../index';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Order />);

  expect(container).toBeInTheDocument();
});

test('Componente possui filhos em seu corpo e deve ter um texto main', () => {
  const { queryByText } = render(<Order />);

  expect(queryByText('Pedidos')).toBeInTheDocument();
});

test('Componente possui filhos em seu corpo e deve ter um botão', () => {
  const { getByTestId } = render(<Order />);

  expect(getByTestId('button')).toBeInTheDocument();
});
