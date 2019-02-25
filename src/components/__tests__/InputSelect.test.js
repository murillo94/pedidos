import { render, fireEvent } from 'react-testing-library';

import InputSelect from '../common/InputSelect';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<InputSelect name="teste" />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá ter atributo type text', () => {
  const { getByDisplayValue } = render(<InputSelect name="teste" />);

  expect(getByDisplayValue('')).toHaveAttribute('type', 'text');
});

test('Componente deverá ter placeholder', () => {
  const { queryByText } = render(
    <InputSelect name="teste" placeholder="Escolha uma opção" />
  );

  expect(queryByText('Escolha uma opção')).toBeInTheDocument();
});

test('Componente deverá ter mostrar texto de não encontrado quando pesquisa não encontrar nada', () => {
  const { queryByText, getByDisplayValue } = render(
    <InputSelect name="teste" />
  );

  fireEvent.change(getByDisplayValue(''), { target: { value: 'teste' } });
  expect(queryByText('teste não encontrado')).toBeInTheDocument();
});
