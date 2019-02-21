import NumberFormat from 'react-number-format';

import { ErrorContainer, Error } from './Error';

const Input = ({
  field,
  type = 'text',
  placeholder,
  width,
  keyExtractor,
  isMoney,
  form,
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
          />
          {form.errors &&
          form.errors.products &&
          form.errors.products[keyExtractor] &&
          form.errors.products[keyExtractor].profitability &&
          !form.errors.products[keyExtractor].price ? (
            <ErrorContainer message="Rentabilidade ruim" />
          ) : null}
        </>
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}

      <Error name={field.name} />

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
};

export default Input;
