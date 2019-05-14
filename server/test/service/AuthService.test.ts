import { JsonWebTokenError } from 'jsonwebtoken';
import AuthService from '../../src/service/AuthService';
import db from '../../src/db';
import TokenService from '../../src/service/TokenService';

beforeAll(async () => {
  await db.authenticate();
});

describe('AuthService Tests', () => {
  test('Signup test', async () => {
    const userInputPassword = 'my-password';

    const user = await AuthService.signUp(
      'ahribori',
      '아리보리',
      userInputPassword,
      'ahribori@gmail.com',
    );

    const userSignedUp = user;
    const { salt, password } = userSignedUp;
    const userInputPasswordHash = await AuthService.createPasswordHash(
      userInputPassword,
      salt,
    );
    expect(userInputPasswordHash).toEqual(password);
  });

  test('Login test', async () => {
    const accountId = 1;
    const authBag = await AuthService.authorize(accountId);
    const { accessToken } = authBag;
    const verifiedPayload = TokenService.verifyToken(accessToken);
    expect(verifiedPayload.accountId).toEqual(accountId);
  });

  test('Email Verification', async () => {
    const account = await AuthService.signUp(
      'email-verification',
      '이메일 테스트',
      '123456',
      'entrance.auth@gmail.com',
    );
    const emailVerificationCode = await AuthService.sendEmailVerificationCode(
      account.id,
    );
    const verified = await AuthService.verifyEmail(emailVerificationCode);
    expect(verified).toBeTruthy();

    try {
      await AuthService.verifyEmail('xxxxx');
    } catch (e) {
      expect(e instanceof JsonWebTokenError).toBeTruthy();
    }
  });
});
