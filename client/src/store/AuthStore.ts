import { action, observable } from 'mobx';
import StoreHelper from './StoreHelper';
import AuthRepository, {
  LoginParams,
  SignUpParams,
} from '../repository/AuthRepository';

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  EMAIL_VERIFICATION_TOKEN = 'email_verification_token',
  PASSWORD_RESET_TOKEN = 'password_reset_token',
}

class AuthStore {
  @observable signUpState = StoreHelper.createInitialState();
  @observable loginState = StoreHelper.createInitialState();
  @observable passwordResetMailState = StoreHelper.createInitialState();
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

  @action verifyToken(token: string) {
    return AuthRepository.verifyToken(token)
      .then(response => {
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        return StoreHelper.normalizeResponse(err);
      });
  }

  @action sendPasswordResetMail(email: string) {
    return AuthRepository.sendPasswordResetMail(email)
      .then(response => {
        this.passwordResetMailState = StoreHelper.createDoneState(response);
        return StoreHelper.normalizeResponse(response);
      })
      .catch(err => {
        this.passwordResetMailState = StoreHelper.createErrorState(err);
        return StoreHelper.normalizeResponse(err);
      });
  }
}

export default new AuthStore();
