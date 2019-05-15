import { CustomError } from 'ts-custom-error';
import { Result } from 'express-validator/check';

export default class RequestParamException extends CustomError {
  status: number = 400;
  message: string = 'Bad Request';
  validationErrors: Record<string, object>;
  constructor(validationResult: Result) {
    super();
    this.validationErrors = validationResult.mapped();
  }
}
