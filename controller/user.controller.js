const User = require('../model/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {}

userController.createUser = async (req, res) => {
   try {
      const { name, email, password } = req.body
      const user = await User.findOne({ email: email })

      if (user) {
         throw new Error('이미 가입이 된 유저입니다.')
      }

      //패스워드 암호화
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      //   console.log('hash', hash)
      const newUser = new User({ name, email, password: hash })
      await newUser.save()
      res.status(200).json({ status: 'success' })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

userController.loginWithEmail = async (req, res) => {
   try {
      const { email, password } = req.body

      const user = await User.findOne({ email }, '-createdAt -updatedAt -__v') //해당 요청에서만 지워야하는 정보인 경우
      if (user) {
         const isMatch = bcrypt.compareSync(password, user.password)
         if (isMatch) {
            const token = user.generateToken()
            return res.status(200).json({ status: 'success', user, token })
         }
      }
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
   } catch (error) {
      res.status(400).json({ status: 'fail', message: error.message })
   }
}

module.exports = userController
