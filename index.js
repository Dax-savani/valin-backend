require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const { notFound, errorHandler } = require('./middlewares/errorHandle');
const connectionDB = require('./configs/connection');

// Initialize Express app
const app = express();

// Connect to Database
connectionDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));