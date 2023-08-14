import PostModel from '../../post/models/PostModel'
import { User, UserPartial, UserResponse, UsersResponse } from '../../types'
import UserModel from '../models/UserModel'

import { UniqueConstraintError } from 'sequelize'

export default class UserService {
  async getAllUser (): Promise<UsersResponse> {
    try {
      const response = await UserModel.findAll({
        paranoid: false,
        attributes: ['id', 'name', 'lastname', 'surname']
      })

      if (response.length > 0) {
        return {
          status: 200,
          data: response
        }
      } else {
        return {
          status: 404,
          data: []
        }
      }
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }

  async getUserById (id: number): Promise<UserResponse> {
    try {
      const response = await UserModel.findOne({
        where: {
          id
        },
        attributes: ['id', 'name', 'lastname', 'surname']
      })

      if (response != null) {
        return {
          status: 200,
          data: response.dataValues
        }
      }

      return {
        status: 404,
        data: null
      }
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }

  async createUser (user: User): Promise<UserResponse> {
    try {
      const response = await UserModel.create({
        ...user
      })
      return {
        status: 201,
        data: response
      }
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return {
          status: 400,
          data: {
            errors: {
              message: 'El correo ya esta registado'
            }
          }
        }
      }
      return {
        status: 500,
        data: null
      }
    }
  }

  async updateUser (user: UserPartial, id: number): Promise<UserResponse> {
    try {
      const getUser = await this.getUserById(id)
      if (getUser.status === 200) {
        await UserModel.update(
          { ...user },
          {
            where: {
              id
            }
          }
        )

        return {
          status: 200,
          data: { ...getUser.data, ...user }
        }
      }
      return getUser
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }

  async deleteUser (id: number): Promise<UserResponse> {
    try {
      const getUser = await this.getUserById(id)
      if (getUser.status === 200) {
        await UserModel.destroy({
          where: {
            id
          }
        })

        return {
          status: 200,
          data: getUser.data
        }
      }
      return getUser
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }

  // Post User

  async getPostByUser (id: number): Promise<UserResponse> {
    try {
      const posts = await UserModel.findOne({
        where: {
          id
        },
        include: [
          {
            model: PostModel,
            include: [
              {
                model: UserModel,
                attributes: ['id', 'surname']
              }
            ]
          }
        ]
        // attributes: []
      })

      return {
        status: 200,
        data: posts
      }
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }
}
