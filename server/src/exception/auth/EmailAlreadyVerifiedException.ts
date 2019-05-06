import { CustomError } from 'ts-custom-error';

export default class EmailAlreadyVerifiedException extends CustomError {
  constructor() {
    super('Email already verified');
  }
}
