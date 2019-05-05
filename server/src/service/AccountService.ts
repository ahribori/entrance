import Account from '../db/model/Account';
import AccountNotFoundException from '../exception/account/AccountNotFoundException';
import PointNotEnoughException from '../exception/account/PointNotEnoughException';

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
    return account.update({ point:decreasedPoint });
  }
}

export default AccountService;
