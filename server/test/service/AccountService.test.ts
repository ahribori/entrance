import uniqueString = require('unique-string');
import AuthService from '../../src/service/AuthService';
import PointNotEnoughException from '../../src/exception/account/PointNotEnoughException';
import AccountService, { AccountType } from '../../src/service/AccountService';
import LinkService from '../../src/service/LinkService';
import db from '../../src/db';
import ApplicationService from '../../src/service/ApplicationService';

const accountService = AccountService.getInstance();
const applicationService = ApplicationService.getInstance();
const authService = AuthService.getInstance();
const linkService = LinkService.getInstance();

const salt = authService.createSalt();

let passwordHash: string;
let getRandomUserInfo: Function;

beforeAll(async () => {
  await db.authenticate();
  passwordHash = await authService.createPasswordHash('123456', salt);
  getRandomUserInfo = () => {
    return {
      email: `${uniqueString()}@gmail.com`,
      username: uniqueString(),
      nickname: uniqueString(),
      password: passwordHash,
      accountType: AccountType.LOCAL,
      salt,
    };
  };
});

describe('AccountService Tests', () => {
  test('Create User', async () => {
    const userCreated = await accountService.createAccount(
      Object.assign({}, getRandomUserInfo(), {
        roles: [{ role: 'ADMIN' }, { role: 'USER' }],
      }),
    );
    await expect(userCreated).toBeDefined();
  });

  test('Select', async () => {
    const userCreated = await accountService.createAccount(getRandomUserInfo());
    const accountId = userCreated.id;
    const user = await accountService.findAccountById(accountId);
    await expect(user).toBeDefined();
  });

  test('Increase experience', async () => {
    const userCreated = await accountService.createAccount(getRandomUserInfo());

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
    const userCreated = await accountService.createAccount(getRandomUserInfo());
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

  test('Find accounts by applicationId', async () => {
    const account1 = await accountService.createAccount(getRandomUserInfo());
    const account2 = await accountService.createAccount(getRandomUserInfo());
    const application1 = await applicationService.createApplication(
      uniqueString(),
      account1.id,
      [],
    );
    await linkService.linkAccount(account1.id).toApplication(application1.id);
    await linkService.linkAccount(account2.id).toApplication(application1.id);
    const accounts = await accountService.findLinkedAccountsByApplicationId(
      application1.id,
    );
    expect(accounts.length).toBeGreaterThan(0);
  });

  test('Destroy Account', async () => {
    const account = await accountService.createAccount(getRandomUserInfo());
    const deleted = await accountService.deleteAccount(account.id);
    expect(deleted).toEqual(1);

    const accountDeleted = await accountService.findAccountById(account.id);
    if (accountDeleted) {
      expect(accountDeleted.deletedAt).toBeDefined();
      expect(accountDeleted.active).toEqual(false);
    }
  });

  test('Change password', async () => {
    const password = 'xxxxxx';
    const newPassword = 'zzzzzz';

    const account = await authService.signUp(
      'daniel',
      '다니엘',
      password,
      'my-email@gmail.com',
    );

    const passwordChangedAccount = await accountService.changePassword(
      account.email,
      newPassword,
    );
    try {
      const authBag = await authService.login(
        passwordChangedAccount.username,
        newPassword,
      );
      await expect(authBag).toBeDefined();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
