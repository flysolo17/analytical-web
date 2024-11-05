export const GAMES = 'qXOTZgcJN3RPYgoNV27H';
export const GAMES_COLLECTION = 'games';

export function getNumberInString(str: string): number | null {
  const match = str.match(/\d+/);

  if (match) {
    return Number(match[0]);
  }
  return null;
}

export function displayFullname(first: string, middle: string, last: string) {
  return `${first} ${middle[0]}. ${last}`;
}

export const colors = [
  '#81323d',
  '#f19f9d',
  '#91cec2',
  '#383b65',
  '#8b7d7d',
  '#a58998',
  '#757397',
  '#474e95',
  '#4662b2',
  '#638a8d',
];
