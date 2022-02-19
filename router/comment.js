import express from 'express'
// import expressJoi from '@escook/express-joi'

import {addComm, deleteComm, getCommList} from '../router_handler/comment.js'

const router = express.Router()

router.post('/add', addComm)
router.post('/delete', deleteComm)
router.get('/', getCommList)

export default router

