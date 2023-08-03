const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async(req, res, next) => {
        try {
            let token = req.headers.authorization;
            console.log(token)
            if (!token) throw {
                status: false,
                message: 'Unauthorized Request'
            };
            token = token.split(' ')[1];
            let verifiedAccount = jwt.verify(token, process.env.KEY_JWT);
            req.token = token;
            req.account = verifiedAccount;
            console.log(verifiedAccount)
            next();

        } catch (err) {
            res.status(401).send(err);
        }
    },
    verifyAdmin: async(req, res, next) => {
        if (req.account.isAdmin) next ()
        else res.status(401).send({
            status: false,
            message: 'Access Denied'
        })
    },
    verifyCashier: async(req, res, next) => {
        if (!req.account?.isAdmin) next ()
         else res.status(401).send({
            status: false,
            message: 'Access Denied'
        })
    }
};