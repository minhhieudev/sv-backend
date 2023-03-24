const { check } = require('express-validator');
const db = require("../models");
const Product = db.product;

let validateAdd = (req, res, next) => {
    return [
        check('_id', 'Bạn phải chọn sản phẩm').not().isEmpty(),
        check('quanty', 'Số lượng phải là số tự nhiên').isNumeric(),
        check('quanty', 'Số lượng phải nhỏ hơn 100').isInt({ min: 0, max: 100 }),
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