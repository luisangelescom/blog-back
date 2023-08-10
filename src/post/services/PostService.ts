import { Op } from 'sequelize'
import { Post, PostPartial, PostResponse, PostsResponse } from '../../types'
import UserModel from '../../user/models/UserModel'
import PostModel from '../models/PostModel'

export default class PostService {
  async getAllPost (userId: number = 0): Promise<PostsResponse> {
    try {
      const response = await PostModel.findAll({
        where: {
          userId: {
            ...(userId > 0 ? { [Op.eq]: userId } : { [Op.gte]: 1 })
          }
        },
        order: [
          ['createdAt', 'DESC']
        ],
        include: [{
          model: UserModel,
          attributes: ['surname']

        }]
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

  async getPostById (id: number): Promise<PostResponse> {
    try {
      const response = await PostModel.findOne({
        where: {
          id
        },
        include: [{
          model: UserModel,
          attributes: ['surname']
        }]
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

  async createPost (post: Post, userId: number): Promise<PostsResponse> {
    try {
      await PostModel.create({ userId, ...post })
      const response = await this.getAllPost(userId)
      return {
        status: 201,
        data: response.data
      }
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }

  async updatePost (post: PostPartial, postId: number, userId: number): Promise<PostsResponse> {
    try {
      const getPost = await this.getPostById(postId)
      if (getPost.status === 200) {
        await PostModel.update({ ...post }, {
          where: {
            id: postId
          }
        })
        const response = await this.getAllPost(userId)
        return {
          status: 200,
          data: response.data
        }
      }
      return {
        status: getPost.status,
        data: []
      }
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }

  async deleteUser (id: number, userId: number): Promise<PostsResponse> {
    try {
      const getPost = await this.getPostById(id)
      if (getPost.status === 200) {
        await PostModel.destroy({
          where: {
            id
          }
        })
        const response = await this.getAllPost(userId)

        return {
          status: 200,
          data: response.data
        }
      }
      return {
        status: getPost.status,
        data: []
      }
    } catch (error) {
      return {
        status: 500,
        data: []
      }
    }
  }
}
