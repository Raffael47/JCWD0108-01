const accountController = require('../controllers/accountController');
const { verifyToken } = require('../middleware/auth');
const { multerUpload } = require('../middleware/multer');
const router = require('express').Router();

router.get("/", accountController.getCashiers);
router.post("/profile", verifyToken, multerUpload('./public/avatar', 'avatar').single("file"), accountController.uploadPic);

module.exports = router;