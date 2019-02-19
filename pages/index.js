import Page from '../layouts/Page';

import EditOrderProvider from '../contexts/EditOrder';

import Header from '../components/Header';
import List from '../components/List';

import Get from '../services/Get';

const Order = ({ data }) => (
  <EditOrderProvider>
    <Page>
      <Header title="Pedidos" subTitle={`${data.length} pedidos no total`} />
      <List data={data} />
    </Page>
  </EditOrderProvider>
);

Order.getInitialProps = async () => {
  const data = await Get('orders', 'date');
  return { data };
};

export default Order;
