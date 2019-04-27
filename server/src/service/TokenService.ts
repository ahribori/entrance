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

class TokenService {
  private static instance: TokenService;
  private readonly _secret: string;

  private constructor() {
    this._secret = config.secret;
  }

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
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

export default TokenService;
