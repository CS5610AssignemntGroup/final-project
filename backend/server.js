console.log("test.......")

import path from 'path';
import express from 'express';
// import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errors.js';

import productRoute from './routes/productRoute.js';
// import userRoute from './routes/userRoute.js'
// import orderRoute from './routes/orderRoute.js'
// import uploadRoute from './routes/uploadRoute.js';

// const keys = require('./config/keys');
// const mongoose = require('mongoose');


// mongoose
//     .connect(keys.MONGO_URI, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//     })
//     .catch(err => {
//         console.log(err);
//     });

// Console.log("test.......")


// const app = express();

// // if (process.env.NODE_ENV === 'development') {
// //     app.use(morgan('dev'));
// // }

// app.use(express.json());

// app.use('/api/products', productRoute);
// // app.use('/api/users', userRoutes);
// // app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoute);

// // app.get('/api/config/paypal', (req, res) =>
// //     res.send(process.env.PAYPAL_CLIENT_ID)
// // );

// // const __dirname = path.resolve();
// // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// // if (process.env.NODE_ENV === 'production') {
// //     app.use(express.static(path.join(__dirname, '/frontend/build')));

// //     app.get('*', (req, res) =>
// //         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// //     );
// // } else {
// //     app.get('/', (req, res) => {
// //         res.send('API is running....');
// //     });
// // }

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 4000;

// app.listen(
//     PORT,
//     console.log(
//         `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
//             .bold
//     )
// );
