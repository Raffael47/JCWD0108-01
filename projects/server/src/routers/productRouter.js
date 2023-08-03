const router = require('express').Router();
const { productController } = require('../controllers');
const { checkCreateProduct, checkUpdateProduct, checkDeactiveProduct, checkProductExist } = require('../middleware/productValidator');
const { checkCategoryExist } = require('../middleware/categoryValidator');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { multerUpload } = require('../middleware/multer');

router.get('/', verifyToken, productController.allProduct);
router.patch('/deactivate/:id',verifyToken, verifyAdmin, checkProductExist, checkDeactiveProduct, productController.deactiveProduct);
router.post('/:id',verifyToken, verifyAdmin,checkCreateProduct, multerUpload('./public/product', 'product').single('file'), productController.createProduct);
router.patch('/:id',verifyToken, verifyAdmin,checkProductExist, checkUpdateProduct, productController.updateProduct);





module.exports = router;