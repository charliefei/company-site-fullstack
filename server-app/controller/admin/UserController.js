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
      response.send(new Result(200, token, '登录成功！'))
    }
  }
}

module.exports = UserController