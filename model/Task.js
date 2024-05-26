const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
작성자 추가

1.테이블,(컬렉션)의 컬럼을 추가한다. (Author)
-현재 로그인한 유저가 누군지 로그인 유저정보를 알아야 한다.
2.할일 생성 시 author 값을 추가한다.
3.프론트엔드는 작성자 이름도 함께 보여준다.
*/

//데이터베이스 스키마: 작업지시서
const taskSchema = Schema(
   {
      task: {
         type: String,
         required: true,
      },
      isComplete: {
         type: Boolean,
         required: true,
      },
      author: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
   },
   { timestamps: true }
)

//모델
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
