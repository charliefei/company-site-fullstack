const UserModel  = require('../../model/UserModel')


const UserService = {
  /**
   * 登录接口：业务层
   * @param {*} param 
   */
  login: async ({username, password}) => {
    return UserModel.find({ username, password })
  }
}

module.exports = UserService