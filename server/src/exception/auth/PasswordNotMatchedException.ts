import { CustomError } from 'ts-custom-error';

export default class PasswordNotMatchedException extends CustomError {
  constructor() {
    super('Password not matched');
  }
}
