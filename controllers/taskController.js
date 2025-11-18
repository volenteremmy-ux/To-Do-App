const Task = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const task = await Task.create({
      name,
      description,
      dueDate
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Single Task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search Tasks by Name
exports.searchTasks = async (req, res) => {
  try {
    const { name } = req.query;

    const results = await Task.find({
      name: { $regex: name, $options: "i" }
    });

    res.json(results);
  } catch (err) {
    console.error("Error searching tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Filter Tasks by Due Date
exports.filterByDate = async (req, res) => {
  try {
    const { dueDate } = req.query;

    const results = await Task.find({
      dueDate: { $gte: new Date(dueDate) }
    });

    res.json(results);
  } catch (err) {
    console.error("Error filtering tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Task not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
