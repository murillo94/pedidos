import { render } from 'react-testing-library';

import Label from '../common/Label';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Label />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá ter um texto', () => {
  const { getByLabelText } = render(
    <Label text="Nome" id="name">
      <input id="name" />
    </Label>
  );

  expect(getByLabelText('Nome')).toBeInTheDocument();
});

test('Componente deverá conter um atributo for', () => {
  const { getByTestId } = render(
    <Label text="Nome" id="name">
      <input id="name" />
    </Label>
  );

  expect(getByTestId('label')).toHaveAttribute('for', 'name');
});
