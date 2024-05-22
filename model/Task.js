const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
   },
   { timestamps: true }
)

//모델
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
