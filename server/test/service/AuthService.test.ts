import AuthService from '../../src/service/AuthService';
import TokenService from '../../src/service/TokenService';

describe('AuthService Tests', () => {
  const authService = AuthService.getInstance();
  const tokenService = TokenService.getInstance();

  test('Login test', async () => {
    const accountId = 1;
    const authBag = await authService.authorize(accountId);
    const { accessToken } = authBag;
    const verifiedPayload = tokenService.verifyToken(accessToken);
    expect(verifiedPayload.accountId).toEqual(accountId);
  });
});
