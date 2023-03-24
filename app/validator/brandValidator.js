const { check } = require('express-validator');
const db = require("../models");

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên không được bỏ trống').not().isEmpty(),
        check('title', 'Tên phải từ 1 đến 30 ký tự').isLength({ min: 1, max: 30 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 1 đến 30 ký tự').isLength({ min: 1, max: 30 }),
        // check('image', 'Hình ảnh không được bỏ trống').not().isEmpty()
    ];

}

let validate = {
    validateAdd
};
module.exports = { validate };