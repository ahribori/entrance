import AuthService from '../../src/service/AuthService';
import TokenService from '../../src/service/TokenService';
import db from '../../src/db';

beforeAll(async () => {
  await db.sync({ force: true });
});

describe('AuthService Tests', () => {
  const authService = AuthService.getInstance();
  const tokenService = TokenService.getInstance();

  test('Signup test', async () => {
    const userInputPassword = 'my-password';

    const user = await authService.signUp(
      'ahribori',
      userInputPassword,
      'ahribori@gmail.com',
    );

    const userSignedUp = user.dataValues;
    const { salt, password } = userSignedUp;
    const userInputPasswordHash = await authService.createPasswordHash(
      userInputPassword,
      salt,
    );

    expect(userInputPasswordHash).toEqual(password);
  });

  test('Login test', async () => {
    const accountId = 1;
    const authBag = await authService.authorize(accountId);
    const { accessToken } = authBag;
    const verifiedPayload = tokenService.verifyToken(accessToken);
    expect(verifiedPayload.accountId).toEqual(accountId);
  });
});
