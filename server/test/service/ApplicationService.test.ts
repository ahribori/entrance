import db from 'db';
import AuthService from 'service/AuthService';
import AccountService, { AccountType } from 'service/AccountService';
import AccountNotFoundException from 'exception/account/AccountNotFoundException';
import ApplicationService from 'service/ApplicationService';

beforeAll(async () => {
  await db.authenticate();
});

describe('ApplicationService tests', () => {
  const accountService = AccountService.getInstance();
  const authService = AuthService.getInstance();
  const applicationService = ApplicationService.getInstance();

  test('Create Application', async () => {
    const salt = authService.createSalt();
    const userCreated = await accountService.createAccount({
      email: 'app_test@gmail.com',
      username: 'app_test1',
      nickname: '테스트',
      password: await authService.createPasswordHash('123456', salt),
      accountType: AccountType.LOCAL,
      salt,
    });

    try {
      const applicationCreated = await applicationService.createApplication(
        'My Application',
        userCreated.id,
        ['a, b, c'],
      );
      expect(applicationCreated.accountId).toEqual(userCreated.id);
    } catch (e) {}

    try {
      const applicationCreated = await applicationService.createApplication(
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
