const transactionRouter = require('./transactionRouter');
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter')
const authRouter = require('./authRouter')
const accountRouter = require('./accountRouter')
const reportRouter = require('./reportRouter')

module.exports = {
    transactionRouter,
    productRouter,
    categoryRouter,
    authRouter,
    reportRouter,
    accountRouter
}