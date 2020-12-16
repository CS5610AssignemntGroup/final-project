import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

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

mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .catch(err => {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server start at port: ${PORT}`));
