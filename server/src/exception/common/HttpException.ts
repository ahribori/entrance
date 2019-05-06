import { CustomError } from 'ts-custom-error';

export default class HttpException extends CustomError {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
