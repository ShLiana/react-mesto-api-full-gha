const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_STATUS } = require('../utils/errorsConstantsName');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFound = require('../utils/errors/NotFound');
const ConflictError = require('../utils/errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

// Получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Добавить нового пользователя
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(ERROR_STATUS.CREATED).send({
      name,
      about,
      avatar,
      email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с данным email уже существует'),
        );
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

// Создаем нового пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(ERROR_STATUS.OK).send({ data: user });
      } else {
        throw new NotFound('Пользователь с данным _id не найден');
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new BadRequestError('Введены некорректные данные поиска'));
      }
      return next(err);
    });
};

// Получить пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(ERROR_STATUS.OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

// Обновить аватар пользователя
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(ERROR_STATUS.OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Введены некорректные данные при обновлении аватара'),
        );
      }
      return next(err);
    });
};

// Обновляем данные профиля пользователя
const updateProfileInfo = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(ERROR_STATUS.OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Введены некорректные данные при обновлении данных профиля'),
        );
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateAvatar,
  updateProfileInfo,
  getCurrentUser,
  login,
};
