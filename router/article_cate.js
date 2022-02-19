import express from 'express'
import expressJoi from '@escook/express-joi'

// 函数处理模块
import {getArticleCate, addArticleCate,deleteArticleCate, getArticleCateById, updateArticleCate } from '../router_handler/article_cate.js'

// 验证规则
import {add_cate, del_cate,get_cate} from '../schema/article_cate.js'

const router = express.Router()

router.get('/cate', getArticleCate)
router.post('/cate', expressJoi(add_cate), addArticleCate)
router.get('/deleteCate/:id', expressJoi(del_cate), deleteArticleCate)
router.get('/cate/:id', expressJoi(get_cate), getArticleCateById)
router.post('/updateCate', expressJoi(updateArticleCate), updateArticleCate)

export default router