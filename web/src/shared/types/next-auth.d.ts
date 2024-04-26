import 'next-auth/jwt';
import NextAuth from 'next-auth/next';

export type SignInData = {
  user: {
    id: string;
    email: string;
    name: string;
    verified: boolean;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      verified: boolean;
      avatar: string;
      createdAt: string;
      updatedAt: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      verified: boolean;
      avatar: string;
      createdAt: string;
      updatedAt: string;
    };
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

export default NextAuth;
