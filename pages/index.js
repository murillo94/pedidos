import { Component } from 'react';
import Page from '../layouts/Page';

import EditOrderProvider from '../contexts/EditOrder';

import Header from '../components/Header';
import List from '../components/List';

import Get from '../services/Get';

export default class Order extends Component {
  static async getInitialProps() {
    const data = await Get('requests', 'date');

    return { data };
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
