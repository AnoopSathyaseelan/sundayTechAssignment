require('dotenv').config({ path: './.env' });
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression')
const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.ENVIROMENT || 'DEV';
const logAPIMiddleware = require('./middlewares/logger.middleware')
const auth = require('./modules/auth/routes/auth.routes')
const admin = require('./modules/admin/routes/admin.routes')
const users = require('./modules/users/routes/user.routes')



const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(compression());

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database Connected");
    }).catch((error) => {
        console.error(error);
    })

app.use(logAPIMiddleware);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/users', users);

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1)
})

app.listen(PORT, () => {
    console.log("Current Time:", new Date().toLocaleTimeString());
    console.log("Connected on port", PORT);
    console.log("Current Enviroment :", ENVIROMENT);
})



