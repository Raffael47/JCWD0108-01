const { authController } = require('../controllers')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, checkConfirmPassword } = require('../middleware/authValidator')

const router = require('express').Router()

router.post('/', verifyToken, verifyAdmin, checkUsername, checkEmail, checkPassword, checkConfirmPassword, checkUsernameExist, checkEmailExist, authController.register)
router.post('/login', checkUsername, checkPassword, authController.login)
router.get('/', verifyToken, authController.keeplogin)
router.put('/', checkEmail, authController.forgetPassword)
router.patch('/', verifyToken, checkPassword, authController.resetPassword)

module.exports = router