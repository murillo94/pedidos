import { render, fireEvent } from 'react-testing-library';

import Modal from '../modals/Modal';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Modal />);

  expect(container).toBeInTheDocument();
});

test('Componente deverá conter um texto title', () => {
  const { queryByText } = render(<Modal title="Editar" />);

  expect(queryByText('Editar')).toBeInTheDocument();
});

test('Componente deverá conter um texto title', () => {
  const { queryByText } = render(<Modal title="Editar" />);

  expect(queryByText('Editar')).toBeInTheDocument();
});

test('Componente deverá ter um botão', () => {
  const { queryByText } = render(<Modal />);

  expect(queryByText('X')).toBeInTheDocument();
});

test('Componente deverá chamar botão', () => {
  const onClick = jest.fn();
  const { queryByText } = render(<Modal onClose={onClick} />);

  fireEvent.click(queryByText('X'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Componente ao abrir deverá ter foco no botão', () => {
  const { queryByText } = render(<Modal />);

  expect(queryByText('X')).toHaveFocus();
});

test('Componente deverá ter classe backdrop', () => {
  const { getByTestId } = render(<Modal />);

  expect(getByTestId('modal')).toHaveClass('backdrop');
});
