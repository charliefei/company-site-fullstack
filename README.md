## 后端

1. MongoDB数据库服务器

- 建表

~~~js
const UserType = {
	...
}

/**
 * user模型 -> users表
 */
const UserModel = mongoose.model('user', new Schema(UserType))

const NewsType = {
  ...
}

/**
 * news模型 -> news表
 */
const NewsModel = mongoose.model('news', new Schema(NewsType))

const ProductType = {
  ...
}

/**
 * news模型 -> news表
 */
const ProductModel = mongoose.model('product', new Schema(ProductType))
~~~



- nodejs环境下集成数据库

~~~js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/study-project')
~~~



2. express框架

~~~bash
// 启动服务器
npm start
~~~



## 前端-后台管理系统

Vue3+Vite

~~~bash
// 启动开发环境服务器
npm run dev
~~~



## 前端-客户端

......