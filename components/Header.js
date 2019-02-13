import { darkGray } from '../styles/Colors';

const Header = ({ title, subTitle, children }) => (
  <header>
    <div>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </div>
    {children && <div>{children}</div>}

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

export default Header;
