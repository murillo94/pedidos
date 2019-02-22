import { withFormik } from 'formik';

import OrderForm from '../components/common/OrderForm';

import ValidateOrderForm from '../utils/ValidateOrderForm';
import { profitabilityTypeWithArray } from '../utils/Profitability';

import Put from '../services/Put';

const formikEnhancer = withFormik({
  validationSchema: () => ValidateOrderForm(),
  mapPropsToValues: ({ token = '', customer = [], products = [] }) => ({
    token: token || '',
    customer: customer || [],
    products:
      products.map(x => ({
        ...x,
        name: [{ id: x.id, name: x.name }],
        priceFixed: x.price
      })) || []
  }),
  handleSubmit: async (values, { props }) => {
    try {
      const { token, customer, products } = values;
      const customerFinal = customer.map(({ id, name }) => ({ id, name }));
      const productsFinal = products.map(x => ({
        ...x,
        name: x.name[0].name,
        quantity: Number(x.quantity)
      }));
      const profitability = profitabilityTypeWithArray(productsFinal);
      const data = {
        customer: customerFinal,
        products: productsFinal,
        profitability,
        date: Date.now()
      };

      const id = await Put('orders', token, data);
      await props.onSave({ ...data, token: id });

      props.onClose();
    } catch (error) {
      props.handleError(true);
    }
  },
  displayName: 'OrderFormContainer'
});

const OrderFormContainer = ({ ...props }) => <OrderForm {...props} />;

export default formikEnhancer(OrderFormContainer);
