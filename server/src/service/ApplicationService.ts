import uniqueString = require('unique-string');
import AccountService from './AccountService';
import AccountNotFoundException from '../exception/account/AccountNotFoundException';
import Application from '../db/model/Application';

class ApplicationService {
  private static instance: ApplicationService;

  private constructor() {}

  static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  async createApplication(name: string, accountId: number, origins: string[]) {
    const accountService = AccountService.getInstance();
    const account = await accountService.findAccountById(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return Application.create({
      name,
      accountId,
      origins: origins.join(','),
      apiKey: uniqueString(),
      sdkKey: uniqueString(),
    });
  }
}

export default ApplicationService;
