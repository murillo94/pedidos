import {
  white,
  black,
  blue,
  gray,
  lightGray,
  darkGray,
  green,
  lightGreen,
  yellow,
  lightYellow,
  red,
  lightRed
} from '../Colors';

test('Verificando as cores hexadecimais', () => {
  expect(white).toBe('#fff');
  expect(black).toBe('#3a3a3a');
  expect(blue).toBe('#2684ff');
  expect(gray).toBe('#ececee');
  expect(lightGray).toBe('#fafbfc');
  expect(darkGray).toBe('#80899b');
  expect(green).toBe('#43a074');
  expect(lightGreen).toBe('#8ec6ab');
  expect(yellow).toBe('#f2b350');
  expect(lightYellow).toBe('#f7d196');
  expect(red).toBe('#ff6666');
  expect(lightRed).toBe('#ffa5a5');
});

test('Verificando se todas as cores possuem #', () => {
  const expected = [expect.stringMatching(/^#/)];

  expect([
    white,
    black,
    blue,
    gray,
    lightGray,
    darkGray,
    green,
    lightGreen,
    yellow,
    lightYellow,
    red,
    lightRed
  ]).toEqual(expect.arrayContaining(expected));
});
