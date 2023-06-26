const express = require('express');
const newsRouter = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/coverUploads/' })

const NewsController = require('../../controller/admin/NewsController')

newsRouter.post('/add', upload.single('file'), NewsController.add)
newsRouter.get('/list', NewsController.list)
newsRouter.put('/publish', NewsController.publish)
newsRouter.delete('/list/:id', NewsController.delete)
newsRouter.get('/list/:id', NewsController.list)
newsRouter.put('/list/:id', NewsController.updateById)

module.exports = newsRouter