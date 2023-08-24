import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'
import PostLikeModel from './PostLikeModel'

// disabled eslint
export class ModelLike {
  get saludar (): string {
    return 'Hola'
  }

  static async getAllPostLike (postId: number): Promise<{ rows: PostModel[], count: number }> {
    return await PostLikeModel.findAndCountAll({
      where: {
        postId
      },
      include: [{
        model: UserModel,
        attributes: ['surname']
      }]
    })
  }

  // static async getPostById (id: number): Promise<PostModel | null> {
  //   return await PostModel.findOne({
  //     where: {
  //       id
  //     },
  //     include: [
  //       {
  //         model: UserModel,
  //         attributes: ['surname']
  //       }
  //     ]
  //   })
  // }

  static async createPost (postId: number, userId: number): Promise<[PostLikeModel, boolean]> {
    return await PostLikeModel.findOrCreate({ where: { postId, userId }, defaults: { postId, userId, like: 1 } })
  }

  // static async updatePost (postId: number, post: PostPartial): Promise<[affectedCount: number]> {
  //   console.log('PostPartial')
  //   console.log(post)
  //   return await PostModel.update(
  //     { ...post },
  //     {
  //       where: {
  //         id: postId
  //       }
  //     }
  //   )
  // }

  // static async deletePost (id: number): Promise<number> {
  //   return await PostModel.destroy({
  //     where: {
  //       id
  //     }
  //   })
  // }
}
