import request from '../lib/axios';

class AuthRepository {
  baseUrl = '/api/v1/auth';

  fetchCaptcha() {
    return request.get(`${this.baseUrl}/captcha`);
  }
}

export default new AuthRepository();
