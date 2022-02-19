import joi from 'joi'

const title = joi.string().required()
// const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
// const state = joi.string().valid('草稿', '已发布').required()
const id = joi.number().integer().required()
const agree = joi.number().integer()
const disagree = joi.number().integer()

const add_article = {
  body: {
    title: title,
    // cate_id: cate_id,
    content: content,
    // state: state
  }
}

const get_article = {
  params: {
    id
  }
}

const update_article = {
  body: {
    id,
    agree,
    disagree
  }
}

export {add_article, get_article, update_article}