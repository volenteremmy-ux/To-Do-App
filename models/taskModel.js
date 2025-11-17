const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true
        },
        completed:{
        type:Boolean,
        default:false
        }
    },
    {timestamp:true}
);
module.exports=mongoose.model('task', taskSchema);