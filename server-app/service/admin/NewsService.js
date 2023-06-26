const NewsModel = require('../../model/NewsModel')

const NewsService = {
  add: async ({title, category, content, isPublish, cover, editTime}) => {
    return NewsModel.create({
      title, 
      category, 
      content, 
      isPublish, 
      cover, 
      editTime
    })
  },
  list: async (id) => {
    return id ? NewsModel.find({_id: id}, ['title', 'category', 'content'])
    : NewsModel.find({})
  },
  publish: async ({_id, isPublish, editTime}) => {
    return NewsModel.updateOne({_id}, {isPublish:Number(isPublish), editTime})
  },
  delete: async (id) => {
    return NewsModel.deleteOne({_id: id})
  },
  updateByid: async (id, title, content, category) => {
    return NewsModel.updateOne({_id:id}, {
      title,
      content,
      category
    })
  }
}

module.exports = NewsService