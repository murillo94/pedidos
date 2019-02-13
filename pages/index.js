import Page from '../layouts/Page';

import Header from '../components/Header';
import Button from '../components/Button';
import List from '../components/List';

const data = [
  {
    id: 1,
    name: 'Luke Skywalker',
    profitability: 'high',
    total: 10
  },
  {
    id: 2,
    name: 'Darth Vader',
    profitability: 'medium',
    total: 5
  },
  {
    id: 3,
    name: 'Obi-Wan Kenobi',
    profitability: 'high',
    total: 30
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
