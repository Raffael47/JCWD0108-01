const { transactionController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

const router = require('express').Router();

router.post('/', verifyToken, transactionController.addToCart);
router.patch('/', verifyToken, transactionController.finishTransaction);
router.get('/', verifyToken, transactionController.getTransactionDetails);
router.get('/history', verifyToken, transactionController.getTransactionHistory);

module.exports = router;