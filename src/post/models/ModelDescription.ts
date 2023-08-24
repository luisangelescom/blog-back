import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'
import PostDescriptionModel from './PostDescriptionModel'

// disabled eslint
export class ModelDescription {
  get modelName (): string {
    return ModelDescription.name
  }

  static async getAllPostDescription (postId: number): Promise<PostModel[]> {
    return await PostDescriptionModel.findAll({
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

  static async createPostDescription (postId: number, userId: number, description: string): Promise<PostDescriptionModel> {
    return await PostDescriptionModel.create({ postId, userId, description })
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
