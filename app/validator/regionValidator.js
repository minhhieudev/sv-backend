const { check } = require('express-validator');
const db = require("../models");

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên không được bỏ trống').not().isEmpty(),
        check('title', 'Tên phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
        check('location', 'Quốc gia xuất xứ không hợp lệ').not().isEmpty()
    ];

}

let validate = {
    validateAdd
};
module.exports = { validate };