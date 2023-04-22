const UserService = require('../../service/admin/UserService')
const Result = require('../Result')
const JWT = require('../../util/JWT')

const UserController = {
  /**
   * 登录接口：表现层
   * @param {*} request 
   * @param {*} response 
   */
  login: async (request, response) => {
    const res = await UserService.login(request.body)

    if (res.length === 0) {
      response.send(new Result(-1, null, '用户名或密码错误！'))
    } else {
      const token = JWT.generate({
        _id: res[0]._id,
        username: res[0].username
      })

      //console.log(token, '+++');
      response.header('Authorization', token)
      response.send(new Result(200, {
        username: res[0].username,
        gender: res[0].gender ? res[0].gender : 0,
        introduction: res[0].introduction,
        avatar: res[0].avatar,
        role: res[0].role
      }, '登录成功！'))
    }
  },

  /**
   * 用户数据更新和文件上传处理接口
   * @param {*} request 
   * @param {*} response 
   */
  upload: async (request, response) => {
    const {username,gender,introduction} = request.body
    //console.log(request.body);
    // 前端没有对是否上传头像进行校验，故需要判断是否为null
    const avatar = request.file ? `/avatarUploads/${request.file.filename}` : ''

    const token = request.headers.authorization.split(' ')[1]
    const payload = JWT.verify(token)
    //console.log(payload);

    const test = await UserService.upload({
      _id: payload._id,
      username,
      gender: parseInt(gender),
      introduction,
      avatar
    })
    // console.log(test);

    if(test.matchedCount == 0){
      response.send(new Result(-1, null, '更新失败！'))
    } else {
      if(avatar){
        response.send(new Result(200, {
          username,
          gender: Number(gender),
          introduction,
          avatar
        }, '更新成功！'))
      } else {
        response.send(new Result(200, {
          username,
          gender: Number(gender),
          introduction
        }, '更新成功！'))
      }
    }
  }
}

module.exports = UserController