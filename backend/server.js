const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/book');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(bodyParser.json());

mongoose.connect(keys.MONGO_URI).catch(err => {
    console.log(err);
});

const dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.listen(process.env.PORT || 4000, () =>
    console.log(`server start at port: ${process.env.PORT}`)
);
