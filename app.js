const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const controller = require('./controllers/users');
const validateReq = require('./middlewares/validator');

const auth = require('./middlewares/auth');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).send({ message: 'Incorrect Enquiry, Syntax Error' });
  } else {
    next();
  }
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateReq.validateLogin, controller.createUser);
app.post('/signin', validateReq.validateLogin, controller.login);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'Ошибка сервера'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Success! PORT: ${PORT}`);
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
