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

    if (cookie) {
      return cookie;
    }

    return JWTPayload.extractValueFromHeader(request, 'Authorization');
  }

  static extractRefreshTokenFromRequest(request: Request): string | undefined {
    const cookie = request.cookies?.[process.env.JWT_REFRESH_COOKIE_NAME];

    if (cookie) {
      return cookie;
    }

    return JWTPayload.extractValueFromHeader(request, 'Refresh');
  }

  private static extractValueFromHeader(
    request: Request,
    headerName: string,
  ): string | undefined {
    const header = request.headers[headerName.toLowerCase()];

    if (!header) {
      return undefined;
    }

    const headerValue = Array.isArray(header) ? header[0] : header;

    const [type, token] = headerValue.split(' ') ?? [];
    return type.toLowerCase() === 'bearer' ? token : undefined;
  }
}
