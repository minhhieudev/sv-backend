const { check } = require('express-validator');

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

let validate = {
    validateSignup,
    validateUpdate
};
module.exports = { validate };