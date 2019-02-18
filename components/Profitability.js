import { profitabilityOptions } from '../utils/Profitability';

const Profitability = ({ value = 'high', message = '$', ...props }) => (
  <>
    <span {...props}>{message}</span>

    <style jsx>
      {`
        span {
          font-size: 13px;
          color: ${profitabilityOptions.border[value]};
          background-color: ${profitabilityOptions.backgroundColor[value]};
          border-radius: 100px;
          text-align: center;
          padding: 1px 5px;
        }
      `}
    </style>
  </>
);

export default Profitability;
