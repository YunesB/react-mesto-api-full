const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const controller = require('./controllers/users');

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

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.post('/signin', controller.login);
app.post('/signup', controller.createUser);

app.listen(PORT, () => {
  console.log(`Success! PORT: ${PORT}`);
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
