const { check } = require('express-validator');
const db = require("../models");
const Category = db.category;

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên danh mục không được bỏ trống').not().isEmpty(),
        check('title', 'Tiêu đề phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 3 đến 20 ký tự').isLength({ min: 3, max: 20 }),
       // check('image', 'Hình ảnh không được bỏ trống').not().isEmpty()
    ];

}

let validate = {
    validateAdd
};
module.exports = { validate };