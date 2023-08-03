const db = require('../models');
const account = db.Account;
const { Op } = require('sequelize');

module.exports = {
    uploadPic: async (req, res) => {
        try {
        if (req.file == undefined) {
            throw { message: "Image should not be empty" };
        }
        const result = await account.update(
            {
            imgProfile: req.file.filename,
            },
            {
            where: {
                id: req.account.id,
            },
            }
        );
        res.status(200).send({ result, message: "Upload success" });
        } catch (error) {
        res.status(400).send(error);
        console.log(error);
        }
    },
    getCashiers: async (req,res) => {
        try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const sort= req.query.sort || "ASC"
        const condition = {isAdmin:false, isDisabled:false}
        if (search) condition['username'] = { [Op.like]: `%${search}%` };
        const offset = (page - 1) * limit
        const total = await account.count({where: condition})
        const result = await account.findAll({attributes:{exclude: ["password"]} ,where: condition, limit, offset:offset, order : [["username", sort]]})
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            total_account: total,
            result,
            status: true,
        });
        } catch (error) {
        console.log(error);
        res.status(400).send(error);
        }
    }
};
