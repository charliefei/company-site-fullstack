const express = require('express');
const userRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/avatarUploads/' })

const UserController = require('../../controller/admin/UserController')

userRouter.post('/login', UserController.login)
userRouter.post('/upload', upload.single('file') , UserController.upload)
userRouter.post('/add', upload.single('file') , UserController.add)
// restful的用户增删改查
userRouter.get('/list', UserController.list)
userRouter.get('/list/:id', UserController.list)
userRouter.delete('/list/:id', UserController.deleteById)
userRouter.put('/list/:id',  UserController.updateById)

module.exports = userRouter;