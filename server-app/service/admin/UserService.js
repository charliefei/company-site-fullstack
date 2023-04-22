const UserModel  = require('../../model/UserModel')


const UserService = {
  /**
   * 登录接口：业务层
   * @param {*} param 
   */
  login: async ({username, password}) => {
    return UserModel.find({ username, password })
  },
  /**
   * 更新接口
   * @param {*} param0 
   * @returns 
   */
  upload: async ({_id, username, gender, introduction, avatar}) => {
    if(avatar) {
      return UserModel.updateOne({_id}, {
        username, gender, introduction, avatar 
      })
    } else {
      return UserModel.updateOne({_id}, {
        username, gender, introduction 
      })
    }
  }
}

module.exports = UserService