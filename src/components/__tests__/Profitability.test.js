import { render } from 'react-testing-library';

import Profitability from '../common/Profitability';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Profitability />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá conter um texto padrão', () => {
  const { queryByText } = render(<Profitability />);

  expect(queryByText('$')).toBeInTheDocument();
});

test('Componente deverá conter um texto', () => {
  const { queryByText } = render(<Profitability message="Rentabilidade boa" />);

  expect(queryByText('Rentabilidade boa')).toBeInTheDocument();
});
