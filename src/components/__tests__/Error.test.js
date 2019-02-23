import { render } from 'react-testing-library';

import { ErrorInputContainer, ErrorModal } from '../common/Error';

describe('ErrorInputContainer', () => {
  test('Componente deverá ser renderizado', () => {
    const { container } = render(<ErrorInputContainer />);

    expect(container).toBeInTheDocument();
  });

  test('Componente deverá conter um texto', () => {
    const { getByTestId } = render(
      <ErrorInputContainer message="Algo de errado aconteceu." />
    );

    expect(getByTestId('error-input-container')).toHaveTextContent(
      'Algo de errado aconteceu.'
    );
  });
});

describe('ErrorModal', () => {
  test('Componente deverá ser renderizado', () => {
    const { container } = render(<ErrorModal />);

    expect(container).toBeInTheDocument();
  });

  test('Componente deverá ter um texto', () => {
    const { getByTestId } = render(<ErrorModal isError />);

    expect(getByTestId('error-modal')).toHaveTextContent(
      'Algo deu errado, tente novamamente.'
    );
  });
});
