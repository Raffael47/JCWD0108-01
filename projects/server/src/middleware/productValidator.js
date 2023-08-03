const { body, header, param, query, validationResult } = require('express-validator');
const db = require('../models');
const product = db.Product
const category = db.Category

module.exports = {
    checkCreateProduct : async(req, res, next) => {
        try {
            
            await body('name').notEmpty().withMessage("Product name is required").run(req);
            await body('price').notEmpty().withMessage("Product price is required").run(req);
            // await param('category').notEmpty().withMessage("Product category is required").run(req);
            await body('description').notEmpty().withMessage("Product description is required").run(req);
            

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
    checkUpdateProduct: async(req, res, next) => {
        try {
            await body('name').notEmpty().withMessage("Product name is required").run(req);
            await body('price').notEmpty().withMessage("Product price is required").run(req);
            await body('CategoryId').notEmpty().withMessage("Product category is required").run(req);
            await body('description').notEmpty().withMessage("Product description is required").run(req);
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

        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },

    checkDeactiveProduct: async(req, res, next) => {
        try {
            await param('id').notEmpty().withMessage("Product id is required").run(req)
            const validation = validationResult(req)
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
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    checkProductExist : async (req, res, next) => {
        try {
            const { id } = req.params
            const existProduct = await product.findOne({ where: { id } });
            if (!existProduct) throw { message : "Product not found"}
            next();
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
}