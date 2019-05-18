import Role, { RoleType } from '../db/model/Role';
import Account from '../db/model/Account';
import Application from '../db/model/Application';
import PointNotEnoughException from '../exception/account/PointNotEnoughException';
import AccountNotFoundException from '../exception/account/AccountNotFoundException';
import db from '../db';
import AuthService from './AuthService';
import AccountAlreadyExistException from '../exception/account/AccountAlreadyExistException';

export enum AccountType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

interface CreateAccountParams {
  accountType: AccountType;
  nickname: string;
  password?: string;
  email: string;
  salt: string;
  roles: { role: RoleType }[];
}

class AccountService {
  async createAccount(account: CreateAccountParams) {
    const accountFounded = await this.findAccountByEmail(account.email);
    if (accountFounded) {
      throw new AccountAlreadyExistException();
    }
    return Account.create(account, { include: [Role] });
  }

  async findAccountById(accountId: number) {
    return Account.findByPk(accountId, {
      attributes: { exclude: ['password', 'salt'] },
      include: [{ model: Role, attributes: ['role'] }],
    });
  }

  async findAccountByEmail(email: string) {
    return Account.findOne({ where: { email } });
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

  async changePassword(email: string, newPassword: string) {
    const account = await Account.findOne({ where: { email } });
    if (!account) {
      throw new AccountNotFoundException();
    }
    const salt = AuthService.createSalt();
    const newPasswordHash = await AuthService.createPasswordHash(
      newPassword,
      salt,
    );
    account.salt = salt;
    account.password = newPasswordHash;
    return account.save();
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

export default new AccountService();
