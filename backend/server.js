const { urlencoded, json } = require('express');
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors')

connectDB();

const app = express();

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});