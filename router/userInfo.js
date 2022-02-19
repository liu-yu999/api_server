import express from 'express'
import { updateSchema, updatePwd_schema, updateAva_schema } from '../schema/user.js'
import expressJoi from '@escook/express-joi'

import { getUserInfo, updataUserInfo, updatePassword, updateAvatar } from '../router_handler/userInfo.js'

const router = express.Router()

router.get('/userInfo', getUserInfo)
router.post('/userInfo', expressJoi(updateSchema), updataUserInfo)
router.post('/updatePwd', expressJoi(updatePwd_schema), updatePassword)
router.post('/updateAva',expressJoi(updateAva_schema), updateAvatar)

export default router