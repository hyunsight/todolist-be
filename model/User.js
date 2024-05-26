const { Router } = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema(
   {
      name: {
         type: String,
         required: true,
      },

      email: {
         type: String,
         required: true,
      },

      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

//패스워드 정보의 경우, 어떤 요청이든 제외시키기 위한 함수
userSchema.methods.toJSON = function () {
   // return this
   const obj = this._doc
   delete obj.password
   delete obj.updatedAt
   delete obj.__v

   return obj
}

//토큰 생성
userSchema.methods.generateToken = function () {
   const token = jwt.sign({ _id: this._id }, `${JWT_SECRET_KEY}`, {
      expiresIn: '1d',
   })
   return token
}

console.log('JWT Secret:', process.env.JWT_SECRET_KEY)

const User = mongoose.model('User', userSchema)

module.exports = User
