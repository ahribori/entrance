import { CustomError } from 'ts-custom-error';

export default class AccountNotFoundException extends CustomError {
  constructor() {
    super('Account not found');
  }
}
