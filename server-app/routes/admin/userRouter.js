const express = require('express');
const userRouter = express.Router();

const UserController = require('../../controller/admin/UserController')

// userRouter.get('/', (req, res) => {
  
// })
userRouter.post('/login', UserController.login);
userRouter.get('/home', (req, res) => {
  res.send({code: 200})  
});

module.exports = userRouter;