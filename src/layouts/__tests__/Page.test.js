import { render } from 'react-testing-library';

import Page from '../Page';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Page />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá aceitar componentes filhos', () => {
  const { queryByText } = render(
    <Page>
      <h1>Pedidos</h1>
    </Page>
  );

  expect(queryByText('Pedidos')).toBeInTheDocument();
});
