import db from '../db/index.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

// 登录模块
function login (req, res) {
  const userInfo = req.body
  const sqlStr = 'select * from users where username=?'
  db.query(sqlStr, userInfo.username, (err, result) => {
    if(err) return res.cc(err)
    if(result.length !== 1) {
      return res.cc('用户不存在！')
    }
    if(userInfo.password !== result[0].password) {
      return res.cc('密码输入错误!')
    }
    const user = {...result[0], password: ''}
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h'
    })
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr
    })
  })
  
}
// 注册模块
function register (req, res) {
  const userInfo = req.body
  // console.log(userInfo);
  
  const sqlStr = 'select * from users where username=?'
  db.query(sqlStr, userInfo.username, (err, result)=> {
    if(err) return res.cc(err)
    if(result.length > 0) {
      return res.cc('用户名被占用！')
    }
    
    const sqlStr = 'insert into users set?'
    db.query(sqlStr, {username: userInfo.username, password: userInfo.password, email: userInfo.email}, (err, result) => {
      if(err) return res.cc(err)
      // console.log(result.affectRows);
      if(result.affectedRows !== 1) return res.cc('用户注册失败！')
      if(userInfo.checkpwd !== userInfo.password) {
        return res.cc('两次输入的密码不一致')
      }
      res.cc('用户注册成功', 0)
    })  
  })

}

export {login, register}