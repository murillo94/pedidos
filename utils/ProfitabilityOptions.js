import { green, lightGreen, yellow, lightYellow } from '../styles/Colors';

const profitabilityOptions = {
  border: {
    high: green,
    medium: yellow
  },
  backgroundColor: {
    high: lightGreen,
    medium: lightYellow
  },
  text: {
    high: 'Rentabilidade ótima',
    medium: 'Rentabilidade boa'
  }
};

export default profitabilityOptions;
