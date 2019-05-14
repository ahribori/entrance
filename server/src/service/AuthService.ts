import * as crypto from 'crypto';
import Account from '../db/model/Account';
import EmailAlreadyVerifiedException from '../exception/auth/EmailAlreadyVerifiedException';
import MailService from './MailService';
import AccountService, { AccountType } from './AccountService';
import TokenService from './TokenService';
import { RoleType } from '../db/model/Role';
import AccountNotFoundException from '../exception/account/AccountNotFoundException';
import PasswordNotMatchedException from '../exception/auth/PasswordNotMatchedException';

interface AuthBag {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  /**
   * 회원가입
   * @param nickname
   * @param password
   * @param email
   */
  async signUp(email: string, password: string, nickname: string) {
    const salt = this.createSalt();
    const passwordHash = await this.createPasswordHash(password, salt);

    return AccountService.createAccount({
      accountType: AccountType.LOCAL,
      email,
      password: passwordHash,
      nickname,
      salt,
      roles: [{ role: RoleType.USER }],
    });
  }

  /**
   * Password와 Salt로 비밀번호 해쉬값을 만든다.
   * @param password
   * @param salt
   */
  async createPasswordHash(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 94182, 64, 'sha512', async (err, buf) => {
        if (err) {
          return reject(err);
        }
        return resolve(buf.toString('base64'));
      });
    });
  }

  /**
   * base64로 인코딩된 salt값을 만든다.
   */
  createSalt() {
    return crypto.randomBytes(64).toString('base64');
  }

  /**
   * 로그인
   * @param email
   * @param password
   */
  async login(email: string, password: string) {
    const account = await Account.findOne({ where: { email } });
    if (!account) {
      throw new AccountNotFoundException();
    }
    const passwordHash = await this.createPasswordHash(password, account.salt);
    if (passwordHash !== account.password) {
      throw new PasswordNotMatchedException();
    }
    return this.authorize(account.id);
  }

  /**
   * 써드파티 로그인
   * @param accountType
   * @param thirdPartyId
   */
  async thirdPartyLogin(
    accountType: AccountType,
    thirdPartyId: string | number,
  ) {}

  /**
   * account 에게 접근 권한을 줌
   * @param accountId
   */
  async authorize(accountId: string | number): Promise<AuthBag> {
    // TODO Authentication

    const accessToken = TokenService.issueAccessToken({ accountId });
    const refreshToken = TokenService.issueRefreshToken({ accountId });
    return { accessToken, refreshToken };
  }

  /**
   * refresh token을 검증해서 새로운 access token과 새로운 refresh token을 발행함.
   * @param refreshToken
   */
  async refresh(refreshToken: string): Promise<AuthBag> {
    try {
      const verifiedPayload = TokenService.verifyToken(refreshToken);
      const { accountId, exp } = verifiedPayload;

      // exp가 충분히 남았으면 refreshToken을 똑같이 내려주고, 조금밖에 안남았으면 새로운 refreshToken을 내려주자.
      const newAccessToken = TokenService.issueAccessToken({ accountId });
      const newRefreshToken = TokenService.issueRefreshToken({ accountId });
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw e;
    }
  }

  async sendEmailVerificationCode(accountId: number): Promise<string> {
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    const verificationToken = TokenService.issueEmailVerificationToken({
      accountId,
    });

    await MailService.sendMail({
      to: account.email,
      from: 'entrance <entrance.auth@gmail.com>',
      subject: '이메일 인증',
      html: `<form action="http://ahribori.com:8080/api/v1/auth/email-verification" method="post">${verificationToken}
            <input type="hidden" name="verifyToken" value="${verificationToken}" />
           <button type="submit">눌러</button>
        </form>`,
    });

    return verificationToken;
  }

  async verifyEmail(code: string): Promise<boolean> {
    const payload = TokenService.verifyToken(code);
    const { accountId } = payload;
    const account = await Account.findByPk(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }
    if (account.emailVerified) {
      throw new EmailAlreadyVerifiedException();
    }
    await account.update({ emailVerified: true });
    return true;
  }
}

export default new AuthService();
