import { JsonWebTokenError } from 'jsonwebtoken';
import AuthService from 'service/AuthService';
import db from 'db';
import TokenService from 'service/TokenService';

beforeAll(async () => {
  await db.authenticate();
});

describe('AuthService Tests', () => {
  const authService = AuthService.getInstance();
  const tokenService = TokenService.getInstance();

  test('Signup test', async () => {
    const userInputPassword = 'my-password';

    const user = await authService.signUp(
      'ahribori',
      '아리보리',
      userInputPassword,
      'ahribori@gmail.com',
    );

    const userSignedUp = user;
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

  test('Email Verification', async () => {
    const account = await authService.signUp(
      'email-verification',
      '이메일 테스트',
      '123456',
      'entrance.auth@gmail.com',
    );
    const emailVerificationCode = await authService.sendEmailVerificationCode(
      account.id,
    );
    const verified = await authService.verifyEmail(emailVerificationCode);
    expect(verified).toBeTruthy();

    try {
      await authService.verifyEmail('xxxxx');
    } catch (e) {
      expect(e instanceof JsonWebTokenError).toBeTruthy();
    }
  });
});
