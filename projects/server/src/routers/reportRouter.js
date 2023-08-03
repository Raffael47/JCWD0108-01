const { reportController } = require('../controllers');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = require('express').Router();

router.get('/', verifyToken, verifyAdmin, reportController.getReport);
router.get('/sales', verifyToken, verifyAdmin, reportController.getSalesPer);
router.get('/details/:id', verifyToken, verifyAdmin, reportController.getTransactionDetails);


module.exports = router;