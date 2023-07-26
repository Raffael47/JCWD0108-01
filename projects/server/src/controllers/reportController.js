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
            const aggregate = req.query.aggr || 'COUNT';
            const cashier = req.query.cashier || '';

            const result = await ts.findAll({
                group: [ Sequelize.fn(`${time}`, Sequelize.col('createdAt')) ],
                attributes: {
                    include: [
                        [
                            Sequelize.literal(`(
                                SELECT ${aggregate}(total)
                                FROM Transactions
                                GROUP BY ${time}
                            )`), 
                            `${aggregate}Total`
                        ]
                    ]
                },
                include: [
                    {
                        model: account,
                        attributes: ['name', 'imgProfile'],
                        where: {
                            username: cashier
                        }
                    }
                ]
            })

            if (!result) throw { status: false, message: 'Data not found on the given range' };

            res.status(200).send({
                status: true,
                result
            })
        } catch (err) {
            res.status(404).send(err);
        }
    },
    getReport: async(req, res) => {
        try {
            const startDate = req.query.startDate || "";
            const endDate = req.query.endDate || "";

            const result = await ts.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [
                            new Date (startDate).getTime(),
                            new Date (endDate).getTime()
                        ]
                    },
                    status: 'PAID'
                }
            });
            if (!result) throw { status: false, message: 'Data not found on the given range' };

        } catch (err) {
            res.status(404).send(err);
        }
    },
    getProductsSold: async(req, res) => {
        try {
            const id_cat = req.params.id_cat || "";
            const startPrice = req.params.start || 0;
            const endPrice = req.params.end || 9999999999999999999999999;
            const status = req.params.status || "PAID";
            const cashier = req.params.cashier || "";

            const result = await tsDetail.findAll({
                include: [
                    {
                        model: product,
                        where: {
                            CategoryId: id_cat,
                            price: {
                                [Op.between]: [ startPrice, endPrice ]
                            }
                        },
                        include: [
                            {
                                model: category,
                                attributes: ['name']
                            }
                        ]
                    },
                    {
                        model: ts,
                        where: { status },
                        include: [
                            {
                                model: account,
                                attributes: ['username', 'imgProfile'],
                                where: {
                                    username: cashier
                                }
                            }
                        ]
                    }
                ]
            });

            if (!result) throw { status: false, message: 'Data not found on the given range' };

            res.status(200).send({
                status: true,
                result
            });
        } catch (err) {
            res.status(404).send(err);
        }
    }
}