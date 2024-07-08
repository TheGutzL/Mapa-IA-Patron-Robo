import { AxiosError, AxiosResponse } from "axios";

interface CustomResponseData {
  message?: string[];
  error?: string;
  statusCode?: number;
}

interface CustomAxiosResponse extends AxiosResponse<CustomResponseData> { }

export interface CustomAxiosError extends AxiosError<CustomResponseData> {
  response?: CustomAxiosResponse;
}