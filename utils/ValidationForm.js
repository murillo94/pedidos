import isCurrency from 'validator/lib/isCurrency';
import * as Yup from 'yup';

const ValidationForm = () =>
  Yup.object().shape({
    customer: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          id: Yup.number().required()
        })
      )
      .required('Informe um cliente'),
    products: Yup.array()
      .of(
        Yup.object().shape({
          profitability: Yup.string()
            .matches(/(high|medium)/, 'Rentabilidade ruim')
            .required('Rentabilidade ruim'),
          name: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string().required(),
                id: Yup.number().required()
              })
            )
            .required('Obrigatório'),
          quantity: Yup.number()
            .transform(value => (isNaN(value) ? undefined : value))
            .integer('Necessário ser inteiro')
            .min(1, 'Necessário ser maior ou igual a 1')
            .required('Obrigatório'),
          price: Yup.string()
            .test('price', 'Necessário ter 2 casas decimais', value => {
              const money = value || 0;

              const checkedCurrency = isCurrency(
                money.toString().replace(/R\$ /g, ''),
                {
                  symbol: '$',
                  require_symbol: false,
                  allow_space_after_symbol: false,
                  symbol_after_digits: false,
                  allow_negatives: false,
                  parens_for_negatives: false,
                  negative_sign_before_digits: false,
                  negative_sign_after_digits: false,
                  allow_negative_sign_placeholder: false,
                  thousands_separator: '.',
                  decimal_separator: ',',
                  allow_decimal: true,
                  require_decimal: true,
                  digits_after_decimal: [2],
                  allow_space_after_digits: false
                }
              );

              return checkedCurrency;
            })
            .test(
              'moreThan',
              'Necessário ser maior que 0',
              value =>
                parseFloat(value.replace(/R\$ /g, '').replace(/,/g, '.')) > 0
            )
            .required('Obrigatório')
        })
      )
      .required('Informe um produto')
  });

export default ValidationForm;
