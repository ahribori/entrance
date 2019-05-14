import { action, computed, observable } from 'mobx';
import AuthRepository, { SignUpParams } from '../repository/AuthRepository';

export interface IAuthStore {
  captcha: {
    svg: string;
    code: string;
  };
}

class AuthStore implements IAuthStore {
  @observable captcha: { svg: string; code: string } = { svg: '', code: '' };

  @action fetchCaptcha() {
    AuthRepository.fetchCaptcha()
      .then(response => {
        const { data, text } = response.data;
        this.captcha = {
          svg: data,
          code: text.toUpperCase(),
        };
      })
      .catch(console.error);
  }

  @action resetCaptcha() {
    this.captcha = { svg: '', code: '' };
  }

  signUp(params: SignUpParams) {
    return AuthRepository.signUp(params);
  }
}

export default new AuthStore();
