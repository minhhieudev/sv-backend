const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Category = db.category;



exports.all = (req, res) => {
    Category.find({}, { _id: 1, title: 1, slug: 1, image: 1 }).sort({ created: -1 }).exec((err, category) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        if (category) {
            res.status(200).json({ code: 'success', data: category });
            return;
        }
    });
};

exports.detail = (req, res) => {
    Category.findById(req.params.id).exec((err, category) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (category) {
            res.status(200).json({ code: 'success', data: category });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy danh mục này' });
        }
    });
};

exports.add = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Category.findOne({
        title: req.body.title
    }).exec((err, category) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (category) {
            res.status(400).json({ code: 'error', msg: "Tên danh mục đã tồn tại" });
            return;
        } else {
            Category.findOne({
                slug: req.body.slug
            }).exec((err, category) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err.message });
                    return;
                }
                if (category) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn đã đã tồn tại" });
                    return;
                } else {
                    const category = new Category({
                        title: req.body.title,
                        slug: req.body.slug,
                        content: req.body.content,
                        image: req.body.image,
                        seo_title: req.body.seo_title,
                        seo_description: req.body.seo_description,
                    });

                    category.save((err, category) => {
                        if (err) {
                            res.status(500).json({ code: 'error', msg: err });
                            return;
                        }
                        res.status(200).json({ code: 'success', msg: "Thêm danh mục thành công", data: category });
                    });
                }
            });
        }
    });
};

exports.edit = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Category.findOne({
        title: req.body.title
    }).exec((err, category) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (category && category._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Tên danh mục đã tồn tại" });
            return;
        } else {
            Category.findOne({
                slug: req.body.slug
            }).exec((err, category) => {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                    return;
                }
                if (category && category._id != req.params.id) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn đã đã tồn tại" });
                    return;
                } else {
                    const upsertData = {
                        title: req.body.title,
                        slug: req.body.slug,
                        content: req.body.content,
                        image: req.body.image,
                        seo_title: req.body.seo_title,
                        seo_description: req.body.seo_description,
                    };

                    const filter = { _id: req.params.id };
                    Category.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
                        if (err) {
                            res.status(400).json({ code: 'error', msg: err.message });
                        } else {
                            res.status(200).json({ code: 'success', msg: 'Danh mục đã được cập nhật' });
                        }
                    });
                }
            });
        }
    });
};

exports.delete = (req, res) => {
    Category.findById(req.params.id).sort({ created: -1 }).exec((err, category) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (category) {
            Category.findByIdAndDelete(req.params.id, function(err, category) {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Xoá danh mục thành công' });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy danh mục này' });
        }
    });
};