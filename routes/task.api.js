const express = require('express')
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

router.post('/', taskController.createTask)

router.get('/', taskController.getTask)

router.put('/:id', taskController.updateTask)

router.delete('/:id', taskController.deleteTask)

module.exports = router
