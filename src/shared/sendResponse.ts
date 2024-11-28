import { Response } from 'express';

type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiReponse<T>): void => {
  // Check if the response has already been sent
  if (res.headersSent) {
    console.warn('Response already sent, skipping further response logic.');
    return;
  }

  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || undefined, // meta should be undefined if not provided
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
