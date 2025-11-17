require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require ('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use('/api/task', taskRoutes);

app.get('./', (req,res)=>{
    res.json({message:"Todo API running"});
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
});