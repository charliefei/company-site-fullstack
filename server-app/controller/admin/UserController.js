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
  },
  /**
   * 添加用户接口
   * @param {*} request 
   * @param {*} response 
   */
  add: async (request, response) => {
    const {
      username,
      password,
      gender,
      introduction,
      role
    } = request.body

    const avatar = request.file ? `/avatarUploads/${request.file.filename}` : ''

    const test = await UserService.add({
      username,
      password,
      gender: parseInt(gender),
      introduction,
      role: parseInt(role),
      avatar
    })

    if(test.matchedCount == 0){
      response.send(new Result(-1, null, '添加失败！'))
    } else {
      response.send(new Result(200, null, '添加成功！'))
    }    
  },
  /**
   * 用户列表接口
   * @param {*} request 
   * @param {*} response 
   */
  list: async (request, response) => {
    const {id} = request.params

    const result = await UserService.list(id)

    if(!result){
      response.send(new Result(-1, null, '网络繁忙，请稍后再试！'))
    }else if(!id){
      response.send(new Result(200, result, ''))
    }else{
      response.send(new Result(200, result[0], ''))
    }
  },
  /**
   * 用户删除接口
   * @param {*} request 
   * @param {*} response 
   */
  deleteById: async (request, response) => {
    const {id} = request.params
    // console.log(request.params); // {id}
    const result = await UserService.deleteById(id)
    console.log(result); //{ acknowledged: true, deletedCount: 1 }

    if(result.deletedCount > 0){
      response.send(new Result(200, {}, '删除成功！'))
    }else{
      response.send(new Result(-1, {}, '删除失败！'))
    }
  },
  /**
   * 用户修改接口
   */
  updateById: async (request, response) => {
    const {id} = request.params
    const {username,password,role,introduction} = request.body

    const result = await UserService.updateById({id,username,password,role,introduction})

    if(result.matchedCount == 1){
      response.send(new Result(200, {}, '修改成功！'))
    }else{
      response.send(new Result(-1, null, '服务器繁忙！请稍后再试！'))
    }
  }
}

module.exports = UserController