const express = require('express');
const router = express.Router();4

const TaskController = require('../controllers/TaskController');

router.post('/', TaskController.createTask);

router.get('/', TaskController.getAlltasks);

router.delete('/:id', TaskController.removeTask);

router.patch('/:id', TaskController.updateTask)

router.patch('/edit/:id', TaskController.editTask);

module.exports = router;