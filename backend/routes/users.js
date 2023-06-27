const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateAvatar,
  updateProfileInfo,
  getCurrentUser,
} = require('../controllers/users');

const {
  userIdValidation,
  userProfileInfoValidation,
  updateAvatarValidation,
} = require('../middlewares/dataValidation');

router.get('/', getUsers); // вернуть всех пользователей
router.get('/me', getCurrentUser); // вернуть данные текущего пользователя
router.get('/:userId', userIdValidation, getUserById); // вернуть пользователя по _id
router.patch('/me/avatar', updateAvatarValidation, updateAvatar); // обновлить аватарку
router.patch('/me', userProfileInfoValidation, updateProfileInfo); // обновить данные профиля

module.exports = router;
