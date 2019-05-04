import { CustomError } from 'ts-custom-error';

export default class PointNotEnoughException extends CustomError {
  constructor() {
    super('Point not enough');
  }
}
