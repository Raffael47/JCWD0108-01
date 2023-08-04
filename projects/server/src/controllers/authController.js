const db = require('../models');
const account = db.Account;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../middleware/transporter');
const fs = require('fs');
const handlebars = require('handlebars');
const { log } = require('util');

module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const result = await account.create({ username, email, password: hashPassword });
            res.status(200).send({
                status: true,
                massage: 'register success',
                result
            });
        } catch (err) {
            res.status(400).send(err);
        };
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const checkLogin = await account.findOne({ where: { username } });
            if (!checkLogin) throw { message: "Account not found" };
            const isValid = await bcrypt.compare(password, checkLogin.password);
            if (!isValid) throw { message: "Wrong password" };
            const payload = { id: checkLogin.id, isAdmin: checkLogin.isAdmin };
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '1h' });
            res.status(200).send({
                status: true,
                message: "login success",
                token
            });
        } catch (err) {
            console.log(err)
            res.status(400).send(err);
        };
    },
    keeplogin: async (req, res) => {
        try {
            const result = await account.findOne({
                where: {
                    id: req.account.id
                }
            });
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send(err);
        };
    },
    forgetPassword: async (req, res) => {
        try {
            const result = await account.findOne({ where: { email: req.body.email }});
            if (!result) throw { message: "Email not found" };
            const payload = { email: req.body.email };
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1h" });
            const data = await fs.readFileSync('./src/resetPass.html', 'utf-8');
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({ token });
            await transporter.sendMail({
                from: process.env.TRANSPORTER_EMAIL,
                to: req.body.email,
                subject: 'Reset Password',
                html: tempResult
            });
            res.status(200).send({
                message: "Please Check your E-mail!",
                token
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        };
    },
    resetPassword: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const result = await account.update({ password: hashPassword }, {
                where: { email: req.account.email }
            });
            if (result[0] == 0) throw { message: "Password failed changed" };
            res.status(200).send({ message: "Password changed successfully" });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        };
    }
};