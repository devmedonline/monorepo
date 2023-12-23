import { Test, TestingModule } from '@nestjs/testing';
import { Crypto } from './crypto';

describe('Crypto', () => {
  let crypto: Crypto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Crypto],
    }).compile();

    crypto = module.get<Crypto>(Crypto);
  });

  it('should be defined', () => {
    expect(crypto).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'password';
    const hash = await crypto.hash(password);

    expect(hash).not.toBe(password);
  });

  it('should compare a password and a hash', async () => {
    const password = 'password';
    const hash = await crypto.hash(password);

    expect(await crypto.compare(password, hash)).toBe(true);
  });

  it('should not compare a password and a hash', async () => {
    const password = 'password';
    const hash = await crypto.hash(password);

    expect(await crypto.compare('wrong-password', hash)).toBe(false);
  });
});
