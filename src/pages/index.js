import { useState, useEffect } from 'react';

import Page from '../layouts/Page';

import OrderFormProvider from '../components/contexts/OrderForm';

import Header from '../components/common/Header';
import OrderRowList from '../components/rows/OrderRowList';

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
    <OrderFormProvider>
      <Page>
        <Header
          title="Pedidos"
          subTitle={`${data.length} pedidos no total`}
          onSave={onSave}
        />
        <OrderRowList
          data={data}
          isLoading={isLoading}
          isError={isError}
          onSave={onSave}
        />
      </Page>
    </OrderFormProvider>
  );
};

export default Order;
