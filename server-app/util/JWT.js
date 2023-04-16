const jsonWebToken = require('jsonwebtoken')
const secret = 'aaa'

// 登录鉴权的工具对象JWT
const JWT = {
  /**
   * 
   * @param {string | object | Buffer} value 为哪一个实体(对象)生成token
   * @returns {String} 生成一个token字符串
   */
  generate(value) {
    // sign({}, string, options{配置过期时间})
    return jsonWebToken.sign(value, secret, { expiresIn: "86400s" })
  },
  /**
   * 
   * @param {String} token 接收一个需要被验证的token字符串
   * @returns {object} 返回一个实体对象
   */
  verify(token) {
    try {
      return jsonWebToken.verify(token, secret)
    } catch (e) {
      return false
    }
  }
}

// const token = JWT.generate({ username: 'aaa' }, "10s")
// console.log(JWT.verify(token));

module.exports = JWT