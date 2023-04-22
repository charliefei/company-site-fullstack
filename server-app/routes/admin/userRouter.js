const express = require('express');
const userRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/avatarUploads/' })

const UserController = require('../../controller/admin/UserController')

userRouter.post('/login', UserController.login)
userRouter.post('/upload', upload.single('file') , UserController.upload)

module.exports = userRouter;