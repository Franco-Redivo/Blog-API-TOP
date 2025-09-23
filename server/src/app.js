const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);


