/* eslint-disable jsx-a11y/label-has-for */

import { useState } from 'react';
import { FieldArray, FastField, ErrorMessage } from 'formik';
import Select from 'react-select';
import NumberFormat from 'react-number-format';

import { EditOrderConsumer } from '../contexts/EditOrder';

import Profitability from './Profitability';
import Button from './Button';

import { profitabilityTypeWithNumber } from '../utils/Profitability';
import { gray, white, black, darkGray, red, blue } from '../styles/Colors';

import Get from '../services/Get';

const validateQuantity = (value, multiple) => {
  return (
    multiple !== 0 && value % multiple !== 0 && `Qtd. mult. de ${multiple}`
  );
};

const Label = ({ text, id, children }) => (
  <div>
    <label htmlFor={id}>{text}</label>
    {children}

    <style jsx>
      {`
        div {
          margin-bottom: 25px;
        }

        label {
          font-size: 16px;
          font-weight: 500;
          display: block;
          margin-bottom: 7px;
        }
      `}
    </style>
  </div>
);

const ErrorContainer = ({ message }) => (
  <div>
    {message}

    <style jsx>
      {`
        div {
          font-size: 14px;
          color: ${red};
          margin-top: 7px;
        }
      `}
    </style>
  </div>
);

const Error = ({ name }) => (
  <ErrorMessage
    name={name}
    render={message => <ErrorContainer message={message} />}
  />
);

const SelectInput = ({
  id,
  position,
  placeholder,
  collection,
  options,
  value,
  onChange,
  onBlur,
  addOptions,
  width = '100%',
  marginRight = '0'
}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(options);

  const fetchOptions = async () => {
    if (options.length === 0) {
      setLoading(true);

      const result = await Get(collection, 'name');
      const resultFormat = result.map(x => ({
        ...x,
        label: x.name,
        value: x.name
      }));

      addOptions(resultFormat);
      setData(resultFormat);
      setLoading(false);
    }
  };

  const handleChange = newValue => {
    if (position) {
      onChange(`products[${position}].id`, newValue.id);
      onChange(`products[${position}].multiple`, newValue.multiple);
      onChange(`products[${position}].priceFixed`, newValue.price);
      onChange(`products[${position}].price`, newValue.price);
    }

    onChange(id, [newValue]);
  };

  const handleBlur = () => {
    onBlur(id, true);
  };

  return (
    <div className="container">
      <Select
        id={id}
        inputId="select-id"
        placeholder={placeholder}
        value={value}
        options={data}
        isLoading={isLoading}
        getOptionLabel={res => res.name}
        getOptionValue={res => res.id}
        noOptionsMessage={({ inputValue }) => `${inputValue} não encontrado`}
        loadingMessage={() => 'Carregando...'}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={fetchOptions}
        styles={{
          control: (provided, { isFocused }) => ({
            ...provided,
            borderColor: isFocused ? blue : gray,
            boxShadow: isFocused && `0 0 0 2px ${blue}`,
            transition: 'box-shadow 0.2s'
          }),
          option: (provided, { isSelected }) => ({
            ...provided,
            fontSize: 15,
            color: isSelected ? white : black
          }),
          singleValue: provided => ({
            ...provided,
            fontSize: 15,
            color: black
          }),
          placeholder: provided => ({
            ...provided,
            fontSize: 15,
            color: darkGray
          })
        }}
      />
      <Error name={id} />

      <style jsx>
        {`
          .container {
            width: ${width};
            margin-right: ${marginRight};
          }
        `}
      </style>
    </div>
  );
};

const Input = ({ field, ...props }) => {
  return (
    <div>
      {props.money ? (
        <>
          <NumberFormat
            {...field}
            {...props}
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            allowNegative={false}
            autoComplete="off"
          />
          {props.form.errors &&
          props.form.errors.products &&
          props.form.errors.products[props.id] &&
          props.form.errors.products[props.id].profitability &&
          !props.form.errors.products[props.id].price ? (
            <ErrorContainer message="Rentabilidade ruim" />
          ) : null}
        </>
      ) : (
        <input {...field} {...props} autoComplete="off" />
      )}

      <Error name={field.name} />

      <style jsx>
        {`
          div {
            margin-right: 10px;
            width: ${props.width};
          }
        `}
      </style>
    </div>
  );
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
              <SelectInput
                id="customer"
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
                          id={`products[${index}].name`}
                          position={index.toString()}
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
                          component={SelectInput}
                        />
                        <FastField
                          type="text"
                          name={`products[${index}].quantity`}
                          id={index.toString()}
                          placeholder="Qtd."
                          width="15%"
                          validate={value =>
                            validateQuantity(
                              value,
                              form.values.products[index].multiple
                            )
                          }
                          onChange={e => {
                            form.setFieldValue(
                              `products[${index}].quantity`,
                              e.target.value.replace(/[^\d]/g, '')
                            );
                          }}
                          component={Input}
                        />
                        <FastField
                          type="text"
                          name={`products[${index}].price`}
                          id={index.toString()}
                          placeholder="Preço Unit."
                          width="25%"
                          money="true"
                          onChange={e => {
                            form.setFieldValue(
                              `products[${index}].price`,
                              e.target.value
                            );
                            form.setFieldValue(
                              `products[${index}].profitability`,
                              profitabilityTypeWithNumber(
                                form.values.products[index].priceFixed || '0',
                                e.target.value
                              )
                            );
                          }}
                          component={Input}
                        />
                        <FastField
                          type="hidden"
                          name={`products[${index}].id`}
                        />
                        <FastField
                          type="hidden"
                          name={`products[${index}].multiple`}
                        />
                        <FastField
                          type="hidden"
                          name={`products[${index}].priceFixed`}
                        />
                        <Button
                          text="x"
                          fontColor={darkGray}
                          onClick={() => remove(index)}
                        />
                      </div>
                    ))}
                    <Button
                      text="Adicionar produto"
                      onClick={() => {
                        push({
                          name: [],
                          quantity: '',
                          priceFixed: '',
                          price: '',
                          multiple: 0,
                          profitability: 'medium'
                        });
                      }}
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
