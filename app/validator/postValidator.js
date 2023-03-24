const { check } = require('express-validator');
const db = require("../models");
const Post = db.post;
const Category = db.category;
let validateAdd = (req, res, next) => {
    return [
        check('title', 'Tên danh mục không được bỏ trống').not().isEmpty(),
        check('title', 'Tiêu đề phải từ 3 đến 255 ký tự').isLength({ min: 3, max: 255 }),
        check('slug', 'Đường dẫn không được bỏ trống').not().isEmpty(),
        check('slug', 'Đường dẫn phải từ 3 đến 255 ký tự').isLength({ min: 3, max: 255 }),
        check('categories', 'Danh mục không được bỏ trống').not().isEmpty(),
    ];

}

let checkDataAdd = (req, res, next) => {
    Post.findOne({
        title: req.body.title,
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Bài viết này đã tồn tại" });
        } else {
            Post.findOne({
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
    Post.findOne({
        title: req.body.title,
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info && info._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Bài viết này đã tồn tại" });
        } else {
            Post.findOne({
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
    // categories = req.body.categories;
    // categoryArray = categories.split(",");
    // categoryArray = [...new Set(categoryArray)]
    // var a = 0;
    // await Promise.all(categoryArray.map(async(item) => {
    //     Category.findById(item).exec((err, category) => {
    //         if (err) {
    //             a = 1;
    //         }
    //         if (!category) {
    //             a = 1;
    //         }
    //     });
    // }));
    // if (a == 1) {
    //     res.status(500).json({ code: 'error', msg: { msg: 'Danh mục không hợp lệ', param: 'categories' } });
    //     return false;
    // }
    next();
}

let validate = {
    validateAdd,
    checkDataAdd,
    checkDataEdit,
    checkCategories
};
module.exports = { validate };