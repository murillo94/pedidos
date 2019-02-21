import { useState, useEffect } from 'react';

import Page from '../layouts/Page';

import EditOrderProvider from '../contexts/EditOrder';

import Header from '../components/Header';
import List from '../components/List';

import Get from '../services/Get';

const Order = () => {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const results = await Get('orders', 'date');
      setData(results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const onSave = async value => {
    await setData([value, ...data.filter(x => x.token !== value.token)]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <EditOrderProvider>
      <Page>
        <Header
          title="Pedidos"
          subTitle={`${data.length} pedidos no total`}
          onSave={onSave}
        />
        <List
          data={data}
          isLoading={isLoading}
          isError={isError}
          onSave={onSave}
        />
      </Page>
    </EditOrderProvider>
  );
};

export default Order;
