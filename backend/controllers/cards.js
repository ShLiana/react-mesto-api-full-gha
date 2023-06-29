const Card = require('../models/card');
const { ERROR_STATUS } = require('../utils/errorsConstantsName');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFound = require('../utils/errors/NotFound');
const ForbiddenError = require('../utils/errors/ForbiddenError');

// Получить все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(ERROR_STATUS.OK).send({ data: cards }))
    .catch(next);
};

// Добавить новую карточку
const addNewCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(ERROR_STATUS.CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Введены некорректные данные при добавлении карточки',
          ),
        );
      }
      return next(err);
    });
};

// Удалить карточку
const deleteCard = (req, res, next) => {
  // Метод поиска по id и удаления карточки
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).send(deletedCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный запрос'));
      }
      return next(err);
    });
};

// Удалить лайк с карточки
const deleteCardLike = (req, res, next) => {
  // Метод поиска по id и обновления карточки
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.status(ERROR_STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный запрос'));
      }
      return next(err);
    });
};

// Поставить лайк карточке
const addCardLike = (req, res, next) => {
  // Метод поиска по id и обновления документа
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.status(ERROR_STATUS.OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  addNewCard,
  addCardLike,
  deleteCardLike,
  deleteCard,
};
