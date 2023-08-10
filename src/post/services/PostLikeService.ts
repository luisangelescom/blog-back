import { PostLikeResponse } from '../../types'
import UserModel from '../../user/models/UserModel'
import PostLikeModel from '../models/PostLikeModel'

export default class PostLikeService {
  async getAllPost (postId: number): Promise<PostLikeResponse> {
    try {
      const response = await PostLikeModel.findAndCountAll({
        where: {
          postId
        },
        include: [{
          model: UserModel,
          attributes: ['surname']
        }]
      })

      if (response.rows.length > 0) {
        return {
          status: 200,
          data: { data: [...response.rows], count: response.count }
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

  async createPost (postId: number, userId: number): Promise<PostLikeResponse> {
    try {
      await PostLikeModel.findOrCreate({ where: { postId, userId }, defaults: { postId, userId, like: 1 } })
      const response = await this.getAllPost(postId)

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
