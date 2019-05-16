import { action, observable } from 'mobx';
import AuthRepository, { SignUpParams } from '../repository/AuthRepository';
import { normalizeResponse, RequestState } from './helper';

export interface IAuthStore {
  captcha: {
    svg: string;
    code: string;
  };
  signUpState: RequestState;
}

class AuthStore implements IAuthStore {
  @observable captcha = { svg: '', code: '' };
  @observable signUpState = RequestState.CLEAN;

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

  @action signUp(params: SignUpParams) {
    this.signUpState = RequestState.PENDING;
    return AuthRepository.signUp(params)
      .then(response => {
        this.signUpState = RequestState.DONE;
        return normalizeResponse(response);
      })
      .catch(err => {
        this.signUpState = RequestState.ERROR;
        return normalizeResponse(err);
      });
  }
}

export default new AuthStore();
