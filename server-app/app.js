const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const TokenVerifyMw = require('./middleware/TokenVerifyMw')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录鉴权的中间件
app.use(TokenVerifyMw)
// 注册路由
/**
 * admin
 */
app.use('/admin/user', require('./routes/admin/userRouter'))

// 捕获404并转发到错误级别中间件处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误级别中间件处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染404 error页面
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;
