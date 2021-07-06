const express = require('express');
const taskModel = require('../models/task');
const app = express();

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/tasks', async (req, res) => {
    const tasks = await taskModel.find({});
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/tasks', async (req, res) => {
    const { description } = req.body;
    const task = new taskModel({ description });
    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { description, done } = req.body;
    try {
        task = await taskModel.findByIdAndUpdate(id, { 
            description, 
            done: done === 'true', 
            updated_at: Date.now()
        });
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await taskModel.findByIdAndDelete(id);
        if (!task) response.status(404).send("Item não encontrado")
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;