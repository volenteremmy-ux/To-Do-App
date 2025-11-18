const express = require('express');
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  searchTasks,
  filterByDate,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Create
router.post('/', createTask);

// Read all
router.get('/', getAllTasks);

// Read one
router.get('/:id', getTaskById);

// Search by name
router.get('/search/query', searchTasks);

// Filter by date
router.get('/filter/date', filterByDate);

// Update
router.put('/:id', updateTask);

// Delete
router.delete('/:id', deleteTask);

module.exports = router;
