import { action, observable } from 'mobx';
import AccountRepository from '../repository/AccountRepository';
import StoreHelper from './StoreHelper';

export enum AccountType {
  LOCAL = 'LOCAL',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export interface IAccountDetails {
  accountType: AccountType;
  active: boolean;
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  emailVerified: boolean;
  exp: number;
  id: number;
  nickname: string;
  point: number;
  profileImage?: string;
  roles: { role: string }[];
  thumbnailImage?: string;
  updatedAt: Date;
}

class AccountStore {
  @observable accountDetails: IAccountDetails | null = null;

  @action fetchAccountDetails(accessToken: string) {
    return AccountRepository.fetchAccountDetails(accessToken)
      .then(response => {
        this.accountDetails = response.data;
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        return StoreHelper.normalizeResponse(err);
      });
  }

  @action passwordReset(password: string, code: string) {
    return AccountRepository.resetPassword(password, code)
      .then(response => {
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        return StoreHelper.normalizeResponse(err);
      });
  }
}

export default new AccountStore();
