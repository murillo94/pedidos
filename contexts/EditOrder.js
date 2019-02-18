import React, { useState } from 'react';

const EditOrderContext = React.createContext();

const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' }
];

const EditOrderProvider = ({ children }) => {
  const [customersList, setCustomersList] = useState(options);
  const [productsList, setProductsList] = useState([]);

  return (
    <EditOrderContext.Provider
      value={{
        customersList,
        productsList,
        addCustomersList: newCustomersList => {
          setCustomersList([...customersList, newCustomersList]);
        },
        addProductList: newProductsList => {
          setProductsList({ ...productsList, newProductsList });
        }
      }}
    >
      {children}
    </EditOrderContext.Provider>
  );
};

const EditOrderConsumer = EditOrderContext.Consumer;

export default EditOrderProvider;
export { EditOrderConsumer };
