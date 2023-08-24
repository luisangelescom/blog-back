import PostModel from '../../post/models/PostModel'
import { User, UserPartial } from '../../types'
import UserModel from './UserModel'

// disabled eslint
export class ModelUser {
  get modelName (): string {
    return ModelUser.name
  }

  static async getAllUser (): Promise<UserModel[]> {
    return await UserModel.findAll({
      paranoid: false,
      attributes: ['id', 'name', 'lastname', 'surname']
    })
  }

  static async getUserById (id: number): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id
      },
      attributes: ['id', 'name', 'lastname', 'surname']
    })
  }

  static async createUser (user: User): Promise<UserModel> {
    return await UserModel.create({
      ...user
    })
  }

  static async updateUser (user: UserPartial, id: number): Promise<[affectedCount: number]> {
    return await UserModel.update(
      { ...user },
      {
        where: {
          id
        }
      }
    )
  }

  static async deleteUser (id: number): Promise<number> {
    return await UserModel.destroy({
      where: {
        id
      }
    })
  }

  static async getPostByUser (id: number): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id
      },
      order: [
        [PostModel, 'createdAt', 'DESC']
      ],
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
    })
  }
}
