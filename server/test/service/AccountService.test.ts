import uniqueString = require('unique-string');
import AuthService from '../../src/service/AuthService';
import ApplicationService from '../../src/service/ApplicationService';
import AccountService, { AccountType } from '../../src/service/AccountService';
import LinkService from '../../src/service/LinkService';
import PointNotEnoughException from '../../src/exception/account/PointNotEnoughException';
import db from '../../src/db';

const salt = AuthService.createSalt();

let passwordHash: string;
let getRandomUserInfo: Function;

beforeAll(async () => {
  await db.authenticate();
  passwordHash = await AuthService.createPasswordHash('123456', salt);
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
    const userCreated = await AccountService.createAccount(
      Object.assign({}, getRandomUserInfo(), {
        roles: [{ role: 'ADMIN' }, { role: 'USER' }],
      }),
    );
    await expect(userCreated).toBeDefined();
  });

  test('Select', async () => {
    const userCreated = await AccountService.createAccount(getRandomUserInfo());
    const accountId = userCreated.id;
    const user = await AccountService.findAccountById(accountId);
    await expect(user).toBeDefined();
  });

  test('Increase experience', async () => {
    const userCreated = await AccountService.createAccount(getRandomUserInfo());

    const user = await AccountService.findAccountById(userCreated.id);
    if (user) {
      try {
        await AccountService.increaseExp(user.id, 1000);
        const newUser = await AccountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.exp).toEqual(1000);
        }
      } catch (e) {}
    }
  });

  test('Increase & decrease point', async () => {
    const userCreated = await AccountService.createAccount(getRandomUserInfo());
    const user = await AccountService.findAccountById(userCreated.id);
    if (user) {
      try {
        await AccountService.increasePoint(user.id, 400);
        const newUser = await AccountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.point).toEqual(400);
        }
      } catch (e) {}

      try {
        await AccountService.decreasePoint(user.id, 400);
        const newUser = await AccountService.findAccountById(userCreated.id);
        if (newUser) {
          expect(newUser.point).toEqual(0);
        }
      } catch (e) {}

      try {
        await AccountService.decreasePoint(user.id, 100);
      } catch (e) {
        expect(e instanceof PointNotEnoughException).toBeTruthy();
      }
    }
  });

  test('Find accounts by applicationId', async () => {
    const account1 = await AccountService.createAccount(getRandomUserInfo());
    const account2 = await AccountService.createAccount(getRandomUserInfo());
    const application1 = await ApplicationService.createApplication(
      uniqueString(),
      account1.id,
      [],
    );
    await LinkService.linkAccount(account1.id).toApplication(application1.id);
    await LinkService.linkAccount(account2.id).toApplication(application1.id);
    const accounts = await AccountService.findLinkedAccountsByApplicationId(
      application1.id,
    );
    expect(accounts.length).toBeGreaterThan(0);
  });

  test('Find account by email', async () => {
    const accountCreated = await AccountService.createAccount(
      getRandomUserInfo(),
    );
    const account = await AccountService.findAccountByEmail(
      accountCreated.email,
    );
    await expect(account).toBeDefined();
    if (account) {
      expect(account.id).toEqual(accountCreated.id);
    }
  });

  test('Destroy Account', async () => {
    const account = await AccountService.createAccount(getRandomUserInfo());
    const deleted = await AccountService.deleteAccount(account.id);
    expect(deleted).toEqual(1);

    const accountDeleted = await AccountService.findAccountById(account.id);
    if (accountDeleted) {
      expect(accountDeleted.deletedAt).toBeDefined();
      expect(accountDeleted.active).toEqual(false);
    }
  });

  test('Change password', async () => {
    const password = 'xxxxxx';
    const newPassword = 'zzzzzz';

    const account = await AuthService.signUp(
      'daniel',
      '다니엘',
      password,
      'my-email@gmail.com',
    );

    const passwordChangedAccount = await AccountService.changePassword(
      account.email,
      newPassword,
    );
    try {
      const authBag = await AuthService.login(
        passwordChangedAccount.username,
        newPassword,
      );
      await expect(authBag).toBeDefined();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });
});
