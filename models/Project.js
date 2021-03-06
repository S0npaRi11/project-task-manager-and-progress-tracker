const mongoose = require('mongoose');

const projectScheema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        default: 100
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    tasks: {
        type: Array,
        default: []
    },
    completeValue:{
        type: Number,
        default: 0
    },task2:{
        type: Array,
        default: []
    },
    task3:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model('project', projectScheema);