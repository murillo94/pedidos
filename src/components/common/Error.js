import { memo } from 'react';

import { ErrorMessage } from 'formik';

import Button from './Button';

import { red, white, green } from '../../styles/Colors';

export const ErrorInputContainer = memo(({ message }) => (
  <div data-testid="error-input-container">
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
));

export const ErrorInput = memo(({ name }) => (
  <ErrorMessage
    name={name}
    render={message => <ErrorInputContainer message={message} />}
  />
));

export const ErrorModal = memo(({ isError, onClose }) => (
  <>
    {isError ? (
      <div className="backdrop" data-testid="error-modal">
        <div className="container">
          <p>Algo deu errado, tente novamamente.</p>
          <Button
            type="submit"
            text="Fechar"
            fontColor={white}
            backgroundColor={green}
            onClick={() => onClose(false)}
          />
        </div>

        <style jsx>
          {`
            .backdrop {
              background-color: rgba(15, 43, 73, 0.35);
              position: absolute;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .container {
              background-color: ${white};
              border-radius: 4px;
              padding: 30px 20px;
              height: 130px;
              width: 290px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            }

            p {
              font-size: 17px;
              font-weight: 500;
              text-align: center;
              margin: 0 0 20px;
            }

            @media (max-width: 768px) {
              .container {
                width: 80%;
              }
            }
          `}
        </style>
      </div>
    ) : null}
  </>
));
