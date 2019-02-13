import { gray } from '../styles/Colors';

const Button = ({
  text = '',
  fontSize = 14,
  fontColor = 'inherit',
  border = `1px solid ${gray}`,
  onClick
}) => (
  <>
    <button type="submit" onClick={onClick}>
      {text}
    </button>

    <style jsx>
      {`
        button {
          font-size: ${fontSize}px;
          font-weight: 500;
          color: ${fontColor};
          border: ${border};
          box-shadow: none;
          border-radius: 4px;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}
    </style>
  </>
);

export default Button;
