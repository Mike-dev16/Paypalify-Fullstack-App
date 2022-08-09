const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const activitiesRouter = require('./controllers/activities');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const passwordResetRouter = require('./controllers/passwordReset');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const userExtractor = require('./utils/middleware').userExtractor;



logger.info('connecting to', config.MONGODB_URL);

mongoose.connect(`${config.MONGODB_URL}`)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });


app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/password-reset', passwordResetRouter);


app.use(middleware.tokenExtractor);
app.use('/api/activities', userExtractor, activitiesRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;