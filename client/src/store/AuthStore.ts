import { action, observable } from 'mobx';
import AuthRepository, { SignUpParams } from '../repository/AuthRepository';
import { normalizeResponse, RequestState } from './helper';

export interface IAuthStore {
  captcha: {
    svg: string;
    code: string;
  };
  signUpState: RequestState;
  accessToken: string | null;
}

class AuthStore implements IAuthStore {
  @observable captcha = { svg: '', code: '' };
  @observable signUpState = RequestState.CLEAN;
  @observable accessToken: string | null = null;

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

  @action loadAccessToken() {
    this.accessToken = window.localStorage.getItem('__entrance_access_token__');
    return this.accessToken;
  }

  @action storeAccessToken(accessToken: string) {
    localStorage.setItem('__entrance_access_token__', accessToken);
    return accessToken;
  }
}

export default new AuthStore();
