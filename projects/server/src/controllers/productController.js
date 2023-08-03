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
            const category = +req.query.category;
            const name = req.query.name || "";
            const sort = req.query.sort || "";
            const search = req.query.search || ""

            
            const filter = {
                isDeleted: false,
            };
            if (search) {
                filter[Op.or] = [{
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                }]
            }
            if (category) {
                filter.CategoryId = category;
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
                    "CategoryId"
                ],
                where: filter,
                limit,
                offset,
                order,
                search
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
            const { name, price, quantity, CategoryId, description } = req.body;
            const image = req.file.filename

            const catLike = await categories.findOne({
                where: {
                    id: CategoryId
                }
            })
            if (!catLike) {
                return res.status(400).send({ message: 'Category not found' }) 
              };
            const result = await product.create({
                name,
                price,
                quantity,
                description,
                image,
                CategoryId: catLike.id
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