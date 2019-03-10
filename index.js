const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');
const loggerMiddleware = require('./middleware/logger');
const config = require('./config');

const app = express();

app.use(helmet());

app.use(compression());

app.use(bodyParser.json())

// Logger Middleware
app.use(loggerMiddleware);

// Login Router
app.use('/', require('./routes/login'));

// Auth Middleware
app.use(authMiddleware);

// Members Router
app.use('/members', require('./routes/members'));

app.listen(config.PORT, (err) => {
    if (err) {
        console.error("Error while starting express server");
    }
    console.log(`Express server is running on port ${config.PORT}`);
});