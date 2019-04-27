import AuthenticationService from '../../src/service/AuthenticationService';

describe('Authentication Tests', () => {

  test('Singleton test', () => {
    const authenticationService1 = AuthenticationService.getInstance();

    const authenticationService2 = AuthenticationService.getInstance();

    expect(authenticationService1).toEqual(authenticationService2);
  });


});
