import { white, darkGray } from '../styles/Colors';

import Button from './Button';

import profitabilityOptions from '../utils/ProfitabilityOptions';

const Item = ({ id, name, profitability, total }) => (
  <>
    <div
      className="item"
      style={{ borderColor: profitabilityOptions.border[profitability] }}
      key={id}
    >
      <div className="info">
        <div>
          <div className="title">{name}</div>
          <div className="subTitle">
            {total !== 1 ? `${total} produtos` : `${total} produto`}
          </div>
        </div>
        <div
          className="profitability"
          style={{
            color: profitabilityOptions.border[profitability],
            backgroundColor: profitabilityOptions.backgroundColor[profitability]
          }}
        >
          {profitabilityOptions.text[profitability]}
        </div>
      </div>
      <Button text="Editar" fontSize={13} fontColor={darkGray} border="none" />
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

        .profitability {
          font-size: 13px;
          background-color: #f7d196;
          border-radius: 100px;
          padding: 5px 10px;
          margin-left: 15px;
        }
      `}
    </style>
  </>
);

const List = ({ data }) => {
  if (data.length > 0) {
    return (
      <>
        {data.map(({ id, name, profitability, total }) => (
          <Item {...{ id, name, profitability, total }} />
        ))}
      </>
    );
  }

  return (
    <div>
      Você não possui pedidos.
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
