import AuthService from '../../src/service/AuthService';
import AccountService, { AccountType } from '../../src/service/AccountService';
import AccountNotFoundException from '../../src/exception/account/AccountNotFoundException';
import db from '../../src/db';
import ApplicationService from '../../src/service/ApplicationService';

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
      role: [],
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
