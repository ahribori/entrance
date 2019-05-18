import request from '../lib/axios';
import queryString from 'querystring';

export interface SignUpParams {
  email: string;
  password: string;
  nickname: string;
  [key: string]: any;
}

export interface LoginParams {
  email: string;
  password: string;
  [key: string]: any;
}

class AuthRepository {
  baseUrl = '/api/v1/auth';

  fetchCaptcha() {
    return request.get(`${this.baseUrl}/captcha`);
  }

  signUp(params: SignUpParams) {
    return request.post(
      `${this.baseUrl}/signup`,
      queryString.stringify(params),
    );
  }

  login(params: LoginParams) {
    return request.post(
      `${this.baseUrl}/login`,
      queryString.stringify(params),
    );
  }
}

export default new AuthRepository();
