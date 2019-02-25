import { render } from 'react-testing-library';

import Meta from '../common/Meta';

test('Componente deverá ser renderizado', () => {
  const { container } = render(<Meta />);

  expect(container).toBeInTheDocument();
});
