import { NextFunction, Request, Response } from 'express'
import { statusError } from './types-errors'

export const MethodsNotCreate = async (
  _req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  return res.status(405).json({ message: 'The method is not available at the moment.' })
}

export const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const type: string = err.message

  const errorType = (statusError as any)[type] ?? statusError['Service Unavailable']

  try {
    res.status(errorType.code).json({
      message: errorType.message,
      error: err.stack !== undefined && err.stack !== null ? JSON.parse(err.stack) : undefined
    })
  } catch (error) {
    res.status(errorType.code).json({
      message: errorType.message,
      error: 'Error when obtaining the stack'
    })
  }
}
