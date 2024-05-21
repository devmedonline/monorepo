import { randomBytes } from 'node:crypto';

const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function nanoid(prefix = '', size = 32): string {
  let id = '';
  const charactersLength = alphabet.length;
  const randomValues = randomBytes(size);

  for (let i = 0; i < size; i++) {
    id += alphabet.charAt(randomValues[i] % charactersLength);
  }

  return prefix + '_' + id;
}
