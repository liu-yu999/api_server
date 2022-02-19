import express from "express"
import cors from 'cors'

import userRouter from './router/user.js'
import userInfoRouter from './router/userInfo.js'
import articleRouter from './router/article_cate.js'
import articlesRouter from './router/article.js'
import commRouter from './router/comment.js'

import joi from 'joi'
import expressJwt from 'express-jwt'
import config from "./config.js"

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use('/upload', express.static('./upload'))
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    return res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

app.use(expressJwt({secret: config.jwtSecretKey, algorithms:['HS256']}).unless({path: [/^\/api/]}))

// 导入用户模块
app.use('/api', userRouter)
// 导入用户信息模块
app.use('/my', userInfoRouter)
// 导入文章分类模块
app.use('/my/article', articleRouter)
// 导入文章信息模块
app.use('/my/articles', articlesRouter)
// 导入评论信息模块
app.use('/my/comment', commRouter)

// 错误级别的中间件
app.use(function(err,req, res, next) {
  if(err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  res.cc(err)
})

app.listen(3007, function() {
  console.log('server running at http://127.0.0.1:3007');
})