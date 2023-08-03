const router = require('express').Router();
const { categoryController } = require('../controllers');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { checkCreateCategory, checkUpdateCategory, checkDeleteCategory, checkCategoryExist } = require('../middleware/categoryValidator');

router.get('/',verifyToken, categoryController.allCategory);
router.post('/',verifyToken, verifyAdmin, checkCreateCategory, categoryController.createCategory);
router.patch('/:id',verifyToken, verifyAdmin,checkUpdateCategory, checkCategoryExist, categoryController.updateCategory);
router.delete('/delete/:id',verifyToken, verifyAdmin, checkDeleteCategory, checkCategoryExist, categoryController.deleteCategory);




module.exports = router
