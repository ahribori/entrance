import { CustomError } from 'ts-custom-error';

export default class AccountAlreadyExistException extends CustomError {
  constructor() {
    super('Account already exist');
  }
}
