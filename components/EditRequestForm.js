/* eslint-disable jsx-a11y/label-has-for */
import Select from 'react-select';
import { FieldArray, Field, ErrorMessage } from 'formik';

import Button from './Button';

import { gray, white, black, darkGray, red, blue } from '../styles/Colors';

const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Being Fabulous', label: 'Being Fabulous' },
  { value: 'Ken Wheeler', label: 'Ken Wheeler' },
  { value: 'ReasonML', label: 'ReasonML' },
  { value: 'Unicorns', label: 'Unicorns' },
  { value: 'Kittens', label: 'Kittens' }
];

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

const Error = ({ name }) => (
  <ErrorMessage
    name={name}
    render={msg => (
      <div>
        {msg}

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
    )}
  />
);

const SelectInput = ({ id, placeholder, value, onChange, onBlur }) => {
  const handleChange = newValue => {
    onChange(id, [newValue]);
  };

  const handleBlur = () => {
    onBlur(id, true);
  };

  return (
    <>
      <Select
        id={id}
        inputId="select-id"
        placeholder={placeholder}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        noOptionsMessage={({ inputValue }) => `${inputValue} não encontrado`}
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
    </>
  );
};

const Input = ({ field, ...props }) => {
  return (
    <div>
      <input {...field} {...props} />

      <Error name={field.name} />

      <style jsx>
        {`
          div {
            margin-right: 10px;
            width: ${props.width};
          }

          input {
            font-size: 15px;
            color: ${black};
            height: 38px;
            width: 100%;
            border: 1px solid ${gray};
            border-radius: 4px;
            padding: 9px;
            box-sizing: border-box;
            transition: all 0.2s;
          }

          input:hover {
            border: 1px solid ${darkGray};
          }

          ::placeholder {
            color: ${darkGray};
          }
        `}
      </style>
    </div>
  );
};

const EditRequestForm = ({
  values,
  touched,
  errors,
  /* handleChange,
  handleBlur, */
  setFieldValue,
  setFieldTouched
}) => {
  return (
    <div className="overflow-container">
      <div className="overflow-content">
        <Label text="Cliente" id="customer">
          <SelectInput
            id="customer"
            placeholder="Selecione um cliente"
            value={values.customer}
            error={errors.customer}
            touched={touched.customer}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
          />
        </Label>

        <Label text="Produtos" id="products">
          <FieldArray
            name="products"
            render={({ remove, push, form }) => (
              <div>
                {values.products.map((friend, index) => (
                  <div key={index} className="input-group">
                    <Field
                      type="text"
                      placeholder="Descrição"
                      name={`products[${index}].name`}
                      width="60%"
                      component={Input}
                    />
                    <Field
                      type="text"
                      placeholder="Qtd."
                      name={`products[${index}].quantity`}
                      width="15%"
                      component={Input}
                    />
                    <Field
                      type="text"
                      placeholder="Preço Unit."
                      name={`products.${index}.price`}
                      width="25%"
                      component={Input}
                    />
                    <Button
                      text="x"
                      onClick={() => remove(index)}
                      fontColor={darkGray}
                    />
                  </div>
                ))}
                <Button
                  text="Adicionar produto"
                  onClick={() => push({ name: [], quantity: '', price: '' })}
                />
                {form.errors && typeof form.errors.products === 'string' && (
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
            align-items: flex-start;
            margin-bottom: 15px;
          }
        `}
      </style>
    </div>
  );
};

export default EditRequestForm;
