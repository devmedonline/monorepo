import { Request } from 'express';

export class JWTPayload {
  constructor(
    public id: string,
    public sub: { name: string; iat: number; exp: number },
  ) {}

  toPlainObject(): {
    id: string;
    sub: { name: string; iat: number; exp: number };
  } {
    return {
      id: this.id,
      sub: this.sub,
    };
  }

  static isJWTPayload(payload: any): payload is JWTPayload {
    return payload && payload.id && payload.sub;
  }

  static extractTokenFromRequest(request: Request): string | undefined {
    const cookie = request.cookies?.[process.env.JWT_COOKIE_NAME];
    if (cookie) return cookie;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  static extractRefreshTokenFromRequest(request: Request): string | undefined {
    console.log(request.headers);
    const cookie = request.cookies?.[process.env.JWT_REFRESH_COOKIE_NAME];
    if (cookie) return cookie;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(type, token);
    return type === 'Refresh' ? token : undefined;
  }
}
