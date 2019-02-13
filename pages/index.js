import Page from '../layouts/Page';

import Header from '../components/Header';
import Button from '../components/Button';
import List from '../components/List';

const data = [
  {
    id: 1,
    clientId: 3,
    clientName: 'Luke Skywalker',
    profitability: 'high',
    items: []
  },
  {
    id: 2,
    clientId: 1,
    clientName: 'Darth Vader',
    profitability: 'medium',
    items: []
  },
  {
    id: 3,
    clientId: 2,
    clientName: 'Obi-Wan Kenobi',
    profitability: 'high',
    items: []
  }
];

const Hello = () => (
  <Page>
    <Header title="Pedidos" subTitle={`${data.length} pedidos no total`}>
      <Button text="Adicionar" />
    </Header>
    <List data={data} />
  </Page>
);

export default Hello;
