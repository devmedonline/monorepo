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

    MG_API_KEY: string;
    MG_DOMAIN: string;
    MG_FROM_EMAIL: string;
    MG_FROM_NAME: string;
    MG_API_USERNAME: string;
    MG_API_ENDPOINT: string;
  }
}
