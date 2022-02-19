import joi from 'joi'

const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()

const add_cate = {
  body: {
    name: name,
    alias: alias
  }
}

const del_cate = {
  params: {
    id: id
  }
}

const get_cate = {
  params: {
    id: id
  }
}

const update_cate = {
  body: {
    id: id,
    name: name,
    alias: alias
  }
}

export {add_cate, del_cate, get_cate, update_cate}