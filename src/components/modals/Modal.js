import { useRef, useLayoutEffect } from 'react';

import Button from '../common/Button';

import { white, gray, lightGray } from '../../styles/Colors';

const Header = ({ title, onClose }) => {
  const modalRef = useRef();

  useLayoutEffect(() => {
    modalRef.current.focus();
    return () => {
      modalRef.current.blur();
    };
  }, []);

  return (
    <header>
      <h3>{title}</h3>
      <Button
        text="X"
        fontSize={13}
        backgroundColor="transparent"
        borderColor="transparent"
        paddingHorizontal={10}
        refs={modalRef}
        onClick={onClose}
      />

      <style jsx>
        {`
          header {
            padding: 20px 15px;
            background-color: ${lightGray};
            border: 1px solid ${gray};
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          h3 {
            margin: 0;
          }
        `}
      </style>
    </header>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="backdrop" data-testid="modal">
    <div className="container">
      <Header title={title} onClose={onClose} />
      {children}
    </div>

    <style jsx>
      {`
        .backdrop {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background-color: rgba(15, 43, 73, 0.25);
          display: grid;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: auto;
        }

        .container {
          position: relative;
          background-color: ${white};
          border-radius: 4px;
          min-height: 0;
          height: 580px;
          width: 680px;
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .container {
            height: 100%;
            width: 100%;
          }
        }
      `}
    </style>
  </div>
);

export default Modal;
