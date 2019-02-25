import { useState, memo } from 'react';

import Select from 'react-select';

import { ErrorInput } from './Error';

import { gray, white, black, darkGray, blue } from '../../styles/Colors';

import Get from '../../services/Get';

const InputSelect = memo(
  ({
    field,
    name,
    keyExtractor,
    placeholder,
    collection,
    options = [],
    value,
    onChange,
    onBlur,
    addOptions,
    width = '100%',
    marginRight = '0'
  }) => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [data, setData] = useState(options);

    const fetchOptions = async () => {
      try {
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
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    const handleChange = newValue => {
      if (keyExtractor) {
        onChange(`products[${keyExtractor}].id`, newValue.id);
        onChange(`products[${keyExtractor}].multiple`, newValue.multiple);
        onChange(`products[${keyExtractor}].priceFixed`, newValue.price);
        onChange(`products[${keyExtractor}].price`, newValue.price);
      }

      onChange(name || field.name, [newValue]);
    };

    const handleBlur = () => {
      onBlur(name || field.name, true);
    };

    return (
      <div className="container">
        <Select
          id={name || field.name}
          inputId="select-id"
          placeholder={placeholder}
          value={value}
          options={data.length ? data : options}
          isLoading={isLoading}
          getOptionLabel={res => res.name}
          getOptionValue={res => res.id}
          noOptionsMessage={({ inputValue }) =>
            isError
              ? 'Algo deu errado, tente novamamente'
              : `${inputValue} não encontrado`
          }
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
        <ErrorInput name={name || field.name} />

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
  }
);

export default InputSelect;
