import { memo } from 'react';

import { white, gray } from '../../styles/Colors';

const Button = memo(
  ({
    type = 'button',
    disabled = false,
    text = '',
    fontSize = 14,
    fontColor = 'inherit',
    backgroundColor = white,
    borderColor = gray,
    marginLeft = 0,
    paddingVertical = 10,
    paddingHorizontal = 20,
    isEdit = false,
    onClick,
    refs = null
  }) => (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        ref={refs}
        data-testid="button"
      >
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
            padding: ${paddingVertical}px ${paddingHorizontal}px;
            margin-left: ${marginLeft}px;
            cursor: pointer;
          }

          button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          @media (max-width: 600px) {
            button {
              ${isEdit && 'margin: 15px -10px 0; padding: 10px'};
            }
          }
        `}
      </style>
    </>
  )
);

export default Button;
