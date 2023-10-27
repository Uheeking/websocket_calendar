const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    day:{
        type:String,
        require: [true, "You must have a day"],
    },
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