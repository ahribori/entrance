import { JsonWebTokenError } from 'jsonwebtoken';
import TokenService, { TokenType } from '../../src/service/TokenService';

describe('TokenService Tests', () => {
  const authorizationService = TokenService.getInstance();

  test('Secret key exist', () => {
    const secretKey = authorizationService.secret;
    expect(secretKey).toBeDefined();
  });

  test('Issue & Verify access token', () => {
    const accountId = 1;
    const accessToken = authorizationService.issueAccessToken({ accountId });
    const payload = authorizationService.verifyToken(accessToken);

    expect(accessToken).toBeDefined();
    expect(payload.sub).toEqual(TokenType.ACCESS_TOKEN);
    expect(accountId).toEqual(payload.accountId);
  });

  test('Issue & Verify refresh token', () => {
    const accountId = 1;
    const refreshToken = authorizationService.issueRefreshToken({
      accountId,
    });
    const payload = authorizationService.verifyToken(refreshToken);

    expect(refreshToken).toBeDefined();
    expect(payload.sub).toEqual(TokenType.REFRESH_TOKEN);
    expect(accountId).toEqual(payload.accountId);
  });

  test('Verify token error test', () => {
    try {
      authorizationService.verifyToken('xxxxxxx');
    } catch (e) {
      expect(e instanceof JsonWebTokenError).toEqual(true);
    }
  });
});
