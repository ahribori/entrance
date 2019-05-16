import { AxiosError, AxiosResponse } from 'axios';
import { Simulate } from 'react-dom/test-utils';

export enum RequestState {
  CLEAN = 'CLEAN',
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export interface NormalizedResponse {
  success: boolean;
  status: number;
  data: any;
  message?: string;
}


export const normalizeResponse = (responseOrError: AxiosResponse | AxiosError): NormalizedResponse => {
  if (responseOrError instanceof Error) {
    return {
      success: false,
      status: responseOrError.response ? responseOrError.response.status : -1,
      data: responseOrError.response ? responseOrError.response.data : null,
      message: responseOrError.message,
    }
  }
  return {
    success: true,
    status: responseOrError.status,
    data: responseOrError.data,
  }
};
