import { useState, memo } from 'react';

import Button from './Button';
import OrderFormModal from '../modals/OrderFormModal';

import { darkGray } from '../../styles/Colors';

const Header = memo(({ title, subTitle, onSave }) => {
  const [isOpen, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <header data-testid="header">
      <div>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <div>
        <Button text="Adicionar" onClick={handleModal} />
      </div>

      {isOpen && (
        <OrderFormModal
          title="Adicionar pedido"
          onClose={handleModal}
          onSave={onSave}
        />
      )}

      <style jsx>
        {`
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 45px;
          }

          h1 {
            font-size: 28px;
            margin: 0 0 6px;
          }

          h2 {
            font-size: 16px;
            color: ${darkGray};
            margin: 0;
          }
        `}
      </style>
    </header>
  );
});

export default Header;
