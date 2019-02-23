import Profitability from '../common/Profitability';
import Button from '../common/Button';

import { white, darkGray } from '../../styles/Colors';

import { profitabilityOptions } from '../../utils/Profitability';

const OrderRow = ({
  customer = [],
  profitability = 'medium',
  products = [],
  token = '',
  total = products.length || 0,
  handleEdit
}) => (
  <>
    <div className="item">
      <div className="info">
        <div>
          <div className="title" data-testid="order-row-name">
            {customer.length ? customer[0].name : ''}
          </div>
          <div className="sub-title">
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
        onClick={() => handleEdit(customer, products, token)}
      />
    </div>

    <style jsx>
      {`
        .item {
          background-color: ${white};
          border-top-width: 3px;
          border-top-style: solid;
          border-color: ${profitabilityOptions.border[profitability]};
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

        .sub-title {
          font-size: 13px;
          color: ${darkGray};
          margin: 0;
        }
      `}
    </style>
  </>
);

export default OrderRow;
