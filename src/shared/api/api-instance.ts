import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Referer': process.env.NEXT_PUBLIC_DOMAIN,
  },
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((res) => res.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
