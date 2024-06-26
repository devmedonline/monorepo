import { fetchRefreshToken } from "@/modules/auth/services/fetch-refresh-token";
import { fetchSignIn } from "@/modules/auth/services/fetch-sign-in";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const GOOGLE_SIGN_IN = process.env.GOOGLE_SIGN_IN === "true";

const OptionalGoogleProvider = () => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google client ID or secret");
  }

  return Google({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  });
};

const CredentialsProvider = () => {
  return Credentials({
    name: "email e senha",
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Senha", type: "password" },
    },
    authorize: async (credentials, _req) => {
      if (typeof credentials === "undefined") {
        return null;
      }

      const { email, password } = credentials;

      if (email.length === 0 || password.length === 0) {
        return null;
      }

      try {
        const response = await fetchSignIn(email, password);
        return response.data;
      } catch (error) {
        return null;
      }
    },
  });
};

const getProviders = () => {
  const providers = [];

  if (GOOGLE_SIGN_IN) {
    providers.push(OptionalGoogleProvider());
  }

  providers.push(CredentialsProvider());

  return providers;
};

export const authOptions: NextAuthOptions = {
  providers: getProviders(),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, ...user };
      }

      const isTokenValid = Date.now() < token.backendTokens.expiresIn;

      if (isTokenValid) {
        return token;
      }

      return fetchRefreshToken(token);
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.SECRET,
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
