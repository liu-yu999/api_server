import db from '../db/index.js'

// 获取用户信息
function getUserInfo(req, res) {
  const sqlStr = 'select id,username,email from users where id=?'
  db.query(sqlStr, req.user.id, (err, result)=> {
    if(err) return res.cc(err)
    // if(result.lenght !== 1) return res.cc('获取用户信息失败！')
    // console.log(result.length);
    if(result.length !== 1) return res.cc('获取用户信息失败！')
    res.send({
      status: 0,
      message: '获取用户信息成功!',
      data:result
    })
  })
  // res.send('userInfo ok123')
}

// 更新用户信息
function updataUserInfo(req, res) {
  const sqlStr = 'update users set? where id=?'
  db.query(sqlStr, [req.body, req.body.id], (err, result)=> {
    if(err) return res.cc(err)
    if(result.affectedRows !== 1) return res.cc('更新用户信息失败！')
    res.cc('更新用户信息成功', 0)
    console.log(req.body);
  })
  // res.send('updateUserInfo ok')
}

// 重置密码
function updatePassword(req, res) {
  const sqlStr = 'select * from users where id=?'
  db.query(sqlStr, req.user.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('用户不存在！')
    if(req.body.oldPwd === result[0].password) return res.cc('与原密码相同！')
    if(req.body.oldPwd !== req.body.newPwd) return res.cc('两次密码不一致！')
    
    const sqlStr = 'update users set password=? where id=?'
    db.query(sqlStr, [req.body.oldPwd, req.user.id], (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('重置密码失败！')

      res.cc('重置密码成功！', 0)
    })
  })
  // res.send('updatePassword ok')
}

function updateAvatar(req, res) {
  const sqlStr = 'select * from users where id=?'
  db.query(sqlStr, req.user.id, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) return res.cc('用户不存在！')

    const sqlStr = 'update users set avatar=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, result) => {
      if(err) return res.cc(err)
      if(result.affectedRows !== 1) return res.cc('更新用户头像失败！')
      res.cc('更新用户头像成功！', 0)
    })
  })
  // res.send('updateAvatar ok!')
}

export {getUserInfo, updataUserInfo, updatePassword, updateAvatar}