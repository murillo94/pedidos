import { white, gray } from '../styles/Colors';

const Button = ({
  type = 'button',
  disabled = false,
  text = '',
  fontSize = 14,
  fontColor = 'inherit',
  backgroundColor = white,
  borderColor = gray,
  marginLeft = 0,
  onClick,
  refs = null
}) => (
  <>
    <button type={type} disabled={disabled} onClick={onClick} ref={refs}>
      {text}
    </button>

    <style jsx>
      {`
        button {
          font-size: ${fontSize}px;
          font-weight: 500;
          color: ${fontColor};
          background-color: ${backgroundColor};
          border: 1px solid ${borderColor};
          box-shadow: none;
          border-radius: 4px;
          padding: 10px 20px;
          margin-left: ${marginLeft}px;
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }
      `}
    </style>
  </>
);

export default Button;
