import { JsonWebTokenError } from 'jsonwebtoken';
import TokenService, { TokenType } from '../../src/service/TokenService';

describe('TokenService Tests', () => {
  test('Secret key exist', () => {
    const secretKey = TokenService.secret;
    expect(secretKey).toBeDefined();
  });

  test('Issue & Verify access token', () => {
    const accountId = 1;
    const accessToken = TokenService.issueAccessToken({ accountId });
    const payload = TokenService.verifyToken(accessToken);

    expect(accessToken).toBeDefined();
    expect(payload.sub).toEqual(TokenType.ACCESS_TOKEN);
    expect(accountId).toEqual(payload.accountId);
  });

  test('Issue & Verify refresh token', () => {
    const accountId = 1;
    const refreshToken = TokenService.issueRefreshToken({
      accountId,
    });
    const payload = TokenService.verifyToken(refreshToken);

    expect(refreshToken).toBeDefined();
    expect(payload.sub).toEqual(TokenType.REFRESH_TOKEN);
    expect(accountId).toEqual(payload.accountId);
  });

  test('Verify token error test', () => {
    try {
      TokenService.verifyToken('xxxxxxx');
    } catch (e) {
      expect(e instanceof JsonWebTokenError).toEqual(true);
    }
  });
});
