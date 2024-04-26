declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_SECRET_KEY: string;
    JWT_COOKIE_NAME: string;
    JWT_REFRESH_COOKIE_NAME: string;
    FRONTEND_URL: string;
    API_URL: string;
    SITE_NAME: string;
    SITE_EMAIL: string;
    MAILER_API_KEY: string;
    MAILER_API_DOMAIN: string;
    MAILER_DOMAIN: string;
    MAILER_API_ENDPOINT: string;
  }
}
