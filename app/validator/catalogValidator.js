const { check } = require('express-validator');
const db = require("../models");
const Catalog = db.catalog;
var ObjectId = require('mongoose').Types.ObjectId;

let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên không được bỏ trống').not().isEmpty(),
        check('title', 'Tên phải từ 1 đến 20 ký tự').isLength({ min: 1, max: 30 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 1 đến 30 ký tự').isLength({ min: 1, max: 30 }),
        // check('image', 'Hình ảnh không được bỏ trống').not().isEmpty()
    ];

}

let checkParent = (req, res, next) => {
    parent = req.body.parent;
    if (parent != undefined) {
        if (ObjectId.isValid(parent)) {
            Catalog.findById(parent).exec((err, info) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err.message });
                    return;
                }
                if (info) {
                    next();
                } else {
                    res.status(400).json({ code: 'error', msg: "Danh mục cha không hợp lệ" });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: "Danh mục cha không hợp lệ" });
        }
    } else {
        next();
    }
}

let validate = {
    validateAdd,
    checkParent
};
module.exports = { validate };