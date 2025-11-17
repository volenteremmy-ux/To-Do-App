const taskModel=require("../models/taskModel");
exports.createTask=async(req, res) =>{
    try{
        const{title, description} =req.body;
        if(!title){
            return res.status(400).json({error: "Title is required"});
            }
            const task = await taskModel.create({title, description});
            res.status(201).json(task);
    }catch (err){
        console.log("Error creating task:", err);
        res.status(500).json({error: "Internal server error"});
    }
}