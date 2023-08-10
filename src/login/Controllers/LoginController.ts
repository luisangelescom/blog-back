/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, Request, Response } from 'express'

import { validateLogin } from '../../validates/login-validate'
import LoginService from '../Service/LoginService'

const path = '/login'

const LoginController = Router()

const loginService = new LoginService()

interface CustomSessionData {
  usuario: string
}

declare module 'express-session' {
  interface SessionData {
    user: CustomSessionData
  }
}

LoginController.post(path, async (req: Request, res: Response): Promise<void> => {
  const result = validateLogin(req.body)
  if (result.success) {
    const { status, data } = await loginService.getToken(result.data)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

export default LoginController
