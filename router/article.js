import express from 'express'
import expressJoi from '@escook/express-joi'

// import multer from 'multer'
// import path from 'path'

import {addArticle, getArticleList, deleteArticle, getArticleInfo, updateArticleInfo} from '../router_handler/article.js'

import {add_article, update_article} from '../schema/article.js'

const router = express.Router()
// FormData解析
// const path = require('path')
// const upload = multer({dest: 'E:\\vscode\\vue\\vue-cli案例\\api-server\\upload'})
// upload.single('cover_img'), 
router.post('/add', expressJoi(add_article), addArticle)
router.get('/get', getArticleList)
router.post('/delete', deleteArticle)
router.get('/:id', getArticleInfo)
router.post('/edit', expressJoi(update_article), updateArticleInfo)

export default router