import { Component } from 'react';
import Page from '../layouts/Page';

import Header from '../components/Header';
import Button from '../components/Button';
import List from '../components/List';

import GetRequests from '../services/GetRequests';

export default class Requests extends Component {
  static async getInitialProps() {
    const result = await GetRequests();

    return { data: result };
  }

  render() {
    const { data } = this.props;

    return (
      <Page>
        <Header title="Pedidos" subTitle={`${data.length} pedidos no total`}>
          <Button text="Adicionar" />
        </Header>
        <List data={data} />
      </Page>
    );
  }
}
