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
  },
  /**
   * 添加用户接口
   */
  add: async ({
    username,
    password,
    gender,
    introduction,
    role,
    avatar
  }) => {
    return UserModel.create({
      username,
      password,
      gender,
      introduction,
      role,
      avatar
    })
  },
  /**
   * 用户列表接口
   */
  list: async (id) => {
    return id ? 
    UserModel.find({_id: id}, ['username','role','avatar','introduction','gender', 'password']):
    UserModel.find({}, ['username','role','avatar','introduction','gender', 'password'])
  },
  /**
   * 用户删除接口
   */
  deleteById: async (id) => {
    return UserModel.deleteOne({_id:id})
  },
  /**
   * 用户修改接口
   */
  updateById: async ({id,username,password,role,introduction}) => {
    return UserModel.updateOne({_id:id},{
        username,
        password,
        role,
        introduction
      })
  }
}

module.exports = UserService