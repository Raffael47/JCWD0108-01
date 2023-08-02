const db = require('../models');
const category = db.Category

module.exports = {
    allCategory: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            isDeleted: false, // Filter untuk isDeleted=false jika kolom ada
        };
        const total = await category.count({
            where: filter,
        });
        const result = await category.findAll({
            attributes: [
                "id",
                "name",
                "icon",
                "color",
                "quantity"
            ],
            where: filter, // Mengambil data dengan filter isDeleted=false
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            all_category: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createCategory : async (req, res) => {
        try {
            const { name, icon, color, quantity } = req.body;
            const result = await category.findOrCreate({ where : { name }, defaults : {icon,color,quantity} });
            if (!result[1]) throw {message : "Category has already been created"}
            res.status(201).send({
                msg: "Success to create new product",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { id } = req.params
            const { name,icon,color,quantity } = req.body;
            await category.update({
                name,
                color,
                icon,
                quantity
            },{where: { id }});
            res.status(200).send({
                msg: "Category has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    deleteCategory : async(req, res) => {
        try {
            const { id } = req.params
            await category.destroy ({ where: { id } });
            res.status(200).send({
                status: true,
                msg: 'Success deleted category!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}