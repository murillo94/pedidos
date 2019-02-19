import { useState } from 'react';

import Button from './Button';
import EditOrderModal from './EditOrderModal';

import { darkGray } from '../styles/Colors';

const Header = ({ title, subTitle, onSave }) => {
  const [isOpen, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      <div>
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <div>
        <Button text="Adicionar" onClick={handleModal} />
      </div>

      {isOpen && (
        <EditOrderModal
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
};

export default Header;
