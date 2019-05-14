import uniqueString = require('unique-string');
import AccountService from './AccountService';
import AccountNotFoundException from '../exception/account/AccountNotFoundException';
import Application from '../db/model/Application';

class ApplicationService {
  async createApplication(name: string, accountId: number, origins: string[]) {
    const account = await AccountService.findAccountById(accountId);
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

export default new ApplicationService();
