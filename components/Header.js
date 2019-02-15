import { useState } from 'react';

import Button from './Button';
import EditRequestModal from './EditRequestModal';

import { darkGray } from '../styles/Colors';

const Header = ({ title, subTitle }) => {
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
        <EditRequestModal
          title="Adicionar pedido"
          onRequestClose={handleModal}
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
