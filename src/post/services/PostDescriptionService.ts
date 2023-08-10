import { PostDescriptionResponse } from '../../types'
import UserModel from '../../user/models/UserModel'
import PostDescriptionModel from '../models/PostDescriptionModel'

export default class PostDescriptionService {
  async getAllDescription (postId: number): Promise<PostDescriptionResponse> {
    try {
      const response = await PostDescriptionModel.findAll({
        where: {
          postId
        },
        include: [{
          model: UserModel,
          attributes: ['surname']
        }],
        order: [
          ['createdAt', 'DESC']
        ]
      })

      if (response.length > 0) {
        return {
          status: 200,
          data: response
        }
      } else {
        return {
          status: 404,
          data: {
            errors: {
              message: 'No se encontraron post'
            }
          }
        }
      }
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }

  async createPostDescription (postId: number, userId: number, description: string): Promise<PostDescriptionResponse> {
    try {
      await PostDescriptionModel.create({ postId, userId, description })
      const response = await this.getAllDescription(postId)
      return {
        status: 201,
        data: response.data
      }
    } catch (error) {
      return {
        status: 500,
        data: null
      }
    }
  }
}
