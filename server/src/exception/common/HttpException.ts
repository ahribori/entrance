import { CustomError } from 'ts-custom-error';

export default class HttpException extends CustomError {
  constructor(status: number, message: string) {
    super(message);
  }
}
