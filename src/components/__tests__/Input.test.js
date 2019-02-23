import { render } from 'react-testing-library';

import Input from '../common/Input';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Input className="input" />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá ter atributo type text', () => {
  const { getByTestId } = render(<Input className="input" />);

  expect(getByTestId('input')).toHaveAttribute('type', 'text');
});

test('Componente deverá ter placeholder', () => {
  const { getByPlaceholderText } = render(
    <Input className="input" placeholder="Digite algo" />
  );

  expect(getByPlaceholderText('Digite algo')).toBeInTheDocument();
});

test('Componente deverá ter valor com formatação', () => {
  const { getByTestId } = render(
    <form data-testid="form">
      <Input className="input" name="money" value="123" isMoney />
    </form>
  );

  expect(getByTestId('form')).toHaveFormValues({ money: 'R$ 123' });
});

test('Componente deverá ser do tipo money e exibir erro', () => {
  const form = {
    errors: {
      products: [
        {
          profitability: 'low'
        }
      ]
    }
  };

  const { getByTestId } = render(
    <Input
      className="input"
      name="money"
      value="123"
      isMoney
      keyExtractor={0}
      {...{ form }}
    />
  );

  expect(getByTestId('error-input-container')).toHaveTextContent(
    'Rentabilidade ruim'
  );
});
