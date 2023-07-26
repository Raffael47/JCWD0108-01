const db = require('../models');
const product = db.Product;
const categories = db.Category
const { Op } = require("sequelize");

module.exports = {
    allProduct : async (req, res) => {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const offset = (page - 1) * limit;
            const { category, name, sort } = req.query;

            const filter = {};
            if (category) {
                filter.category = category;
            }
            if (name) {
                filter.name = { [Op.iLike]: `%${name}%` };
            }
            let order = [];
            if (sort === "az") {
                order.push(["name", "ASC"]); 
            } else if (sort === "za") {
                order.push(["name", "DESC"]);
            } else if (sort === "asc") {
                order.push(["price", "ASC"]); 
            } else if (sort === "desc") {
                order.push(["price", "DESC"]); 
            }
            const total = await product.count({ where: filter });
            const result = await product.findAll({
                attributes: [
                    "id",
                    "name",
                    "image",
                    "price",
                    "quantity",
                    "description",
                    "createdAt",
                ],
                where: filter,
                limit,
                offset,
                order,
            });
            res.status(200).send({
                totalpage: Math.ceil(total / limit),
                currentpage: page,
                total_products: total,
                result,
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createProduct : async (req, res) => {
        try {
            const { name, price, quantity, description } = req.body;
            const { id } = req.params
            const image = req.file.filename
            const result = await product.create({
                name,
                price,
                quantity,
                description,
                image,
                categoryId : id
            })
            res.status(201).send({
                msg: "Success to create new product",
                status: true,
                result
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateProduct : async (req, res) => {
        try {
            const { name, price, quantity, categoryId, description } = req.body;
            const { id } = req.params
            const image = req.file.filename
            const result = await product.update({
                name,
                price,
                quantity,
                description,
                categoryId,
                image,
            },{where : { id }});
            res.status(200).send({
                msg: "Success update the product",
                status: true,
                result
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    deactiveProduct : async (req, res) => {
        try {
            const { id } = req.params
            await product.update({ isDeleted: true },
                {where : { id }});
            res.status(200).send({
                msg: "Success deactivate the product",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}