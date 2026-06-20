const express = require('express');
const app = express()
const conn = require('./db/conn');
const Task = require('./models/Task');

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const api = require('./routes/index');

app.use('/api', api)

const listen = async () => {
    try {
        await conn.sync();
        app.listen(3000);
    } catch (error) {
        console.log(error);
    }
};

listen();