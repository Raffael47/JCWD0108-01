const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async(req, res, next) => {
        try {
            const token = req.headers.Authorization;
            if (!token) throw {
                status: false,
                message: 'Unauthorized Request'
            };
            token = token.split(' ')[1];

            let verifiedAccount = jwt.verify(token, process.env.KEY_JWT);
            req.token = token;
            req.account = verifiedAccount;
            next();

        } catch (err) {
            res.status(401).send(err);
        }
    },
    verifyAdmin: async(req, res, next) => {
        if (!req.user.isAdmin) res.status(401).send({
            status: false,
            message: 'Access Denied'
        });
        next();
    },
    verifyCashier: async(req, res, next) => {
        if (req.user.isAdmin) res.status(401).send({
            status: false,
            message: 'Access Denied'
        });
        next();    }
};