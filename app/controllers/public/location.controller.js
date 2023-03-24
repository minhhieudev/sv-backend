const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Location = db.location;



exports.all = (req, res) => {
    Location.find({}).sort({ created: -1 }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err });
            return;
        }
        if (info) {
            res.status(200).json({ code: 'success', data: info });
            return;
        }
    });
};

exports.detail = (req, res) => {
    Location.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(200).json({ code: 'success', data: info });
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
    Location.findOne({
        title: req.body.title
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            Location.findOne({
                slug: req.body.slug
            }).exec((err, info) => {
                if (err) {
                    res.status(500).json({ msg: err.message });
                    return;
                }
                if (info) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn đã đã tồn tại" });
                    return;
                } else {
                    const location = new Location({
                        title: req.body.title,
                        slug: req.body.slug,
                        content: req.body.content,
                        image: req.body.image,
                        seo_title: req.body.seo_title,
                        seo_description: req.body.seo_description,
                    });
                    location.save((err, location) => {
                        if (err) {
                            res.status(500).json({ code: 'error', msg: err });
                            return;
                        }
                        res.status(200).json({ code: 'success', msg: "Thêm thành công", data: location });
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
    Location.findOne({
        title: req.body.title
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info && info._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            Location.findOne({
                slug: req.body.slug
            }).exec((err, info) => {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                    return;
                }
                if (info && info._id != req.params.id) {
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
                    Location.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
                        if (err) {
                            res.status(400).json({ code: 'error', msg: err.message });
                        } else {
                            res.status(200).json({ code: 'success', msg: 'Nội dung đã được cập nhật' });
                        }
                    });
                }
            });
        }
    });
};

exports.delete = (req, res) => {
    Location.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Location.findByIdAndDelete(req.params.id, function(err, info) {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Xoá thành công' });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy nội dung này' });
        }
    });
};