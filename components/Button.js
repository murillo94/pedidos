import { white, gray, blue } from '../styles/Colors';

const Button = ({
  type = 'button',
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
    <button type={type} onClick={onClick} ref={refs}>
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

        button:focus {
          outline: 0;
          border-color: ${blue};
          box-shadow: 0 0 0 2px ${blue};
        }
      `}
    </style>
  </>
);

export default Button;
