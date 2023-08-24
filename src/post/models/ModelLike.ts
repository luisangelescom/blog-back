import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'
import PostLikeModel from './PostLikeModel'

// disabled eslint
export class ModelLike {
  get modelName (): string {
    return ModelLike.name
  }

  static async getAllPostLike (postId: number): Promise<{ rows: PostModel[], count: number }> {
    return await PostLikeModel.findAndCountAll({
      where: {
        postId,
        like: 1
      },
      include: [{
        model: UserModel,
        attributes: ['surname']
      }]
    })
  }

  static async getPostById (postId: number, userId: number): Promise<PostModel | null> {
    return await PostLikeModel.findOne({
      where: { postId, userId }
    })
  }

  static async createLike (postId: number, userId: number): Promise<[PostLikeModel, boolean]> {
    return await PostLikeModel.findOrCreate({ where: { postId, userId }, defaults: { postId, userId, like: 1 } })
  }

  static async updateLike (postId: number, userId: number, like: number): Promise<[affectedCount: number]> {
    return await PostLikeModel.update({ like }, { where: { postId, userId } })
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
