declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_KEY: string;
    JWT_COOKIE_NAME: string;
    JWT_REFRESH_COOKIE_NAME: string;
    FRONTEND_URL: string;
  }
}
