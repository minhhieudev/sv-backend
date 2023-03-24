const { check } = require('express-validator');
const db = require("../models");
const Product = db.product;

let validateAdd = (req, res, next) => {
    return [
        check('_id', 'Bạn chưa chọn sản phẩm').not().isEmpty(),
        check('_id', 'Sản phẩm không hợp lệ').isMongoId(),
    ];
}

let checkDataAdd = (req, res, next) => {
    Product.findById(req.body._id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (!info) {
            res.status(400).json({ code: 'error', msg: "Sản phẩm này không tồn tại" });
            return;
        } else {
            next();
        }
    });
}

let validate = {
    validateAdd,
    checkDataAdd
};
module.exports = { validate };