import { memo } from 'react';

import NumberFormat from 'react-number-format';

import { ErrorInputContainer, ErrorInput } from './Error';

const Input = memo(
  ({
    field = {},
    type = 'text',
    placeholder,
    width,
    keyExtractor,
    isMoney,
    profitability,
    ...props
  }) => {
    return (
      <div>
        {isMoney ? (
          <>
            <NumberFormat
              {...field}
              {...props}
              type={type}
              placeholder={placeholder}
              prefix="R$ "
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              allowNegative={false}
              autoComplete="off"
              data-testid="input"
            />
            {profitability === 'low' ? (
              <ErrorInputContainer message="Rentabilidade ruim" />
            ) : null}
          </>
        ) : (
          <input
            {...field}
            {...props}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
            data-testid="input"
          />
        )}

        <ErrorInput name={field.name} />

        <style jsx>
          {`
            div {
              margin-right: 10px;
              width: ${width};
            }
          `}
        </style>
      </div>
    );
  }
);

export default Input;
