import axios, { AxiosError, AxiosResponse } from 'axios';
import { notification } from 'antd';

const request = axios.create();

request.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with response data
    return response;
  },
  (error: AxiosError) => {
    // Do something with response error
    const { response } = error;
    if (response) {
      const { status } = response;
      switch (status) {
        case 500: {
          notification.error({
            message:
              '서비스에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.',
          });
          break;
        }
        default: {
        }
      }
    }
    return Promise.reject(error);
  },
);

export default request;
