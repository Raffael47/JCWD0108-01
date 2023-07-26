const db = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize')
const ts = db.Transaction;
const tsDetail = db.Transaction_detail;
const product = db.Product;
const category = db.Category;
const account = db.Account;

module.exports = {
    addToCart: async(req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { ProductId, quantity } = req.body;

            const [result] = await ts.findOrCreate({
                where: {
                    AccountId: req.account.id,
                    status: 'CART'
                },
                transaction
            })

            await tsDetail.create({
                TransactionId: result.id,
                ProductId,
                quantity
            }, { transaction });

            await transaction.commit();

            res.status(201).send({
                status: true,
                message: 'Product added to cart'
            })

        } catch (err) {
            await transaction.rollback();
            res.status(400).send(err)
        }
    },
    finishTransaction: async(req, res) => {
        try {
            const { total, payment, change, id } = req.body
            const result = await ts.update({
                total,
                payment,
                change,
                status: 'PAID'
            }, { where: { id } });

            res.status(201).send({
                status: true,
                message: 'Transaction Finished',
                result
            });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getTransactionDetails: async(req, res) => {
        try {
            const result = await ts.findOne({
                where: {
                    [Op.and]: [
                        { AccountId: req.account.id },
                        { status: 'CART' }
                    ]
                }
            });
            const cart = await tsDetail.findAll({ where: { TransactionId: result.id } });

            res.status(200).send({
                status: true,
                id: result.id,
                cart
            });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    getTransactionHistory: async(req, res) => {
        try {
            const result = await ts.findAll({
                where: {
                    [Op.and]: [
                        { AccountId: req.account.id },
                        { status: 'PAID' }
                    ]
                },
                include: [
                    {
                        model: tsDetail,
                        include: [
                            {
                                model: product,
                                attributes: ['name', 'image', 'price', 'description', 'CategoryId'],
                                include: {
                                    model: category,
                                    attributes: ['name']
                                }
                            }
                        ]
                    },
                    {
                        model: account,
                        attributes: ['name', 'imgProfile']
                    }
                ]
            });

            res.status(200).send({
                status: true,
                result
            })
        } catch (err) {
            res.status(400).send(err);
        }
    }
}