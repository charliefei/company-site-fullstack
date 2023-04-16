const JWT = require('../util/JWT');

/**
 * 前端login操作拿到token后，下一次请求对token进行验证
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {void}
 */
const TokenVerifyMw = (req, res, next) => {
  if (req.url === '/admin/user/login') {
    next()
    return
  }

  const token = req.headers.authorization.split(' ')[1]
  //console.log(token, '---');

  if (token) {
    const payload = JWT.verify(token)
    //console.log(payload, '@@@'); // {_id, username, password...}

    if (payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      })

      res.header('Authorization', newToken)
      next()
    } else {
      res.status(401).send({
        code: '-1',
        data: null,
        msg: 'token过期！'
      })
    }
  }
}

module.exports = TokenVerifyMw