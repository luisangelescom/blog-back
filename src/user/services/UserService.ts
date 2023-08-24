import { NextFunction, Request, Response } from 'express'
import { ModelUser } from '../models/ModelUser'

import { ErrorResponse } from '../../errors/NotFound'
import { typesOfErrores } from '../../types-errors'
import { validateParcialUser, validateUser } from '../../validates/user-validate'
import { getIdByToken } from '../../utils/token'

export default class UserService {
  async getAllUser (_req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const response = await ModelUser.getAllUser()

      if (response.length > 0) {
        return res.status(200).json(response).end()
      }
      throw new ErrorResponse(typesOfErrores['Not Found'], { error: 'No se encontraron usuarios' })
    } catch (error) {
      next(error)
    }
  }

  async getUserById (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = +req.params.userId
      const response = await ModelUser.getUserById(id)

      if (response != null) {
        return res.status(200).json(response).end()
      }

      throw new ErrorResponse(typesOfErrores['Not Found'], { error: `No se encontraron usuarios con el id ${id}` })
    } catch (error) {
      next(error)
    }
  }

  async createUser (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const result = validateUser(req.body)
      if (!result.success) {
        throw new ErrorResponse(typesOfErrores['Bad Request'], result.error.message)
      }
      const response = await ModelUser.createUser(result.data)
      return res.status(201).json(response).end()
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
        next(new ErrorResponse(error.name, { error: 'El surname esta duplicado.' }))
      } else { next(error) }
    }
  }

  async updateUser (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const result = validateParcialUser(req.body)
      if (!result.success) {
        throw new ErrorResponse(typesOfErrores['Bad Request'], result.error.message)
      }
      const userId = +req.params.userId
      const getUser = await ModelUser.getUserById(userId)
      if (getUser !== null) {
        await ModelUser.updateUser(result.data, userId)

        return res.status(200).json({ ...getUser.dataValues, ...result.data }).end()
      }
      throw new ErrorResponse(typesOfErrores['Not Found'], { error: `No se encontraron el usuario con el id ${userId}` })
    } catch (error) {
      next(error)
    }
  }

  async deleteUser (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = +req.params.userId
      const getUser = await ModelUser.getUserById(id)
      if (getUser !== null) {
        await ModelUser.deleteUser(id)
        return res.status(200).json(getUser).end()
      }
      throw new ErrorResponse(typesOfErrores['Not Found'], { error: `No se encontraron el usuario con el id ${id}` })
    } catch (error) {
      next(error)
    }
  }

  // Post User

  async getPostByUser (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const id = getIdByToken(req.headers.authorization)
      const posts = await ModelUser.getPostByUser(id)
      if (posts !== null) {
        return res.status(200).json(posts).end()
      }

      throw new ErrorResponse(typesOfErrores['Not Found'], { error: `No se encontraron el usuario con el id ${id}` })
    } catch (error) {
      next(error)
    }
  }
}
