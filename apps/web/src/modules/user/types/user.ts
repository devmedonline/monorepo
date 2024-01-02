import { User as DatabaseUser } from 'db';

export type User = Omit<DatabaseUser, 'password'>;
