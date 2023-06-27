const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { signinDataValidation, signupDataValidation } = require('./middlewares/dataValidation');
const NotFound = require('./utils/errors/NotFound');
const cors = require ('cors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', signinDataValidation, login);
app.post('/signup', signupDataValidation, createUser);

// подключаем роутинг
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.all('*/', (req, res, next) => {
  next(new NotFound('Страница не существует'));
});

// обработчик ошибок celebrate
app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на сервере' : message,
    });
  next();
});

app.listen(PORT);
