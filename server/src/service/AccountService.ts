import db from 'db';
import Account from 'db/model/Account';
import AccountNotFoundException from 'exception/account/AccountNotFoundException';
import PointNotEnoughException from 'exception/account/PointNotEnoughException';
import Application from 'db/model/Application';

export enum AccountType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

interface CreateAccountParams {
  accountType: AccountType;
  username: string;
  nickname: string;
  password?: string;
  email: string;
  salt: string;
}

class AccountService {
  private static instance: AccountService;

  private constructor() {}

  static getInstance(): AccountService {
    if (!AccountService.instance) {
      AccountService.instance = new AccountService();
    }
    return AccountService.instance;
  }

  async createAccount(account: CreateAccountParams) {
    return Account.create(account);
  }

  async findAccountById(accountId: number) {
    return Account.findByPk(accountId);
  }

  async findLinkedAccountsByApplicationId(applicationId: number) {
    return Account.findAll({
      include: [
        {
          model: Application,
          as: 'linkedApplications',
          where: {
            id: applicationId,
          },
        },
      ],
    });
  }

  async deleteAccount(accountId: number) {
    const transaction = await db.transaction();
    const account = await Account.findOne({
      where: { id: accountId },
      transaction,
    });
    if (account) {
      account.active = false;
      await account.save({ transaction });
    }
    const result = await Account.destroy({
      where: { id: accountId },
      transaction,
    });
    await transaction.commit();
    return result;
  }

  async increaseExp(accountId: number, amount: number) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account.update({ exp: account.exp + amount });
  }

  async increasePoint(accountId: number, amount: number) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    return account.update({ point: account.point + amount });
  }

  async decreasePoint(accountId: number, amount: number) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    const decreasedPoint = account.point - amount;
    if (decreasedPoint < 0) {
      throw new PointNotEnoughException();
    }
    return account.update({ point: decreasedPoint });
  }

}

export default AccountService;
