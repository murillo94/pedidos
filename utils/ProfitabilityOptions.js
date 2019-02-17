import {
  green,
  lightGreen,
  yellow,
  lightYellow,
  red,
  lightRed
} from '../styles/Colors';

export const profitabilityOptions = {
  border: {
    high: green,
    medium: yellow,
    low: red
  },
  backgroundColor: {
    high: lightGreen,
    medium: lightYellow,
    low: lightRed
  },
  text: {
    high: 'Rentabilidade ótima',
    medium: 'Rentabilidade boa'
  }
};

export const profitabilityType = (fixed, normal) => {
  const format = value => Number(value.replace(/[^\d]/g, ''));
  const priceFixed = format(fixed);
  const price = format(normal);

  if (price > priceFixed) return 'high';
  if (priceFixed - (priceFixed * 10) / 100 <= price) return 'medium';
  return 'low';
};
