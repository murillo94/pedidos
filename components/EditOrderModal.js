import { useState, useRef, useLayoutEffect, memo } from 'react';
import ReactDOM from 'react-dom';

import { withFormik } from 'formik';
import Dinero from 'dinero.js';
import FocusLock from 'react-focus-lock';

import EditOrderForm from './EditOrderForm';
import Profitability from './Profitability';
import Button from './Button';

import ValidationForm from '../utils/ValidationForm';
import { profitabilityTypeWithArray } from '../utils/Profitability';
import { white, gray, lightGray, green } from '../styles/Colors';

import Put from '../services/Put';

const formikEnhancer = withFormik({
  validationSchema: () => ValidationForm(),
  mapPropsToValues: ({ token = '', customer = [], products = [] }) => ({
    token: token || '',
    customer: customer || [],
    products:
      products.map(x => ({
        ...x,
        name: [{ id: x.id, name: x.name }],
        priceFixed: x.price
      })) || []
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const { token, customer, products } = values;
      const customerFinal = customer.map(({ id, name }) => ({ id, name }));
      const productsFinal = products.map(x => ({
        ...x,
        name: x.name[0].name,
        quantity: Number(x.quantity)
      }));
      const profitability = profitabilityTypeWithArray(productsFinal);
      const data = {
        customer: customerFinal,
        products: productsFinal,
        profitability,
        date: Date.now()
      };

      const id = await Put('orders', token, data);
      await props.onSave({ ...data, token: id });

      props.onClose();
    } catch (error) {
      props.handleError(true);
    }
  },
  displayName: 'Modal'
});

const Modal = props => {
  const {
    title,
    onClose,
    isError,
    handleError,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    isValid
  } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop"
      tabIndex="-1"
      role="dialog"
      aria-label={title}
      aria-modal="true"
    >
      <div className="container">
        <Header title={title} />
        <EditOrderForm
          {...{
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched
          }}
        />
        <Footer {...{ onClose, values, isSubmitting, isValid }} />
        <Error isError={isError} onClose={handleError} />
      </div>

      <style jsx>
        {`
          form {
            outline: 0;
          }

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

          .overflow-container {
            flex: 1;
            overflow: auto;
          }

          .overflow-content {
            background-color: #ddd;
            padding: 20px;
          }

          @media (max-width: 768px) {
            .container {
              width: 100%;
            }
          }
        `}
      </style>
    </form>
  );
};

const Header = ({ title }) => (
  <header>
    <h3>{title}</h3>

    <style jsx>
      {`
        header {
          padding: 20px 15px;
          background-color: ${lightGray};
          border: 1px solid ${gray};
        }

        h3 {
          margin: 0;
        }
      `}
    </style>
  </header>
);

const Footer = memo(
  // eslint-disable-next-line no-unused-vars
  ({ onClose, values, isSubmitting, isValid }) => {
    const modalRef = useRef();

    const quantityTotal = values.products.reduce(
      (sum, { quantity }) => sum + Number(quantity),
      0
    );

    const priceTotal = values.products.reduce(
      (sum, { price }) => sum + Number(price.replace(/[^\d]/g, '')),
      0
    );

    const formatPriceTotal = Dinero({ amount: priceTotal })
      .toFormat('0,0.00')
      .replace(/,/g, '.')
      .replace(/.([^.]*)$/, ',$1');

    const profitabilityType = profitabilityTypeWithArray(values.products);

    useLayoutEffect(() => {
      modalRef.current.focus();
      return () => {
        modalRef.current.blur();
      };
    }, []);

    return (
      <footer>
        <div>
          <div className="info">
            Quantidade total:
            <span>{quantityTotal}</span>
          </div>
          <div className="info">
            Total:
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <span>R$ {formatPriceTotal}</span>
            <Profitability
              value={profitabilityType}
              style={{ marginLeft: 5, fontWeight: 500 }}
            />
          </div>
        </div>
        <div>
          <Button text="Cancelar" refs={modalRef} onClick={onClose} />
          <Button
            type="submit"
            text="Salvar"
            fontColor={white}
            backgroundColor={green}
            marginLeft={10}
            disabled={isSubmitting}
          />
        </div>

        <style jsx>
          {`
            footer {
              padding: 20px 15px;
              background-color: ${lightGray};
              border: 1px solid ${gray};
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .info {
              font-size: 15px;
            }

            .info:not(:last-child) {
              margin-bottom: 5px;
            }

            span {
              margin-left: 5px;
              font-weight: 500;
            }
          `}
        </style>
      </footer>
    );
  },
  (prevProps, newProps) => {
    return !newProps.isValid;
  }
);

const Error = ({ isError, onClose }) => (
  <>
    {isError ? (
      <div className="backdrop">
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
              height: 140px;
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
);

const ModalForm = formikEnhancer(Modal);

const EditOrderModal = ({
  token,
  title,
  customer,
  products,
  onClose,
  onSave
}) => {
  const [isError, setError] = useState(false);

  const handleError = value => {
    setError(value);
  };

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
      <ModalForm
        token={token}
        title={title}
        customer={customer}
        products={products}
        isError={isError}
        handleError={handleError}
        onClose={onClose}
        onSave={onSave}
      />
    </FocusLock>,
    document.body
  );
};

export default EditOrderModal;
