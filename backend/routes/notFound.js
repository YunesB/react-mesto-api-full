const NotFoundError = require('../errors/NotFoundError.js');

const notFound = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

module.exports = notFound;
