import request from '../lib/axios';

class AccountRepository {
  baseUrl = '/api/v1/account';

  fetchAccountDetails(accessToken: string) {
    return request.get(`${this.baseUrl}/me`, {
      headers: { authorization: accessToken },
    });
  }

  resetPassword(password: string, code: string) {
    return request.post(
      `${this.baseUrl}/reset-password`,
      { password },
      { headers: { authorization: code } },
    );
  }
}

export default new AccountRepository();
