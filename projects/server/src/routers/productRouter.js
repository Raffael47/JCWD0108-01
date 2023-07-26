const router = require('express').Router();
const { productController } = require('../controllers');
const { checkCreateProduct, checkUpdateProduct, checkDeactiveProduct, checkProductExist } = require('../middleware/productValidator');
const { checkCategoryExist } = require('../middleware/categoryValidator');

router.get('/', productController.allProduct);
router.patch('/deactivate/:id', checkProductExist, checkDeactiveProduct, productController.deactiveProduct);
router.post('/:id',checkCreateProduct, productController.createProduct);
router.patch('/:id',checkProductExist, checkUpdateProduct, productController.updateProduct);





module.exports = router;