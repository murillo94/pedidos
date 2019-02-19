import React, { useState } from 'react';

const EditOrderContext = React.createContext();

const EditOrderProvider = ({ children }) => {
  const [customersList, setCustomersList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  return (
    <EditOrderContext.Provider
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
    </EditOrderContext.Provider>
  );
};

const EditOrderConsumer = EditOrderContext.Consumer;

export default EditOrderProvider;
export { EditOrderConsumer };
