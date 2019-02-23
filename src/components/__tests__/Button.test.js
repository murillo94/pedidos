import { render, fireEvent } from 'react-testing-library';

import Button from '../common/Button';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Button />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá conter um texto vazio', () => {
  const { container } = render(<Button />);

  expect(container).toHaveTextContent('');
});

test('Componente deverá conter um texto', () => {
  const { container } = render(<Button text="Adicionar pedido" />);

  expect(container).toHaveTextContent('Adicionar pedido');
});

test('Componente deverá conter um atributo type submit', () => {
  const { getByTestId } = render(<Button type="submit" />);

  expect(getByTestId('button')).toHaveAttribute('type', 'submit');
});

test('Componente deverá ter atributo disabled ativo', () => {
  const { getByTestId } = render(<Button disabled />);

  expect(getByTestId('button')).toBeDisabled();
});

test('Componente deverá ter atributo disabled desativado', () => {
  const { getByTestId } = render(<Button />);

  expect(getByTestId('button')).toBeEnabled();
});

test('Componente deverá ter chamado ao ser clicado', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Button onClick={onClick} />);

  fireEvent.click(getByTestId('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Componente deverá ter foco', () => {
  const { getByTestId, container } = render(<Button />);

  container.querySelector('button').focus();
  expect(getByTestId('button')).toHaveFocus();
});
