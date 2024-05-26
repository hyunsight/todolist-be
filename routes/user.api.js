const express = require('express')
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')
const router = express.Router()

//1. 회원가입 endpoint
router.post('/', userController.createUser)

//2. 로그인 endpoint
router.post('/login', userController.loginWithEmail)

//3. 토큰을 통해 유저 id 빼내고, 해당 id로 유저 객체 찾아서 보내주기
router.get('/me', authController.authenticate, userController.getUser)

module.exports = router
