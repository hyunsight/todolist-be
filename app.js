/*
할일앱

restful API
: 주소 + http 명령어
: /createTasks, /getTasks, /modifyTasks, /deleteTasks...
  > 
  /Tasks post, /Tasks get, /Tasks put, /Tasks delete

1.할일을 추가할 수 있다. C /tasks post
2.할일 리스트를 볼 수 있다. R /tasks get
3.할일에 대해서 끝남, 안끝남 표시를 할 수 있다. U /tasks/:id put
4.할일을 삭제할 수 있다. D /tasks/:id delete

백엔드 준비
1.기본 세팅 : npm 셋팅, express 셋팅, mongoose 셋팅, app 리스터 셋팅
2.라우터 주소 정의
3.데이터베이스 스키마 정의 
4.기능 정의 : CRUD
5.테스트 : 포스트맨

프론트엔드 준비
1.UI : git clone
2.기능 만들기 : CRUD
3.테스트
*/

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()

const app = express()
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
// console.log('mongouri', MONGODB_URI_PROD)

app.use(bodyParser.json())
app.use(cors())
app.use('/api', indexRouter)

const mongoURI = MONGODB_URI_PROD

mongoose
   .connect(mongoURI, { useNewUrlParser: true })
   .then(() => {
      console.log('mongoose connected')
   })
   .catch((err) => {
      console.log('DB connection fail', err)
   })

app.listen(process.env.PORT || 4500, () => {
   console.log('server on 4500')
})
