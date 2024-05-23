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

/*
로그인

1.회원가입
- 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
- 받은 정보를 저장함 (데이터베이스 모델 필요)
- 패스워드를 암호화시켜서 저장

1) 라우터 정의
2) 모델 정의/생성 
3) 데이터 저장 (이미 가입된 유저 유무 체크, 패스워드 암호화)
4) 응답 전송

2.로그인
- 이메일, 패스워드를 입력해서 보낸다.
- 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인한다.
- 없으면 로그인 실패
- 있으면 유저정보 + 토큰
- 프론트엔드에서는 이 정보를 저장한다.

1) 라우터 정의(설정)
2) 이메일, 패드워드 정보를 읽어오기
3) 이메일을 가지고 유저정보 가져오기
4) 해당 유저에 대해 DB에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교하기
5) 맞다면 토큰 발생
6) 틀리면 에러메세지 전달
7) 응답으로 유저정보 + 토큰 보내기

3.유저 권한 확인 (todo 페이지는 로그인한 유저만 들어갈 수 있다.)

4.내가 이미 로그인한 유저라면 추가 로그인 없이 바로 메인페이지로 돌아오기
*/
