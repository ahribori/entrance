import * as jwt from 'jsonwebtoken';
import config from '../config';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export interface TokenPayload {
  accountId: string | number;
}

export interface VerifiedPayload extends TokenPayload{
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

class AuthorizationService {
  private static instance: AuthorizationService;
  private readonly _secret: string;

  private constructor() {
    this._secret = config.secret;
  }

  static getInstance(): AuthorizationService {
    if (!AuthorizationService.instance) {
      AuthorizationService.instance = new AuthorizationService();
    }
    return AuthorizationService.instance;
  }

  get secret() {
    return this._secret;
  }

  /**
   * 엑세스 토큰 발행
   * @param payload
   */
  issueAccessToken(payload: TokenPayload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: '1d',
      issuer: 'entrance',
      subject: TokenType.ACCESS_TOKEN,
    });
  }

  /**
   * 리프레시 토큰 발행
   * @param payload
   */
  issueRefreshToken(payload: TokenPayload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: '14d',
      issuer: 'entrance',
      subject: TokenType.REFRESH_TOKEN,
    });
  }

  /**
   * 토큰 검증
   * @param token
   */
  verifyToken(token: string): VerifiedPayload {
    return <VerifiedPayload>jwt.verify(token, this.secret);
  }
}

export default AuthorizationService;
