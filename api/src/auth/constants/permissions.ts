export const PERMISSION = {
  ADMIN: 'ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
} as const;

export type PERMISSION = (typeof PERMISSION)[keyof typeof PERMISSION];
