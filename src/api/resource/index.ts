import axios, { AxiosRequestConfig, Method, ResponseType, AxiosResponse } from 'axios';
import { useRequest } from 'ahooks';
import type { Options } from 'ahooks/lib/useRequest/src/types';
import { Config } from '../config';
import { message } from '../../components/AntD';

const CORRECT_CODE = 0;

export type ReturnDataType<T = any> = { code: string; msg: string | null; data: T };
export type ResourceResponseType<T = any> =
  | AxiosResponse<ReturnDataType<T>>
  | { data: ReturnDataType<T>; status: number };

class Request<TParams, TResponseData> {
  name: string;
  action: string;
  params: Record<string, any>;
  method: Method = 'GET';
  responseType: ResponseType = 'json';
  returnError: boolean;
  prefix: string;

  constructor(
    name: string,
    action: string,
    params: Record<string, any> = {},
    method: Method = 'GET',
    responseType: ResponseType = 'json',
  ) {
    this.name = name;
    this.action = action;
    this.params = params;
    this.method = method;
    this.responseType = responseType;
    this.returnError = false;
    this.prefix = Config.getUrlPrefix();
  }

  setReturnError(flag: boolean) {
    this.returnError = flag;
    return this;
  }

  getAxiosParams(params: Record<string, any> = {}): AxiosRequestConfig {
    const { prefix, name, action, method, responseType } = this;
    const pre = name.includes('http://') || name.includes('https://') ? '' : prefix;
    const url = `${pre}${pre ? '/' : ''}${name}${action ? '/' : ''}${action || ''}`;
    const axiosParams: AxiosRequestConfig = {
      url,
      method,
      responseType,
      withCredentials: true,
    };

    axiosParams.headers = {};
    const mergeParams: Record<string, any> = {
      ...this.params,
      ...params,
    };

    const p = new URLSearchParams();
    Object.keys(mergeParams).forEach((key) => {
      p.append(key, mergeParams[key]);
    });
    if (method.toUpperCase() === 'GET') {
      axiosParams.params = p;
    } else {
      axiosParams.data = p;
    }
    return axiosParams;
  }

  originCall(params?: Record<string, any> | undefined): Promise<ResourceResponseType<TResponseData | null>> {
    const axiosParams = this.getAxiosParams();

    if (params) {
      if (axiosParams.method === 'GET') {
        axiosParams.params = params;
      } else {
        axiosParams.data = params;
      }
    }

    return new Promise<ResourceResponseType<TResponseData | null>>((resolve) => {
      axios
        .request(axiosParams)
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          const response: AxiosResponse = e.response;
          const code = e.response?.status || -1;
          resolve({
            status: 200,
            data: {
              code: code.toString(),
              msg: e.message,
              data: null,
            },
          });
        });
    });
  }

  call(params?: Record<string, any>): Promise<ReturnDataType<TResponseData | null>> {
    const axiosParams = this.getAxiosParams();

    if (params) {
      if (axiosParams.method === 'GET') {
        axiosParams.params = params;
      } else {
        axiosParams.data = params;
      }
    }

    return new Promise<ReturnDataType<TResponseData | null>>((resolve) => {
      axios
        .request(axiosParams)
        .then((response) => {
          if (response.data.code !== CORRECT_CODE && !this.returnError) {
            message.error(response.data.msg);
            return;
          }
          resolve(response.data);
        })
        .catch((e) => {
          const response: AxiosResponse = e.response;
          const code = e.response?.status || -1;
          if (!this.returnError) {
            message.error(e.message);
            return;
          }

          resolve({
            code: code.toString(),
            msg: e.message,
            data: null,
          });
        });
    });
  }

  useRequest(options?: Options<ReturnDataType<TResponseData | null>, [TParams]>) {
    const callback = this.call.bind(this);
    return useRequest<ReturnDataType<TResponseData | null>, [TParams]>(callback, options);
  }
}

function genRequest<TResponseData, TParams = undefined>(
  name: string,
  action: string,
  method?: Method,
): (params?: Record<string, any>) => Request<TParams, TResponseData> {
  return (params: Record<string, any> = {}) => {
    const p = {
      ...params,
    };
    return new Request<TParams, TResponseData>(name, action, p, method || 'GET');
  };
}

export const ShortUrlCreate = genRequest<{ code: string }>('shorturl/v0', 'create', 'POST');
