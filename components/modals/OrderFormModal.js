import { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

import FocusLock from 'react-focus-lock';

import Modal from './Modal';
import OrderFormContainer from '../../containers/OrderFormContainer';
import { ErrorModal } from '../common/Error';

const ModalContent = ({ title, onClose, ...props }) => {
  const [isError, setError] = useState(false);

  const handleError = value => {
    setError(value);
  };

  return (
    <Modal title={title} onClose={onClose}>
      <OrderFormContainer
        title={title}
        onClose={onClose}
        handleError={handleError}
        {...props}
      />
      <ErrorModal isError={isError} onClose={handleError} />
    </Modal>
  );
};

const OrderFormModal = ({
  token,
  title,
  customer,
  products,
  onClose,
  onSave
}) => {
  const escModal = event => {
    if (event.keyCode === 27) onClose();
  };

  useLayoutEffect(() => {
    window.addEventListener('keydown', escModal, false);
    return () => {
      window.removeEventListener('keydown', escModal, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <FocusLock>
      <ModalContent
        token={token}
        title={title}
        customer={customer}
        products={products}
        onClose={onClose}
        onSave={onSave}
      />
    </FocusLock>,
    document.body
  );
};

export default OrderFormModal;
