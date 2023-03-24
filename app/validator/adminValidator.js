const { check } = require('express-validator');
const db = require("../models");
const Admin = db.admin;
let validateSignup = (req, res, next) => {
    return [
        check('fullname', 'Họ tên là bắt buộc').not().isEmpty(),
        check('fullname', 'Họ tên phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
        check('email', 'Email là bắt buộc').not().isEmpty(),
        check('email', 'Email không hợp lệ').isEmail(),
        check('password', 'Mật khẩu phải ít nhất có 6 ký tự').isLength({ min: 6 })
    ];
}

let validateUpdate = (req, res, next) => {
    return [
        check('fullname', 'Họ tên là bắt buộc').not().isEmpty(),
        check('fullname', 'Họ tên phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
        check('email', 'Email là bắt buộc').not().isEmpty(),
        check('email', 'Email không hợp lệ').isEmail()
    ];
}

checkDuplicateEmail = (req, res, next) => {
    Admin.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ code: 'error', msg: err });
            return;
        }
        if (user) {
            res.status(400).send({ code: 'error', msg: { msg: "Email này đã được sử dụng", param: "email" } });
            return;
        }
        next();
    });
};

let validate = {
    validateSignup,
    validateUpdate,
    checkDuplicateEmail
};
module.exports = { validate };