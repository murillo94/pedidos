/* eslint-disable jsx-a11y/label-has-for */
import Select from 'react-select';

import { gray, white, black, darkGray, red } from '../styles/Colors';

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
          margin-bottom: 15px;
        }

        label {
          font-size: 15px;
          font-weight: 500;
          display: block;
          margin-bottom: 7px;
        }
      `}
    </style>
  </div>
);

const Error = ({ message }) => (
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

const SelectInput = ({ id, value, error, touched, onChange, onBlur }) => {
  const handleChange = newValue => {
    onChange('customer', [newValue]);
  };

  const handleBlur = () => {
    onBlur('customer', true);
  };

  return (
    <>
      <Select
        id={id}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        styles={{
          control: provided => ({
            ...provided,
            borderColor: gray
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

      {!!error && touched && <Error message={error} />}
    </>
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
    <div className="content">
      <Label text="Cliente" id="customer">
        <SelectInput
          id="customer"
          value={values.customer}
          error={errors.customer}
          touched={touched.customer}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
        />
      </Label>

      <style jsx>
        {`
          .content {
            flex-grow: 1;
            padding: 20px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
};

export default EditRequestForm;
