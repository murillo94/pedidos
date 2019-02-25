import { memo, useMemo } from 'react';

import { FieldArray, FastField } from 'formik';

import Dinero from 'dinero.js';

import { OrderFormConsumer } from '../contexts/OrderForm';

import Label from './Label';
import Input from './Input';
import InputSelect from './InputSelect';
import { ErrorInput } from './Error';
import Profitability from './Profitability';
import Button from './Button';

import {
  profitabilityTypeWithNumber,
  profitabilityTypeWithArray
} from '../../utils/Profitability';
import { white, gray, lightGray, darkGray, green } from '../../styles/Colors';

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
  console.log(form);
  form.setFieldValue(
    `products[${index}].profitability`,
    profitabilityTypeWithNumber(
      form.values.products[index].priceFixed || '0',
      value
    )
  );
  form.setFieldValue(`products[${index}].price`, value);
};

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

const FieldHide = memo(index => (
  <>
    <FastField type="hidden" name={`products[${index}].id`} />
    <FastField type="hidden" name={`products[${index}].multiple`} />
    <FastField type="hidden" name={`products[${index}].priceFixed`} />
  </>
));

const Footer = memo(
  // eslint-disable-next-line no-unused-vars
  ({ onClose, values, isSubmitting, isValid }) => {
    const quantityTotal = useMemo(
      () =>
        values.products.reduce(
          (sum, { quantity }) => sum + Number(quantity),
          0
        ),
      [values.products]
    );

    const priceTotal = useMemo(
      () =>
        values.products.reduce(
          (sum, { price }) => sum + Number(price.replace(/[^\d]/g, '')),
          0
        ),
      [values.products]
    );

    const formatPriceTotal = useMemo(
      () =>
        Dinero({ amount: priceTotal })
          .toFormat('0,0.00')
          .replace(/,/g, '.')
          .replace(/.([^.]*)$/, ',$1'),
      [priceTotal]
    );

    const profitabilityType = useMemo(
      () => profitabilityTypeWithArray(values.products),
      [values.products]
    );

    return (
      <footer>
        <div>
          <div className="info">
            Quantidade total:
            <span>{quantityTotal}</span>
          </div>
          <div className="info">
            Total:
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <span>R$ {formatPriceTotal}</span>
            <Profitability
              value={profitabilityType}
              style={{ marginLeft: 5, fontWeight: 500 }}
            />
          </div>
        </div>
        <div>
          <Button text="Cancelar" onClick={onClose} />
          <Button
            type="submit"
            text="Salvar"
            fontColor={white}
            backgroundColor={green}
            marginLeft={10}
            disabled={isSubmitting}
          />
        </div>

        <style jsx>
          {`
            footer {
              padding: 20px 15px;
              background-color: ${lightGray};
              border: 1px solid ${gray};
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .info {
              font-size: 15px;
            }

            .info:not(:last-child) {
              margin-bottom: 5px;
            }

            span {
              margin-left: 5px;
              font-weight: 500;
            }
          `}
        </style>
      </footer>
    );
  },
  (prevProps, newProps) => {
    return !newProps.isValid;
  }
);

const OrderForm = ({
  title,
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  isSubmitting,
  isValid,
  handleSubmit,
  onClose
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      tabIndex="-1"
      role="dialog"
      aria-label={title}
      aria-modal="true"
    >
      <OrderFormConsumer>
        {({
          customersList,
          addCustomersList,
          productsList,
          addProductList
        }) => (
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
                            profitability={
                              form.values.products[index].profitability
                            }
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
                          <ErrorInput name="products" />
                        )}
                    </div>
                  )}
                />
              </Label>
            </div>
          </div>
        )}
      </OrderFormConsumer>
      <Footer {...{ onClose, values, isSubmitting, isValid }} />

      <style jsx>
        {`
          form {
            display: flex;
            flex-direction: column;
            height: 100%;
            outline: 0;
          }

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
    </form>
  );
};

export default OrderForm;
