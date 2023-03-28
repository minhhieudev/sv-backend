const config = require("../../config/auth.config");
const db = require("../../models");
const Admin = db.admin;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

exports.signup = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }

    const check = await Admin.findOne({ email: req.body.email });
    if (check != null) {
        res.status(500).json({ code: 'error', msg: 'Email đã được sử dụng' });
        return;
    }
    const user = new Admin({
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, info) => {
        console.log(1)
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        console.log(info)
        var token = jwt.sign({ id: info._id }, config.secret, {
            expiresIn: 864000 // 24 hours
        });

        const data = {
            _id: info._id,
            fullname: info.fullname,
            email: info.email,
            accessToken: token,
        }
        res.json({ code: 'success', msg: "Đăng ký tài khoản thành công", data: data });
    });

};

exports.signin = (req, res) => {
    db.user.findOne({
            email: req.body.email
        })
        .exec((err, admin) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }
            if (!admin) {
                return res.status(401).json({ code: 'error', msg: "Không tìm thấy tài khoản." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                admin.password
            );

            if (!passwordIsValid) {
                return res.status(401).json({
                    code: 'error',
                    msg: "Tài khoản hoặc mật khẩu không đúng"
                });
            }

            var token = jwt.sign({ id: admin.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).json({
                code: 'success',
                data: {
                    _id: admin._id,
                    fullname: admin.fullname,
                    email: admin.email,
                    accessToken: token,
                    role: admin.role,
                }
            });
        });
};