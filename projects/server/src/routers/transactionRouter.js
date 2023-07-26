const { transactionController } = require('../controllers');
const { verifyToken, verifyCashier } = require('../middleware/auth');
const router = require('express').Router();

router.post('/', verifyToken, verifyCashier, transactionController.addToCart);
router.patch('/', verifyToken, verifyCashier, transactionController.finishTransaction);
router.get('/', verifyToken, verifyCashier, transactionController.getTransactionDetails);
router.get('/history', verifyToken, verifyCashier, transactionController.getTransactionHistory);

module.exports = router;