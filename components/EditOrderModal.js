import { useRef, useLayoutEffect, memo } from 'react';
import ReactDOM from 'react-dom';

import isCurrency from 'validator/lib/isCurrency';
import Dinero from 'dinero.js';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import FocusLock from 'react-focus-lock';

import EditOrderForm from './EditOrderForm';
import Profitability from './Profitability';
import Button from './Button';

import { profitabilityTypeWithArray } from '../utils/Profitability';
import { white, gray, lightGray, green } from '../styles/Colors';

import Put from '../services/Put';

const formikEnhancer = withFormik({
  validationSchema: () =>
    Yup.object().shape({
      customer: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.string().required(),
            id: Yup.number().required()
          })
        )
        .required('Informe um cliente'),
      products: Yup.array()
        .of(
          Yup.object().shape({
            profitability: Yup.string()
              .matches(/(high|medium)/, 'Rentabilidade ruim')
              .required('Rentabilidade ruim'),
            name: Yup.array()
              .of(
                Yup.object().shape({
                  name: Yup.string().required(),
                  id: Yup.number().required()
                })
              )
              .required('Obrigatório'),
            quantity: Yup.number()
              .transform(value => (isNaN(value) ? undefined : value))
              .integer('Necessário ser inteiro')
              .min(1, 'Necessário ser maior ou igual a 1')
              .required('Obrigatório'),
            price: Yup.string()
              .test('price', 'Necessário ter 2 casas decimais', value => {
                const money = value || 0;

                const teste = isCurrency(
                  money.toString().replace(/R\$ /g, ''),
                  {
                    symbol: '$',
                    require_symbol: false,
                    allow_space_after_symbol: false,
                    symbol_after_digits: false,
                    allow_negatives: false,
                    parens_for_negatives: false,
                    negative_sign_before_digits: false,
                    negative_sign_after_digits: false,
                    allow_negative_sign_placeholder: false,
                    thousands_separator: '.',
                    decimal_separator: ',',
                    allow_decimal: true,
                    require_decimal: true,
                    digits_after_decimal: [2],
                    allow_space_after_digits: false
                  }
                );

                return teste;
              })
              .test(
                'moreThan',
                'Necessário ser maior que 0',
                value =>
                  parseFloat(value.replace(/R\$ /g, '').replace(/,/g, '.')) > 0
              )
              .required('Obrigatório')
          })
        )
        .required('Informe um produto')
    }),
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

    await Put('orders', token, data);

    props.onClose();
  },
  displayName: 'Modal'
});

const Modal = props => {
  const {
    title,
    onClose,
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

const ModalForm = formikEnhancer(Modal);

const EditOrderModal = ({ token, title, onClose, customer, products }) => {
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
        onClose={onClose}
      />
    </FocusLock>,
    document.body
  );
};

export default EditOrderModal;
