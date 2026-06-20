const Task = require('../models/Task');

module.exports = {

    async createTask(req, res) {
        let { title, description, dueDate } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        try {
            await Task.create({ title, description, dueDate, done: false });
            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error: error.message });
        }
    },

    async getAlltasks(req, res) {

        try {
            const tasks = await Task.findAll({ raw: true });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks', error: error.message });
        }
    },

    async removeTask(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Task.destroy({ where: { id: id } });
            if (deleted) {
                res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                res.status(404).json({ message: 'Task not found' });
            };
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task', error: error.message });
        }
    },

    async editTask(req, res) {
        const { id } = req.params;
        try {
            const task = await Task.findOne({ where: { id: id }, raw: true });
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task', error: error.message });
        }
    },

    async updateTask(req, res) {
        const { id } = req.params;

        try {
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({
                    message: 'Tarefa não encontrada'
                });
            }

            task.done = !task.done;

            await task.save();

            res.json(task);

        } catch (error) {
            res.status(500).json({ message: 'Error updating task', error: error.message });
        }
    },

    async editTask(req, res) {
        const { id } = req.params;
        let { title, description, dueDate } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        try {
            const task = await Task.findByPk(id);

            if (!task) {
                return res.status(404).json({
                    message: 'Tarefa não encontrada'
                });
            }

            task.title = title;
            task.description = description;
            task.dueDate = dueDate;

            await task.save();
            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating task', error: error.message });
        }

    }




}