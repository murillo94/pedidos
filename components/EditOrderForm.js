import { FieldArray, FastField } from 'formik';

import { EditOrderConsumer } from '../contexts/EditOrder';

import Label from './Label';
import Input from './Input';
import InputSelect from './InputSelect';
import { Error } from './Error';
import Profitability from './Profitability';
import Button from './Button';

import { profitabilityTypeWithNumber } from '../utils/Profitability';
import { darkGray } from '../styles/Colors';

const validateQuantity = (value, multiple) => {
  return (
    multiple !== 0 && value % multiple !== 0 && `Qtd. mult. de ${multiple}`
  );
};

const onChangeQuantity = (form, index, { target: { value } }) => {
  form.setFieldValue(
    `products[${index}].quantity`,
    value.replace(/[^\d]/g, '')
  );
};

const onChangePrice = (form, index, { target: { value } }) => {
  form.setFieldValue(`products[${index}].price`, value);
  form.setFieldValue(
    `products[${index}].profitability`,
    profitabilityTypeWithNumber(
      form.values.products[index].priceFixed || '0',
      value
    )
  );
};

const FieldHide = index => (
  <>
    <FastField type="hidden" name={`products[${index}].id`} />
    <FastField type="hidden" name={`products[${index}].multiple`} />
    <FastField type="hidden" name={`products[${index}].priceFixed`} />
  </>
);

const handleAddItem = push => {
  push({
    name: [],
    quantity: '',
    priceFixed: '',
    price: '',
    multiple: 0,
    profitability: 'medium'
  });
};

const EditOrderForm = ({
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched
}) => {
  return (
    <EditOrderConsumer>
      {({ customersList, addCustomersList, productsList, addProductList }) => (
        <div className="overflow-container">
          <div className="overflow-content">
            <Label text="Cliente" id="customer">
              <InputSelect
                name="customer"
                placeholder="Selecione um cliente"
                collection="customers"
                options={customersList}
                value={values.customer}
                error={errors.customer}
                touched={touched.customer}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                addOptions={addCustomersList}
              />
            </Label>
            <Label text="Produtos" id="products">
              <FieldArray
                name="products"
                render={({ remove, push, form }) => (
                  <div>
                    {values.products.map((friend, index) => (
                      <div key={index} className="input-group">
                        <FastField
                          name={`products[${index}].profitability`}
                          render={({ field }) => (
                            <Profitability
                              {...field}
                              style={{ marginRight: 10, fontWeight: 500 }}
                            />
                          )}
                        />
                        <FastField
                          name={`products[${index}].name`}
                          keyExtractor={index.toString()}
                          placeholder="Selecione um produto"
                          collection="products"
                          options={productsList}
                          value={form.values.products[index].name}
                          error={
                            typeof form.errors.products === 'object' &&
                            form.errors.products[index]
                          }
                          touched={form.touched.products}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          addOptions={addProductList}
                          width="60%"
                          marginRight="10px"
                          component={InputSelect}
                        />
                        <FastField
                          name={`products[${index}].quantity`}
                          keyExtractor={index.toString()}
                          placeholder="Qtd."
                          width="15%"
                          validate={value =>
                            validateQuantity(
                              value,
                              form.values.products[index].multiple
                            )
                          }
                          onChange={e => onChangeQuantity(form, index, e)}
                          component={Input}
                        />
                        <FastField
                          name={`products[${index}].price`}
                          keyExtractor={index.toString()}
                          placeholder="Preço Unit."
                          width="25%"
                          isMoney
                          onChange={e => onChangePrice(form, index, e)}
                          component={Input}
                        />
                        <FieldHide index={index} />
                        <Button
                          text="x"
                          fontColor={darkGray}
                          onClick={() => remove(index)}
                        />
                      </div>
                    ))}
                    <Button
                      text="Adicionar produto"
                      onClick={() => handleAddItem(push)}
                    />
                    {form.errors &&
                      typeof form.errors.products === 'string' && (
                        <Error name="products" />
                      )}
                  </div>
                )}
              />
            </Label>
          </div>

          <style jsx>
            {`
              .overflow-container {
                flex: 1;
                overflow: auto;
              }

              .overflow-content {
                padding: 20px;
              }

              .input-group {
                display: flex;
                align-items: baseline;
                margin-bottom: 15px;
              }
            `}
          </style>
        </div>
      )}
    </EditOrderConsumer>
  );
};

export default EditOrderForm;
