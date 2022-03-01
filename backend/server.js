const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

//Connect to the database
connectDB();

const app = express();

// recognize the incoming Request Object as a JSON Object
app.use(express.json());
// recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Todos Minion API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log('server started'));
