const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo:{
        type : String,
        require: [true, "You must write your job"],
    },
    completed: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('Todo', todoSchema);