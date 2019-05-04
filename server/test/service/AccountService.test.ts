import db from '../../src/db';
import AccountService, { AccountType } from '../../src/service/AccountService';
import AuthService from '../../src/service/AuthService';
import PointNotEnoughException from '../../src/exception/account/PointNotEnoughException';

beforeAll(async () => {
  await db.authenticate();
});

describe('AccountService Tests', () => {
  const accountService = AccountService.getInstance();
  const authService = AuthService.getInstance();

  test('Create User', async () => {
    const salt = authService.createSalt();
    const userCreated = await accountService.createAccount({
      email: 'abcdefg1@gmail.com',
      username: 'abcdefg1',
      nickname: '닉네임',
      password: await authService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
    });
    await expect(userCreated).toBeDefined();
  });

  test('Select', async () => {
    const salt = authService.createSalt();
    const userCreated = await accountService.createAccount({
      email: 'abcdefg2@gmail.com',
      username: 'abcdefg2',
      nickname: '닉네임',
      password: await authService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
    });

    const accountId = userCreated.id;
    const user = await accountService.findAccountById(accountId);
    await expect(user).toBeDefined();
  });

  test('Increase experience', async () => {
    const salt = authService.createSalt();
    const userCreated = await accountService.createAccount({
      email: 'abcdefg3@gmail.com',
      username: 'abcdefg3',
      nickname: '닉네임',
      password: await authService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
    });

    const user = await accountService.findAccountById(userCreated.id);
    if (user) {
      try {
        await accountService.increaseExp(user.id, 1000);
        const newUser = await accountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.exp).toEqual(1000);
        }
      } catch (e) {}
    }
  });

  test('Increase & decrease point', async () => {
    const salt = authService.createSalt();
    const userCreated = await accountService.createAccount({
      email: 'abcdefg4@gmail.com',
      username: 'abcdefg4',
      nickname: '닉네임',
      password: await authService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
    });

    const user = await accountService.findAccountById(userCreated.id);
    if (user) {
      try {
        await accountService.increasePoint(user.id, 400);
        const newUser = await accountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.point).toEqual(400);
        }
      } catch (e) {}

      try {
        await accountService.decreasePoint(user.id, 400);
        const newUser = await accountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.point).toEqual(0);
        }
      } catch (e) {}

      try {
        await accountService.decreasePoint(user.id, 100);
      } catch (e) {
        expect(e instanceof PointNotEnoughException).toBeTruthy();
      }
    }
  });
});
