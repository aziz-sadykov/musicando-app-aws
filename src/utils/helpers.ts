const colors: string[] = [
  '#FFBF00',
  '#E83F6F',
  '#A522A5',
  '#32936F',
  '#3777BC',
  '#73DBFF',
];

const months: string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const color = (): string => colors[Math.floor(Math.random() * 4)];

export const month = (index: number): string =>
  index >= 0 && index <= 11 ? months[index] : '';

export const addLeftZero = (
  element: string | number,
  addInLeft: string = '0',
  length: number = 2,
): string => {
  if (typeof element === 'number') {
    if (element > 9) return element.toString();
    return element.toString().padStart(length, addInLeft);
  }
  return element.padStart(length, addInLeft);
};

export const dateFormat = (date: Date, withZero: boolean = true): string => {
  if (withZero)
    return `${addLeftZero(date.getDate())}/${addLeftZero(
      date.getMonth(),
    )}/${date.getFullYear()}`;

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
