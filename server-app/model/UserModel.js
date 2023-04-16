const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserType = {
  username: String,
  password: String,
  gender: Number, // 0未知，1男，2女
  introduction: String,
  avatar: String,
  role: Number  // 1管理员，2编辑
}

/**
 * user模型 -> users表：数据层
 */
const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel