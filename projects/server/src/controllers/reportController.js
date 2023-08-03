const db = require('../models');
const { Op, Sequelize } = require('sequelize')
const ts = db.Transaction;
const tsDetail = db.Transaction_detail;
const product = db.Product;
const category = db.Category;
const account = db.Account;

module.exports = {
    getSalesPer: async(req, res) => {
        try {
            const time = req.query.time || 'day';
            const cashier = req.query.cashier || '';
            const startDate = req.query.startDate || '0';
            const endDate = req.query.endDate || '2099';

            const result = await ts.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [
                            new Date (startDate),
                            new Date (endDate)
                        ]
                    }
                },
                group: [ Sequelize.fn(`${time}`, Sequelize.col('date')) ],
                attributes: [
                    ['createdAt', 'date'],
                    [ Sequelize.fn('count', Sequelize.col('total') ), 'countTotal' ],
                    [ Sequelize.fn('avg', Sequelize.col('total') ), 'avgTotal' ],
                    [ Sequelize.fn('sum', Sequelize.col('total') ), 'sumTotal' ],
                    [ Sequelize.fn('min', Sequelize.col('total') ), 'minTotal' ],
                    [ Sequelize.fn('max', Sequelize.col('total') ), 'maxTotal' ],
                ],
                include: [
                    {
                        model: account,
                        attributes: ['username', 'imgProfile'],
                        where: {
                            username: {[Op.like]: [`%${cashier}%`]}
                        }
                    }
                ]
            })

            if (result[0] === undefined) throw { status: false, message: 'Data not found on the given range' };

            res.status(200).send({
                status: true,
                result
            })
        } catch (err) {
            res.status(404).send(err);
        }
    },
    getTransactionDetails: async(req, res) => {
        try {
            const { id } = req.params
            const id_cat = req.params.id_cat || "";
            const startPrice = +req.params.start || 0;
            const endPrice = +req.params.end || 9999999999999999999999999;
            const sort = req.query.sort || "ProductId";
            const orderBy = req.query.orderBy || "ASC";

            const tsInfo = await ts.findOne({
                where: { id },
                include: [
                    {
                        model: account,
                        attributes: ['username', 'imgProfile']
                    }
                ]
            });

            const result = await tsDetail.findAll({
                where: {
                    transactionId: id
                },
                include: [
                    {
                        model: product,
                        where: {
                            CategoryId: {[Op.like]: [`%${id_cat}%`]},
                            price: {
                                [Op.between]: [ startPrice, endPrice ]
                            }
                        },
                        include: [
                            {
                                model: category,
                                attributes: ['name', 'icon', 'color']
                            }
                        ]
                    },
                ],
                order: [ [ Sequelize.col(sort), `${orderBy}` ] ],
                attributes: { exclude: ['TransactionId'] }
            })
            if (result[0] === undefined) throw { status: false, message: 'Data not found on the given range' };

            res.status(200).send({
                status: true,
                tsInfo,
                result
            })
        } catch (err) {
            res.status(404).send(err);
        }
    },
    getReport: async(req, res) => {
        try {
            const status = req.params.status || "PAID";
            const cashier = req.params.cashier || "";
            const startDate = req.query.startDate || '0';
            const endDate = req.query.endDate || '2099';
            const sort = req.query.sort || "ASC";
            const orderBy = req.query.orderBy || "id";
            const limit = +req.query.limit || 10;
            const page = +req.query.page || 1;

            const filter = {
                where: {
                    createdAt: {
                        [Op.between]: [
                            new Date (startDate),
                            new Date (endDate)
                        ]
                    }
                },
                include: [
                    {
                        model: account,
                        attributes: ['username', 'imgProfile'],
                        where: {
                            username: {[Op.like]: [`%${cashier}%`]}
                        }
                    }
                ],
                order: [ [ Sequelize.col(orderBy), `${sort}` ] ],
                limit,
                offset: ( page - 1 ) * limit
            }

            const result = await ts.findAll( filter );
            const total = await ts.count( filter );

            if (result[0] === undefined) throw { status: false, message: 'Data not found on the given range' };

            res.status(200).send({
                status: true,
                limit,
                totalPage: Math.ceil(total / limit),
                currentPage: page,
                result
            });
        } catch (err) {
            console.log(err)
            res.status(404).send(err);
        }
    }
}