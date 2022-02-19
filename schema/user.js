import joi from 'joi'

// 提交用户信息验证
const userCheckSchema = {
  body: {
    username: joi.string().min(1).max(5).required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required(),
    checkpwd: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required(),
    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  }
}

const userSchema = {
  body: {
    username: joi.string().min(1).max(5).required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,12}$')).required()
  }
}

// 更新用户信息验证
const updateSchema = {
  body: {
    id: joi.number().integer().min(1).required(),
    email: joi.string().required()
  }
}

// 更新用户密码验证
const updatePwd_schema = {
  body: {
    oldPwd: joi.string().min(6).max(12).required(),
    newPwd: joi.string().min(6).max(12).required()
  }
}

// 更新用户头像
const updateAva_schema = {
  body: {
    avatar: joi.string().dataUri().required()
  }
}

export { userSchema, userCheckSchema, updateSchema, updatePwd_schema, updateAva_schema}