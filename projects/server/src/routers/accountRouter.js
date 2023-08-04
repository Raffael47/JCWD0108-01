const accountController = require('../controllers/accountController');
const { verifyToken } = require('../middleware/auth');
const { multerUpload } = require('../middleware/multer');
const router = require('express').Router();

router.get("/", accountController.getCashiers);
router.post("/profilePictrue", verifyToken,multerUpload().single("file"), accountController.uploadPic);
router.put("/disableCashier/:id", verifyToken, verifyAdmin, accountController.disableCashier);
router.put("/enableCashier/:id", verifyToken, verifyAdmin, accountController.enableCashier);
router.post("/profile", verifyToken, multerUpload('./public/avatar', 'avatar').single("file"), accountController.uploadPic);

module.exports = router;