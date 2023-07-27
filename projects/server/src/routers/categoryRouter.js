const router = require('express').Router();
const { categoryController } = require('../controllers');
const { checkCreateCategory, checkUpdateCategory, checkDeleteCategory, checkCategoryExist } = require('../middleware/categoryValidator');

router.get('/', categoryController.allCategory);
router.post('/',checkCreateCategory, categoryController.createCategory);
router.patch('/:id',checkUpdateCategory, checkCategoryExist, categoryController.updateCategory);
router.delete('/delete/:id',checkDeleteCategory, checkCategoryExist, categoryController.deleteCategory);




module.exports = router
