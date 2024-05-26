const express = require('express')
const authController = require('../controller/auth.controller')
const taskController = require('../controller/task.controller')
const router = express.Router()

// router.post('/tasks', (req, res) => {
//    res.send('create task')
// })

// router.get('/tasks', (req, res) => {
//    res.send('get tasks')
// })

// router.put('/tasks/:id', (req, res) => {
//    res.send('update task')
// })

// router.delete('/tasks/:id', (req, res) => {
//    res.send('delete task')
// })

router.get('/', taskController.getTask)

router.post('/', authController.authenticate, taskController.createTask)

router.put('/:id', taskController.updateTask)

router.delete('/:id', taskController.deleteTask)

module.exports = router
