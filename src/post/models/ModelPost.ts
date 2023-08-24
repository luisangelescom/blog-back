import { Op } from 'sequelize'
import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'
import { Post, PostPartial } from '../../types'

// disabled eslint
export class ModelPost {
  get modelName (): string {
    return ModelPost.name
  }

  static async getAllPost (userId: number = 0): Promise<PostModel[]> {
    return await PostModel.findAll({
      where: {
        userId: {
          ...(userId > 0 ? { [Op.eq]: userId } : { [Op.gte]: 1 })
        }
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: UserModel,
          attributes: ['surname']
        }
      ]
    })
  }

  static async getPostById (id: number): Promise<PostModel | null> {
    return await PostModel.findOne({
      where: {
        id
      },
      include: [
        {
          model: UserModel,
          attributes: ['surname']
        }
      ]
    })
  }

  static async createPost (userId: number, post: Post): Promise<PostModel> {
    return await PostModel.create({ userId, ...post })
  }

  static async updatePost (postId: number, post: PostPartial): Promise<[affectedCount: number]> {
    console.log('PostPartial')
    console.log(post)
    return await PostModel.update(
      { ...post },
      {
        where: {
          id: postId
        }
      }
    )
  }

  static async deletePost (id: number): Promise<number> {
    return await PostModel.destroy({
      where: {
        id
      }
    })
  }
}
