/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router, Request, Response } from 'express'
import UserService from '../services/UserService'
import { validateParcialUser, validateUser } from '../../validates/user-validate'
import middleware from '../../middleware'
import { getIdByToken } from '../../utils/token'

const path = '/users'

const UserController = Router()

const userService = new UserService()

UserController.get(path, middleware, async (_req: Request, res: Response): Promise<void> => {
  getIdByToken(_req.headers.authorization)
  const { status, data } = await userService.getAllUser()
  res.status(status).json(data).end()
})

UserController.get(`${path}/:userId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const { status, data } = await userService.getUserById(+req.params.userId)
  res.status(status).json(data).end()
})

UserController.post(path, async (req: Request, res: Response): Promise<void> => {
  const result = validateUser(req.body)
  if (result.success) {
    const { status, data } = await userService.createUser(result.data)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

UserController.patch(`${path}/:userId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const result = validateParcialUser(req.body)
  if (result.success) {
    const { status, data } = await userService.updateUser(result.data, +req.params.userId)
    res.status(status).json(data).end()
  } else {
    res.status(400).json({ errors: JSON.parse(result.error.message) })
  }
})

UserController.delete(`${path}/:userId`, middleware, async (req: Request, res: Response): Promise<void> => {
  const { status, data } = await userService.deleteUser(+req.params.userId)
  res.status(status).json(data).end()
})

// Post User

UserController.get(`${path}/posts/all`, middleware, async (req: Request, res: Response): Promise<void> => {
  const userId = getIdByToken(req.headers.authorization)
  const { status, data } = await userService.getPostByUser(userId)
  res.status(status).json(data).end()
})

export default UserController
