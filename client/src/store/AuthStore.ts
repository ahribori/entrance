import { action, observable } from 'mobx';
import StoreHelper from './StoreHelper';
import AuthRepository, {
  LoginParams,
  SignUpParams,
} from '../repository/AuthRepository';

class AuthStore {
  @observable signUpState = StoreHelper.createInitialState();
  @observable loginState = StoreHelper.createInitialState();
  @observable captcha = { svg: '', code: '' };
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
    this.signUpState = StoreHelper.createPendingState();
    return AuthRepository.signUp(params)
      .then(response => {
        this.signUpState = StoreHelper.createDoneState(response);
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        this.signUpState = StoreHelper.createErrorState(err);
        return StoreHelper.normalizeResponse(err);
      });
  }

  @action login(params: LoginParams) {
    this.loginState = StoreHelper.createPendingState();
    return AuthRepository.login(params)
      .then(response => {
        this.loginState = StoreHelper.createDoneState(response);
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        this.loginState = StoreHelper.createErrorState(err);
        return StoreHelper.normalizeResponse(err);
      });
  }

  @action logout() {
    this.accessToken = null;
    localStorage.removeItem('__entrance_access_token__');
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
