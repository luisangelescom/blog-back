
import { Response, Request, NextFunction } from 'express'
import { verifyToken } from './utils/token'

const middleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers.authorization !== undefined && req.headers.authorization !== null && verifyToken(req.headers.authorization)) {
    next()
  } else {
    res.status(401).json({
      errors: {
        message: 'Unauthorize'
      }
    }).end()
  }
}

export default middleware
