import { useState } from 'react';

import OrderRow from './OrderRow';

import { darkGray } from '../../styles/Colors';

import OrderFormModal from '../modals/OrderFormModal';

const OrderRowList = ({
  data = [],
  isLoading = false,
  isError = false,
  onSave
}) => {
  const [isOpen, setOpen] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();

  const handleEdit = (valueCustomer, valueProducts, valueToken) => {
    setCustomer(valueCustomer);
    setProducts(valueProducts);
    setToken(valueToken);
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setOpen(!isOpen);
  };

  if (data.length > 0) {
    return (
      <>
        {data.map((
          { customer, profitability, products, token } // eslint-disable-line no-shadow
        ) => (
          <OrderRow
            key={token}
            {...{ customer, profitability, products, token, handleEdit }}
          />
        ))}
        {isOpen && (
          <OrderFormModal
            token={token}
            title="Editar pedido"
            customer={customer}
            products={products}
            onClose={handleClose}
            onSave={onSave}
          />
        )}
      </>
    );
  }

  return (
    <div>
      {isLoading
        ? 'Carregando...'
        : isError
        ? 'Algo deu errado, tente novamamente.'
        : 'Você não possui pedidos.'}

      <style jsx>
        {`
          div {
            font-size: 16px;
            font-weight: 500;
            color: ${darkGray};
            text-align: center;
            margin: 80px 0;
          }
        `}
      </style>
    </div>
  );
};

export default OrderRowList;
