import request from '../lib/axios';

class AccountRepository {
  baseUrl = '/api/v1/account';

  fetchAccountDetails(accessToken: string) {
    return request.get(`${this.baseUrl}/me`, { headers: { authorization: accessToken}});
  }
}

export default new AccountRepository();
