const { check } = require('express-validator');
const db = require("../models");

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên không được bỏ trống').not().isEmpty(),
        check('title', 'Tên phải từ 1 đến 30 ký tự').isLength({ min: 1, max: 30 }),
        check('address', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('address', 'Đường dẫn phải từ 1 đến 200 ký tự').isLength({ min: 1, max: 200 }),
    ];

}

let validate = {
    validateAdd
};
module.exports = { validate };