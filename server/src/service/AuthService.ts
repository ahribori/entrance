import TokenService from './TokenService';

enum ThirdPartyLoginProvider {
  KAKAO = 'kakao',
  NAVER = 'naver',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

interface AuthBag {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * 로그인
   * @param username
   * @param password
   */
  async login(username: string, password: string) {}

  /**
   * 써드파티 로그인
   * @param provider
   * @param thirdPartyId
   */
  async thirdPartyLogin(
    provider: ThirdPartyLoginProvider,
    thirdPartyId: string | number,
  ) {}

  /**
   * account 에게 접근 권한을 줌
   * @param accountId
   */
  async authorize(accountId: string | number): Promise<AuthBag> {
    // TODO Authentication

    const tokenService = TokenService.getInstance();
    const accessToken = tokenService.issueAccessToken({ accountId });
    const refreshToken = tokenService.issueRefreshToken({ accountId });
    return { accessToken, refreshToken };
  }

  /**
   * refresh token을 검증해서 새로운 access token과 새로운 refresh token을 발행함.
   * @param refreshToken
   */
  async refresh(refreshToken: string): Promise<AuthBag> {
    const tokenService = TokenService.getInstance();
    try {
      const verifiedPayload = tokenService.verifyToken(refreshToken);
      const { accountId, exp } = verifiedPayload;

      // exp가 충분히 남았으면 refreshToken을 똑같이 내려주고, 조금밖에 안남았으면 새로운 refreshToken을 내려주자.
      const newAccessToken = tokenService.issueAccessToken({ accountId });
      const newRefreshToken = tokenService.issueRefreshToken({ accountId });
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw e;
    }
  }
}

export default AuthService;
