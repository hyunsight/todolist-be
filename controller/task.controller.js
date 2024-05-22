const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
   try {
      const { task, isComplete } = req.body
      const newTask = new Task({ task, isComplete })
      await newTask.save()

      res.status(200).json({ status: 'ok', data: newTask })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

taskController.getTask = async (req, res) => {
   try {
      const taskList = await Task.find({}).select('-__v')
      res.status(200).json({ status: 'ok', data: taskList })
   } catch (err) {
      res.status(400).json({ statue: 'fail', error: err })
   }
}

taskController.updateTask = async (req, res) => {
   try {
      const { isComplete } = req.body

      const updateTask = await Task.findByIdAndUpdate(
         req.params.id,
         { $set: { isComplete: isComplete } },
         { new: true } //[참고] If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
      )
      res.status(200).json({ status: 'ok', data: updateTask })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

taskController.deleteTask = async (req, res) => {
   try {
      const deleteTask = await Task.findOneAndDelete(req.params.id)
      res.status(200).json({ status: 'ok', data: deleteTask })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

module.exports = taskController
