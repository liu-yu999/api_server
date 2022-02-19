import db from '../db/index.js'

// 获取文章分类信息
function getArticleCate(req, res) {
  const sqlStr = 'select * from article_cate where is_delete=0 order by asc'
  db.query(sqlStr, (err, result) => {
    if(err) return res.cc(err)
    res.send({
      status: 0,
      data: result
    })
  })
  // res.send('article_cate ok')
}

// 添加文章分类
function addArticleCate(req, res) {
  const sqlStr = 'select * from article_cate where name=? or alias=?'
  db.query(sqlStr, [req.body.name, req.body.alias], (err, result) => {
    if(err) return res.cc(err)
    if(result.length === 2 ) return res.cc('分类名称或别名被占用！')
    if(result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) return res.cc('文章名称和分类名称同时被占用！')
    if(result.length === 1 && req.body.name === result[0].name) return res.cc('分类名称被占用！')
    if(result.length === 1 && req.body.alias === result[0].alias) return res.cc('别名被占用！')
    
    const sqlStr = 'insert into article_cate set?'
    db.query(sqlStr, req.body, (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('新增分类失败！')

      res.cc('新增分类成功！', 0)
    })
    res.cc('添加文章分类成功！')
  })
  // res.cc('ok', 0)
}

// 根据id删除文章分类
function deleteArticleCate(req, res) {
  const sqlStr = 'update article_cate set is_delete=1 where id=?'
  db.query(sqlStr, req.params.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('文章分类不存在！')
    res.cc('删除文章分类成功！', 0)
  })
}

// 根据id获取文章分类
function getArticleCateById(req, res) {
  const sqlStr = 'select * from article_cate where id=?'
  db.query(sqlStr, req.params.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) res.cc('获取文章分类失败！')
    res.send({
      status: 0,
      message: '获取文章分类成功！',
      data: result[0]
    })
  })
}

// 根据id更新文章分类
function updateArticleCate(req, res) {
  const sqlStr = 'select * from article_cate where id<>? and (name=? or alias=?)'
  db.query(sqlStr, [req.body.id, req.body.name, req.body.alias], (err, result) => {
    if(err) return res.cc(err)
    if(result.length === 2) return res.cc('分类名称或别名被占用！')
    if(result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('文章名称和分类名称被占用！')
    if(result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用！')
    if(result.length === 1 && result[0].alias === req.body.alias) return res.cc('别名被占用！')
    
    const sqlStr = 'update article_cate set? where id=?'
    db.query(sqlStr, [req.body, req.body.id], (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}

export {getArticleCate, addArticleCate, deleteArticleCate, getArticleCateById, updateArticleCate}