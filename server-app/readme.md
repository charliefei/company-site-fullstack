# 企业门户管理系统服务端
## mongodb数据库
~~~js
// 数据库连接
mongoose.connect('mongodb://localhost:27017/study-project')

// 数据库模型创建
mongoose.model('模块名', new Schema('模块字段约束'))
~~~

## 一、user模块
**基础url='http://localhost:3000/admin/user'**
### 1. login接口
- **url='/login'**
- **接收参数：**
~~~js
{
    username:String,
    password:String
}
~~~
- **响应头：调用generate传入数据库中document生成一个token字符串，放入响应头中**
- 响应数据：
~~~js
{ 
    Code: 200/-1, 
    data: {
        username:String,
        gender:Number,
        introduction:String,
        avatar:String,
        role:Number
    },  
    msg: 'xxx'
}
~~~
- **JWT + 自定义中间件：实现token验证**
    - `jsonwebtoken`第三方模块
    ~~~bash
    npm i jsonwebtoken --save
    ~~~
    - JWT对象
        - generate: 接收一个实体(对象)生成token
        - verify: 接收一个需要被验证的token字符串返回一个实体(对象)
    - TokenVerifyMw
        - 对login请求进行放行
        - 对其他请求进行拦截校验token
            - 获取客户端的请求头中token，调用verify进行token校验
                - 成功：生成一个新的token放入响应头并放行此次请求
                - 失败：返回401状态码
### 2. upload接口
- **url='/upload'**
- **接收参数**
~~~js
{
    username:String,
    gender:Number,
    introduction:String,
    avatar:String,
    file:File
}
~~~
- **`multer`第三方模块实现文件上传**
~~~bash
npm i multer --save
~~~
- 响应数据：
~~~js
{
    code: 200/-1,
    data: {},
    msg: 'xxx'
}
~~~ 