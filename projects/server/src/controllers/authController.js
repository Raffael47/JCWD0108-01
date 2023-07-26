const db = require('../models');
const account = db.Account;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../middleware/transporter')
const fs = require('fs')
const handlebars = require('handlebars')

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
            res.status(400).send(err)
        };
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const checkLogin = await user.findOne({
                where: { username }
            })

            if (!checkLogin) throw { message: "user not found" }

            const isValid = await bcrypt.compare(password, checkLogin.password)

            if (!isValid) throw { message: "wrong password" }

            const payload = { id: checkLogin.id, isAdmin: checkLogin.isAdmin }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: '1h' })

            res.status(200).send({
                status: true,
                message: "login success",
                token
            })
        } catch (err) {
            res.status(400).send(err)
        }
    },
    keeplogin: async (req, res) => {
        try {
            const result = await user.findOne({
                where: {
                    id: req.user.id
                }
            })
            res.status(200).send(result)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const isEmailExist = await user.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (!isEmailExist) throw { message: "Email tidak ditemukan" }

            const payload = { email: req.body.email }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1h" })

            const data = await fs.readFileSync('./resetPass.html', 'utf-8')
            const tempCompile = await handlebars.compile(data)
            const tempResult = tempCompile({ token })

            await transporter.sendMail({
                from: process.env.TRANSPORTER_EMAIL,
                to: req.body.email,
                subject: 'Reset Password',
                html: tempResult
            })

            res.status(200).send({
                message: "Silahkan periksa E-mail Anda!",
                token
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
    resetPassword: async (req, res) => {
        try {
            if (req.body.password !== req.body.confirmPassword) throw { message: "Password tidak cocok" }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            await user.update({ password: hashPassword }, {
                where: {
                    email: req.user.email
                }
            })
            
            res.status(200).send({
                message: "Password berhasil dirubah"
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    }
}