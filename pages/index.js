import { Component } from 'react';
import Page from '../layouts/Page';

import EditOrderProvider from '../contexts/EditOrder';

import Header from '../components/Header';
import List from '../components/List';

import GetOrders from '../services/GetOrders';

export default class Order extends Component {
  static async getInitialProps() {
    const result = await GetOrders();

    return { data: result };
  }

  render() {
    const { data } = this.props;

    return (
      <EditOrderProvider>
        <Page>
          <Header
            title="Pedidos"
            subTitle={`${data.length} pedidos no total`}
          />
          <List data={data} />
        </Page>
      </EditOrderProvider>
    );
  }
}
