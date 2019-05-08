import AuthService from '../../src/service/AuthService';
import LinkService from '../../src/service/LinkService';
import AccountService, { AccountType } from '../../src/service/AccountService';
import db from '../../src/db';
import ApplicationService from '../../src/service/ApplicationService';

const linkService = LinkService.getInstance();
const accountService = AccountService.getInstance();
const authService = AuthService.getInstance();
const applicationService = ApplicationService.getInstance();

let accountId: number;
let applicationId: number;

beforeAll(async () => {
  await db.authenticate();
  const salt = authService.createSalt();
  const accountCreated = await accountService.createAccount({
    email: 'link-service-test@gmail.com',
    username: 'link-service',
    nickname: '테스트',
    password: await authService.createPasswordHash('123456', salt),
    accountType: AccountType.LOCAL,
    salt,
    role: [],
  });
  const applicationCreated = await applicationService.createApplication(
    '테스트 어플리케이션',
    accountCreated.id,
    ['https://ahribori.com'],
  );
  accountId = accountCreated.id;
  applicationId = applicationCreated.id;
});

describe('LinkService tests', () => {
  test('Link Account to Application', async () => {
    const link = await linkService
      .linkAccount(accountId)
      .toApplication(applicationId);
    expect(link).toBeDefined();
  });

  test('Unlink Account from Application', async () => {
    const unlink = await linkService
      .unlinkAccount(accountId)
      .fromApplication(applicationId);
  });
});
