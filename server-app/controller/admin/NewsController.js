const Result = require('../Result')
const NewsService = require('../../service/admin/NewsService')

const NewsController = {
  /**
   * 添加新闻
   * @param {Request} request 
   * @param {Response} response \
   * 
   */
  add: async (request, response) => {
    //console.log(request.file, request.body);
    const cover = request.file ? `/coverUploads${request.file.filename}` : ''
    const {title, category, content, isPublish} = request.body

    const result = await NewsService.add({
      title, 
      category:Number(category), 
      content, 
      isPublish:Number(isPublish),
      cover,
      editTime:new Date()
    })

    if(result){
      response.send(new Result(200, result, '添加成功！'))
    }else{
      response.send(new Result(-1, null, '添加失败！'))
    }
  },
  /**
   * 新闻列表
   * @param {Request} request 
   * @param {Response} response 
   */
  list: async (request, response) => {
    const {id} = request.params

    const result = await NewsService.list(id)

    if(!result){
      response.send(new Result(-1, null, '网络繁忙，请稍后再试！'))
    }else if(!id){
      response.send(new Result(200, result, ''))
    }else{
      response.send(new Result(200, result[0], ''))
    }
  },
  /**
   * 
   * @param {Request} request 
   * @param {Response} response 
   */
  publish: async (request, response) => {
    const result = await NewsService.publish({
      ...request.body,
      editTime: new Date()
    })

    if(result.modifiedCount > 0){
      response.send(new Result(200, {}, ''))
    }else{
      response.send(new Result(-1, {}, ''))
    }
  },
  /**
   * 
   * @param {Request} request 
   * @param {Response} response 
   */
  delete: async (request, response) => {
    const {id} = request.params
    const result = await NewsService.delete(id)
    if(result.deletedCount > 0){
      response.send(new Result(200, {}, '删除成功！'))
    }else{
      response.send(new Result(-1, {}, '删除失败！'))
    }
  },
  /**
   * 
   * @param {Request} request 
   * @param {Response} response 
   */
  updateById: async (request, response) => {
    const {id} = request.params
    const {title, content, category} = request.body

    const result = await NewsService.updateByid(id, title, content, category)

    if(result.matchedCount == 1){
      response.send(new Result(200, {}, '修改成功！'))
    }else{
      response.send(new Result(-1, null, '服务器繁忙！请稍后再试！'))
    }
  }
}

module.exports = NewsController