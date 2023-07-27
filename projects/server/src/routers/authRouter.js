const { authController } = require('../controllers')
const { verifyToken, verifyAdmin } = require('../middleware/auth')
const { checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist } = require('../middleware/authValidator')

const router = require('express').Router()

router.post('/add', verifyToken, verifyAdmin, checkUsername, checkEmail, checkPassword, checkUsernameExist, checkEmailExist, authController.register)
router.post('/login', checkUsername, checkPassword, authController.login)
router.get('/keep', verifyToken, authController.keeplogin)
router.put('/forgetp', checkEmail, authController.forgetPassword)
router.patch('/resetp', verifyToken, checkPassword, authController.resetPassword)

module.exports = router