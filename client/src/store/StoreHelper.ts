import { AxiosError, AxiosResponse } from 'axios';

export interface NormalizedResponse {
  success: boolean;
  status: number;
  data: any;
  message?: string;
}

export interface RequestState {
  pending: boolean;
  error: AxiosError | null;
  data: any | null;
}

export default class StoreHelper {
  static createInitialState(): RequestState {
    return {
      pending: false,
      error: null,
      data: null,
    };
  }

  static createPendingState(): RequestState {
    return {
      pending: true,
      error: null,
      data: null,
    };
  }

  static createDoneState(response: AxiosResponse): RequestState {
    return {
      pending: false,
      error: null,
      data: response.data,
    };
  }

  static createErrorState(error: AxiosError): RequestState {
    return {
      pending: false,
      error: error,
      data: null,
    };
  }

  static normalizeResponse(responseOrError: AxiosResponse | AxiosError) {
    if (responseOrError instanceof Error) {
      return {
        success: false,
        status: responseOrError.response ? responseOrError.response.status : -1,
        data: responseOrError.response ? responseOrError.response.data : null,
        message: responseOrError.message,
      };
    }
    return {
      success: true,
      status: responseOrError.status,
      data: responseOrError.data,
    };
  }
}
