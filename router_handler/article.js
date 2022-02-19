import db from '../db/index.js'


function addArticle(req, res) {
  // if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('封面是必选项！')

  const articleInfo = {
    // 标题、内容、发布状态、分类Id
    ...req.body,
    // 文章封面
    // cover_img: 'E:\\vscode\\vue\\vue-cli案例\\api-server\\upload\\' + req.file.filename,
    // 发布日期
    pub_date: new Date(),
    author_id: req.user.id
  }

  const sqlStr = 'insert into articles set?'
  db.query(sqlStr, articleInfo, (err, result) => {
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('发布文章失败！')
    res.cc('发布文章成功！', 0)
  })

  // res.cc(req.body)
}

// 获取文章列表
function getArticleList(req, res) {
  const sqlStr = 'select * from articles'
  db.query(sqlStr, (err, result) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: result,
      total: result.length
    })
  })
}

// 根据id删除文章
function deleteArticle(req, res) {
  const sqlStr = 'update articles set is_delete=1 where id=?'
    db.query(sqlStr, req.body.id, (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) res.cc('删除文章失败！')
      res.cc({
        status: 0,
        message: '删除文章成功！',
        data: result
      })
    })
}

// 根据id获取文章详情
function getArticleInfo(req, res) {
  const sqlStr = 'select * from articles where id=?'
  db.query(sqlStr, req.params.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('没有该文章！')
    res.send({
      status: 0,
      message: '获取文章详情成功！',
      data: result[0]
    })
  })
}

// 根据id更新文章信息
function updateArticleInfo(req, res) {
  // if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('封面是必选项！')

  const articleInfo = {
    // 标题、内容、发布状态、分类Id
    ...req.body
  }
  // console.log(articleInfo);

  const sqlStr = 'select * from articles where id=?'
  db.query(sqlStr, req.body.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('没有该文章！')

    const sqlStr = 'update articles set? where id=?'
    db.query(sqlStr, [articleInfo, req.body.id], (err, result) => {
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('更新文章信息失败！')
    res.cc('更新文章成功！', 0)
    })
  })
}

export {addArticle, getArticleList, deleteArticle, getArticleInfo, updateArticleInfo}