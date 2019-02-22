import React, { useState } from 'react';

const OrderFormContext = React.createContext();

const OrderFormProvider = ({ children }) => {
  const [customersList, setCustomersList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  return (
    <OrderFormContext.Provider
      value={{
        customersList,
        productsList,
        addCustomersList: newCustomersList => {
          setCustomersList(newCustomersList);
        },
        addProductList: newProductsList => {
          setProductsList(newProductsList);
        }
      }}
    >
      {children}
    </OrderFormContext.Provider>
  );
};

const OrderFormConsumer = OrderFormContext.Consumer;

export default OrderFormProvider;
export { OrderFormConsumer };
