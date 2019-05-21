import { action, observable } from 'mobx';
import AccountRepository from '../repository/AccountRepository';
import StoreHelper from './StoreHelper';

class AccountStore {
  @observable accountDetails = null;

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
