/* eslint-disable jsx-a11y/label-has-for */

const Label = ({ text, id, children }) => (
  <div>
    <label htmlFor={id} data-testid="label">
      {text}
    </label>
    {children}

    <style jsx>
      {`
        div {
          margin-bottom: 25px;
        }

        label {
          font-size: 16px;
          font-weight: 500;
          display: block;
          margin-bottom: 7px;
        }
      `}
    </style>
  </div>
);

export default Label;
