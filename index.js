require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const {notFound, errorHandler} = require('./middlewares/errorHandle');
const connectionDB = require('./configs/connection');

const app = express();

connectionDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));