import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const ROUNDS = 10;

@Injectable()
export class Crypto {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
