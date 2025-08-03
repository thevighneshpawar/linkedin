import { Router } from 'express'
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  getCurrentUser,
  changeCurrentPassword,
  updateAccountDetails
} from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/refresh-token').post(refreshAccessToken)

router.route('/update-account').patch(verifyJWT, updateAccountDetails)
router.route('/logout').post(verifyJWT, logoutUser)
router.get('/me', verifyJWT, getCurrentUser)
router.post('/change-password', verifyJWT, changeCurrentPassword)

export default router
