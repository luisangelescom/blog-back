import { Model, INTEGER } from 'sequelize'
import sequelize from '../../bd-connection'
import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'
// import UserModel from '../../user/models/UserModel'
// import PostModel from './PostModel'

class PostLikeModel extends Model {}

PostLikeModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  like: {
    type: INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'post_likes',
  paranoid: true
})

UserModel.hasMany(PostLikeModel)
PostLikeModel.belongsTo(UserModel)

PostModel.hasMany(PostLikeModel)
PostLikeModel.belongsTo(PostModel)

// UserModel.belongsToMany(PostModel, { through: PostLikeModel, uniqueKey: 'id' })
// PostModel.belongsToMany(UserModel, { through: PostLikeModel, uniqueKey: 'id' })

export default PostLikeModel
