const { authController } = require('../controllers')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist } = require('../middleware/validator')

const router = require('express').Router()

router.post('/register', checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, authController.register)
router.post('/login', checkUsername, checkPassword, authController.login)
router.get('/keep', verifyToken, verifyAdmin, authController.keeplogin)
router.put('/forgotpass', checkEmail, authController.forgotPassword)
router.patch('/resetpass', verifyToken, verifyAdmin, authController.resetPassword)

module.exports = router