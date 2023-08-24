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

  console.log('error')
  console.log(err.message)
  console.log(err.name)
  console.log(err.stack)

  try {
    console.log(err.stack !== undefined && err.stack !== null)
    if (err.stack !== undefined && err.stack !== null) {
      console.log(err.stack)
      console.log(JSON.parse(err.stack).reason)
    }
    res.status(errorType.code).json({
      message: err.name,
      error: err.stack !== undefined && err.stack !== null ? JSON.parse(err.stack) : undefined
    })
  } catch (error) {
    res.status(errorType.code).json({
      message: err.name,
      error: 'Error when obtaining the stack'
    })
  }
}
