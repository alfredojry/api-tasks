const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,  
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

const taskModel = mongoose.model('tarefas', TaskSchema);

module.exports = taskModel;