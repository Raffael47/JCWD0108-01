const accountController = require('../controllers/accountController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { multerUpload } = require('../middleware/multer');
const router = require('express').Router();

router.get("/", accountController.getCashiers);
router.post("/profile", verifyToken, multerUpload('./src/public/avatar', 'avatar').single("file"), accountController.uploadPic);
router.put("/disableCashier/:id", verifyToken, verifyAdmin, accountController.disableCashier);
router.put("/enableCashier/:id", verifyToken, verifyAdmin, accountController.enableCashier);

module.exports = router;