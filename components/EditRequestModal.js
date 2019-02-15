import { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import FocusLock from 'react-focus-lock';

import EditRequestForm from './EditRequestForm';
import Button from './Button';

import { white, gray, lightGray, green } from '../styles/Colors';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    customer: Yup.array()
      .required('Informe um cliente')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      ),
    products: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.array()
            .required('Obrigatório')
            .of(
              Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required()
              })
            ),
          quantity: Yup.number().required('Obrigatório'),
          price: Yup.number().required('Obrigatório')
        })
      )
      .required('Informe um produto')
  }),
  mapPropsToValues: () => ({
    customer: [],
    products: []
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
          .backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(15, 43, 73, 0.25);
            display: grid;
            justify-content: center;
            align-items: center;
            overflow: auto;
          }

          .container {
            position: relative;
            background-color: ${white};
            border-radius: 4px;
            min-height: 550px;
            width: 600px;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            overflow: hidden;
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
          flex-shrink: 0;
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
      <Button text="Cancelar" onClick={onRequestClose} refs={modalRef} />
      <Button
        type="submit"
        text="Salvar"
        fontColor={white}
        backgroundColor={green}
        marginLeft={10}
        disabled={isSubmitting}
      />

      <style jsx>
        {`
          footer {
            flex-shrink: 0;
            padding: 20px 15px;
            background-color: ${lightGray};
            border: 1px solid ${gray};
            display: flex;
            justify-content: flex-end;
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
