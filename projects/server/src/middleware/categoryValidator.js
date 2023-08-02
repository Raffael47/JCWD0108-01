const { body, header, param, validationResult } = require('express-validator');
const db = require('../models');
const category = db.Category

module.exports = {
    checkCreateCategory : async(req, res, next) => {
        try {
            await body('name').notEmpty().withMessage("Category name is required").run(req);
            await body('quantity').notEmpty().withMessage("Quantity is required").run(req);
            const validation = validationResult(req);
            if (validation.isEmpty()) {
                next();
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                })
            }

        } catch (error) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    checkUpdateCategory : async(req, res, next) => {
        try {
            await body('name').notEmpty().withMessage("New name category is required").run(req);
            await body('icon').notEmpty().withMessage("Icon is required").run(req);
            await body('color').notEmpty().withMessage("color is required").run(req);
            await body('quantity').notEmpty().withMessage("Quantity is required").run(req);

            await param('id').notEmpty().withMessage("Id category is required").run(req);
            const validation = validationResult(req);
            if (validation.isEmpty()) {
                next()
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                })
            }

        } catch (error) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    checkDeleteCategory : async(req, res, next) => {
        try {
            await param('id').notEmpty().withMessage("id category is required").run(req)
            const validation = validationResult(req)
            if (validation.isEmpty()) {
                next();
            }
            else{
                return res.status(400).send({
                    status: false,
                    msg: 'Invalid validation',
                    error: validation.array()
                });
            }

        } catch (error) {
            console.log(err);
            res.status(400).send(err);
        }
    },

    checkCategoryExist : async (req, res, next) => {
        try {
            const { id } = req.params
            const existCategory = await category.findOne({ where: { id } });
            if (!existCategory) throw { message : "Category not found"}
            next();
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
}