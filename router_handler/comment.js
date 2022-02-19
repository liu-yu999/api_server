import db from '../db/index.js'

function addComm(req, res) {
  const commInfo = {
    ...req.body,
    comm_date: new Date()
  }
  const sqlStr = 'insert into comment set?'
  db.query(sqlStr, commInfo, (err, result) => {
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('添加评论失败！')
    res.cc('添加评论成功！', 0)
  })
}

// 根据id删除评论
function deleteComm(req, res) {
  const sqlStr = 'select * from comment where id=?'
  db.query(sqlStr, req.body.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('没有该评论！')

    const sqlStr = 'update comment set is_delete=1 where id=?'
    db.query(sqlStr, req.body.id, (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('删除评论失败！')
      res.cc('删除评论成功！', 0)
    })
  })
}

// 获取评论信息
function getCommList(req, res) {
  const sqlStr = 'select * from comment where art_id=?'
  db.query(sqlStr, req.body.art_id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('暂无评论！')
    res.send({
      status: 0,
      message: '获取评论列表成功!',
      data: result
    })
  })
}

export {addComm, deleteComm, getCommList}