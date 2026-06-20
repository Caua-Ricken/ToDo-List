const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRouter');
router.use('/tasks', taskRoutes);


module.exports = router;