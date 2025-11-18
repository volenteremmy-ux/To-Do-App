require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
