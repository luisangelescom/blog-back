/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express'
import UserService from '../services/UserService'
import middleware from '../../middleware'

const path = '/users'

const UserController = Router()

const userService = new UserService()

UserController.get(path, middleware, userService.getAllUser)

UserController.get(`${path}/:userId`, middleware, userService.getUserById)

UserController.post(path, userService.createUser)

UserController.patch(`${path}/:userId`, middleware, userService.updateUser)

UserController.delete(`${path}/:userId`, middleware, userService.deleteUser)

// Post User

UserController.get(`${path}/posts/all`, middleware, userService.getPostByUser)

export default UserController
