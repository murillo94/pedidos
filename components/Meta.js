import Head from 'next/head';

import { lightGray, black, blue, gray, darkGray } from '../styles/Colors';

const Meta = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <link rel="apple-touch-icon" href="../static/favicon.ico" />
      <link rel="shortcut icon" href="../static/favicon.ico" />

      <title>Pedidos - Teste técnico Mercos</title>
    </Head>

    <style jsx global>
      {`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          background-color: ${lightGray};
          color: ${black};
          width: 800px;
          margin: 0 auto;
          line-height: 1.3;
          padding: 40px;
        }

        button:focus,
        input:focus:not(#select-id) {
          outline: 0 !important;
          border-color: ${blue} !important;
          box-shadow: 0 0 0 2px ${blue} !important;
          transition: box-shadow 0.12s !important;
        }

        input:not(#select-id) {
          font-size: 15px;
          color: ${black};
          height: 38px;
          width: 100%;
          border: 1px solid ${gray};
          border-radius: 4px;
          padding: 9px;
          box-sizing: border-box;
          transition: all 0.12s;
        }

        input:hover:not(#select-id) {
          border: 1px solid ${darkGray};
        }

        input[type='number']::-webkit-outer-spin-button,
        input[type='number']::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }

        ::placeholder {
          color: ${darkGray};
        }

        @media (max-width: 1024px) {
          body {
            width: auto;
          }
        }
      `}
    </style>
  </>
);

export default Meta;
