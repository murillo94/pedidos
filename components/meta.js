import Head from 'next/head';

const Meta = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      <link rel="shortcut icon" href="../static/favicon.ico" />
    </Head>

    <style jsx global>
      {`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          margin: 0;
        }
      `}
    </style>
  </>
);

export default Meta;
