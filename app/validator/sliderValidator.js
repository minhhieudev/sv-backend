const { check } = require('express-validator');

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên không được bỏ trống').not().isEmpty(),
        check('title', 'Tên phải từ 1 đến 20 ký tự').isLength({ min: 1, max: 30 }),
        check('url', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('image', 'Hình ảnh không được bỏ trống').not().isEmpty()
    ];

}

let validate = {
    validateAdd
};
module.exports = { validate };