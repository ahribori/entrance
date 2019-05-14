import AuthService from '../../src/service/AuthService';
import AccountService, { AccountType } from '../../src/service/AccountService';
import AccountNotFoundException from '../../src/exception/account/AccountNotFoundException';
import db from '../../src/db';
import ApplicationService from '../../src/service/ApplicationService';

beforeAll(async () => {
  await db.authenticate();
});

describe('ApplicationService tests', () => {
  test('Create Application', async () => {
    const salt = AuthService.createSalt();
    const userCreated = await AccountService.createAccount({
      email: 'app_test@gmail.com',
      username: 'app_test1',
      nickname: '테스트',
      password: await AuthService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
      role: [],
    });

    try {
      const applicationCreated = await ApplicationService.createApplication(
        'My Application',
        userCreated.id,
        ['a, b, c'],
      );
      expect(applicationCreated.accountId).toEqual(userCreated.id);
    } catch (e) {}

    try {
      const applicationCreated = await ApplicationService.createApplication(
        'My Application',
        1000,
        ['a, b, c'],
      );
      expect(applicationCreated.accountId).toEqual(userCreated.id);
    } catch (e) {
      expect(e instanceof AccountNotFoundException).toBeTruthy();
    }
  });
});
