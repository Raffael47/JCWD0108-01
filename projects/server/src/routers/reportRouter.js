const { reportController } = require('../controllers');
const { verifyToken, verifyCashier } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', verifyToken, verifyCashier, reportController.getReport);
router.get('/sales', verifyToken, verifyCashier, reportController.getSalesPer);
router.get('/products', verifyToken, verifyCashier, reportController.getProductsSold);

module.exports = router;