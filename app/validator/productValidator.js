const { check } = require('express-validator');
const db = require("../models");
const Product = db.product;
const Catalog = db.catalog;
let validateAdd = (req, res, next) => {
    return [
        check('name', 'Tên sản phẩm không được bỏ trống').not().isEmpty(),
        check('name', 'Tên sản phẩm phải từ 3 đến 255 ký tự').isLength({ min: 3, max: 255 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 3 đến 255 ký tự').isLength({ min: 3, max: 255 }),
        check('catalogs', 'Danh mục không được bỏ trống').not().isEmpty(),
        check('sku', 'Mã sản phẩm không được bỏ trống').not().isEmpty(),
        check('price.regular', 'Giá bán không được bỏ trống').not().isEmpty(),
        check('price.regular', 'Giá bán phải là số').isNumeric(),
        check('price.cost', 'Giá nhập không được bỏ trống').not().isEmpty(),
        check('price.cost', 'Giá nhập phải là số').isNumeric(),
    ];
}

let checkDataAdd = (req, res, next) => {
    Product.findOne({
        name: req.body.name,
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Sản phẩm này đã tồn tại" });
        } else {
            Product.findOne({
                slug: req.body.slug,
            }).exec((err, info) => {
                if (err) {
                    res.status(500).json({ msg: err.message });
                    return;
                }
                if (info) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn này đã tồn tại" });
                    return;
                }
                next();
            });
        }
    });
}

let checkDataEdit = (req, res, next) => {
    Product.findOne({
        name: req.body.name,
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info && info._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Sản phẩm này đã tồn tại" });
        } else {
            Product.findOne({
                slug: req.body.slug,
            }).exec((err, info) => {
                if (err) {
                    res.status(500).json({ msg: err.message });
                    return;
                }
                if (info && info._id != req.params.id) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn này đã tồn tại" });
                    return;
                }
                next();
            });
        }
    });
}

let checkCategories = async(req, res, next) => {
    catalogs = req.body.catalogs;

    catalogArray = [...new Set(catalogs)]
    // var a = 0;
    // await Promise.all(catalogArray.map(async(item) => {
    //     await Catalog.findById(item).exec(async(err, catalog) => {
    //         if (err) {
    //             a = 1;
    //         }
    //         if (!catalog) {
    //             a = 1
    //         }
    //     });
    // }));

    next();

    // res.status(500).json({ code: 'error', msg: { msg: 'Danh mục không hợp lệ', param: 'catalogs' } });
    //             return false;
}

let validate = {
    validateAdd,
    checkDataAdd,
    checkDataEdit,
    checkCategories
};
module.exports = { validate };