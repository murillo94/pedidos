import { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import FocusLock from 'react-focus-lock';

import EditRequestForm from './EditRequestForm';
import Button from './Button';

import profitabilityOptions from '../utils/ProfitabilityOptions';
import { white, gray, lightGray, green } from '../styles/Colors';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    customer: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
      .required('Informe um cliente'),
    products: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.array()
            .of(
              Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required()
              })
            )
            .required('Obrigatório'),
          quantity: Yup.string().required('Obrigatório'),
          price: Yup.string().required('Obrigatório')
        })
      )
      .required('Informe um produto')
  }),
  mapPropsToValues: ({ customer, products }) => ({
    customer: customer || [],
    products: products || []
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onRequestClose();
  },
  displayName: 'Modal'
});

const Modal = props => {
  const {
    title,
    onRequestClose,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    isSubmitting
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
        <EditRequestForm
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
        <Footer {...{ onRequestClose, isSubmitting }} />
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
            height: 550px;
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

          @media (max-width: 1024px) {
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

const Footer = ({ onRequestClose, isSubmitting }) => {
  const modalRef = useRef();

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
          <span>2</span>
        </div>
        <div className="info">
          Total:
          <span>R$ 4,42</span>
          <span className="profitability">$</span>
        </div>
      </div>
      <div>
        <Button text="Cancelar" onClick={onRequestClose} refs={modalRef} />
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

          .profitability {
            font-size: 13px;
            color: ${profitabilityOptions.border.high};
            background-color: ${profitabilityOptions.backgroundColor.high};
            border-radius: 100px;
            padding: 1px 5px;
          }
        `}
      </style>
    </footer>
  );
};

const ModalForm = formikEnhancer(Modal);

const EditRequestModal = ({ title, onRequestClose }) => {
  const escModal = event => {
    if (event.keyCode === 27) onRequestClose();
  };

  useLayoutEffect(() => {
    window.addEventListener('keydown', escModal, false);
    return () => {
      window.removeEventListener('keydown', escModal, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <FocusLock>
      <ModalForm title={title} onRequestClose={onRequestClose} />
    </FocusLock>,
    document.body
  );
};

export default EditRequestModal;
