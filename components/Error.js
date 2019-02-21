import { ErrorMessage } from 'formik';

import { red } from '../styles/Colors';

export const ErrorContainer = ({ message }) => (
  <div>
    {message}

    <style jsx>
      {`
        div {
          font-size: 14px;
          color: ${red};
          margin-top: 7px;
        }
      `}
    </style>
  </div>
);

export const Error = ({ name }) => (
  <ErrorMessage
    name={name}
    render={message => <ErrorContainer message={message} />}
  />
);
