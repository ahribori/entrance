import { action, observable } from 'mobx';
import AuthRepository, { SignInParams, SignUpParams } from '../repository/AuthRepository';
import { normalizeResponse, RequestState } from './helper';

class AuthStore {
  @observable captcha = { svg: '', code: '' };
  @observable signUpState = RequestState.CLEAN;
  @observable loginState = RequestState.CLEAN;
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

  @action signIn(params: SignInParams) {
    this.loginState = RequestState.PENDING;
    return AuthRepository.signIn(params)
      .then(response => {
        this.loginState = RequestState.DONE;
        return normalizeResponse(response);
      })
      .catch(err => {
        this.loginState = RequestState.ERROR;
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
