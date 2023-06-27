const router = require('express').Router();
const {
  getCards,
  addNewCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const {
  createCardValidation, cardIdValidation,
} = require('../middlewares/dataValidation');

router.get('/', getCards); // вернуть все карточки
router.post('/', createCardValidation, addNewCard); // создать карточку
router.delete('/:cardId', cardIdValidation, deleteCard); // удалить карточку по идентификатору
router.put('/:cardId/likes', cardIdValidation, addCardLike); // поставить лайк карточке
router.delete('/:cardId/likes', cardIdValidation, deleteCardLike); // убрать лайк с карточки

module.exports = router;
