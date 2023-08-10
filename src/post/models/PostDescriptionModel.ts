import { Model, STRING } from 'sequelize'
import sequelize from '../../bd-connection'
import UserModel from '../../user/models/UserModel'
import PostModel from './PostModel'

class PostDescriptionModel extends Model {}

PostDescriptionModel.init({
  description: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: true
    }
  }

}, {
  sequelize,
  modelName: 'post_descriptions',
  paranoid: true
})

UserModel.hasMany(PostDescriptionModel)
PostDescriptionModel.belongsTo(UserModel)

PostModel.hasMany(PostDescriptionModel)
PostDescriptionModel.belongsTo(PostModel)

export default PostDescriptionModel
