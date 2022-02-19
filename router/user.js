import express from "express"
import {login, register} from '../router_handler/user.js'
import expressJoi from '@escook/express-joi'
import {userCheckSchema, userSchema} from '../schema/user.js'

const router = express.Router()

router.post('/login', expressJoi(userSchema), login)
router.post('/register', expressJoi(userCheckSchema), register)

export default router