export const GAMES = 'qXOTZgcJN3RPYgoNV27H';
export const GAMES_COLLECTION = 'games';

export function getNumberInString(str: string): number | null {
  const match = str.match(/\d+/);

  if (match) {
    return Number(match[0]);
  }
  return null;
}
