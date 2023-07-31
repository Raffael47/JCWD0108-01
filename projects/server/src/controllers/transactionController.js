const db = require('../models');
const { sequelize } = require('../models');
const { Op, Sequelize } = require('sequelize')
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

            const ts_detail = await tsDetail.findOne({
                where: {
                    [Op.and]: [
                        {TransactionId: result.id},
                        {ProductId}
                    ]
                }
            });

            if (ts_detail) await tsDetail.update({
                quantity
            }, {where: {
                    [Op.and]: [
                        {TransactionId: result.id},
                        {ProductId}
                    ]
                },
                transaction
            })
            else await tsDetail.create({
                TransactionId: result.id , ProductId, quantity
            }, { transaction })

            if (quantity <= 0) await tsDetail.destroy({
                where: {
                    [Op.and]: [
                        {TransactionId: result.id},
                        {ProductId}
                    ]
                },
                transaction
            });

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
            const { total, payment, change } = req.body
            const result = await ts.update({
                total,
                payment,
                change,
                status: 'PAID'
            }, {where: {
                    [Op.and]: [
                        { AccountId: req.account.id },
                        { status: 'CART' }
                    ]
                }
            });

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
            if (!result) throw { status: false, message: 'There are no active transactions' }
            
            const cart = await tsDetail.findAll({ where: { TransactionId: result.id },
                attributes: {
                    exclude: ['TransactionId']
                },
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
            });

            const subtotal = await tsDetail.findAll({ where: { TransactionId: result.id },
                include: [
                    {
                        model: product,
                        attributes: []
                    }
                ],
                attributes: [
                    [
                        Sequelize.literal(`(
                            SELECT sum((Transaction_detail.quantity * Product.price))
                        )`), 
                        `subtotal`
                    ]
                ]
            })

            res.status(200).send({
                status: true,
                TransactionId: result.id,
                subtotal,
                cart
            });
        } catch (err) {
            res.status(404).send(err);
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
                attributes: { exclude: ['updatedAt', 'AccountId'] },
                include: [
                    {
                        model: tsDetail,
                        attributes: { exclude: ['TransactionId'] },
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
                    }
                ]
            });
            if (!result) throw {status: false, message: 'Transaction history unavailable'}

            res.status(200).send({
                status: true,
                result
            })
        } catch (err) {
            res.status(404).send(err);
        }
    }
}