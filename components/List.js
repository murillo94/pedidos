import { useState } from 'react';

import { white, darkGray } from '../styles/Colors';

import Profitability from './Profitability';
import Button from './Button';
import EditOrderModal from './EditOrderModal';

import { profitabilityOptions } from '../utils/Profitability';

const Item = ({
  customer = [],
  profitability = null,
  products = [],
  token = '',
  total = products.length || 0,
  handleEditItem
}) => (
  <>
    <div
      className="item"
      style={{ borderColor: profitabilityOptions.border[profitability] }}
    >
      <div className="info">
        <div>
          <div className="title">{customer[0].name}</div>
          <div className="subTitle">
            {total !== 1 ? `${total} produtos` : `${total} produto`}
          </div>
        </div>
        <Profitability
          value={profitability}
          message={profitabilityOptions.text[profitability]}
          style={{ padding: '4px 10px', margin: '0 15px' }}
        />
      </div>
      <Button
        text="Editar"
        fontSize={13}
        fontColor={darkGray}
        borderColor="transparent"
        onClick={() => handleEditItem(customer, products, token)}
      />
    </div>

    <style jsx>
      {`
        .item {
          background-color: ${white};
          border-top-width: 3px;
          border-top-style: solid;
          border-radius: 4px;
          box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.05);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1.4;
        }

        .item:not(:last-child) {
          margin-bottom: 30px;
        }

        .info {
          display: flex;
          align-items: flex-start;
        }

        .title {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 6px;
        }

        .subTitle {
          font-size: 13px;
          color: ${darkGray};
          margin: 0;
        }
      `}
    </style>
  </>
);

const List = ({ data = [], isLoading, isError, onSave }) => {
  const [isOpen, setOpen] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();

  const handleEditItem = (valueCustomer, valueProducts, valueToken) => {
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
          <Item
            key={token}
            {...{ customer, profitability, products, token, handleEditItem }}
          />
        ))}
        {isOpen && (
          <EditOrderModal
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

export default List;
