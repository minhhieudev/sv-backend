const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Meta = db.meta;

exports.getMetaCodes = (req, res) => {
  const metaCodes = Meta.getMetaCodes()
  return res.status(200).json({ code: 'success', data: metaCodes });
};

exports.all = (req, res) => {
    Meta.find({}).sort({ created: -1 }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        if (info) {
            res.status(200).json({ code: 'success', data: info });
            return;
        }
    });
};

exports.detail = (req, res) => {
    Meta.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(200).json({ code: 'success', data: info });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy thông tin' });
        }
    });
};

exports.add = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Meta.findOne({
        code: req.body.code
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            Meta.findOne({
                slug: req.body.slug
            }).exec((err, info) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err.message });
                    return;
                }
                if (info) {
                    res.status(400).json({ code: 'error', msg: "Đường dẫn đã đã tồn tại" });
                    return;
                } else {
                    const meta = new Meta({
                        title: req.body.title,
                        code: req.body.code,
                        slug: req.body.slug,
                        is_multi_value: req.body.is_multi_value,
                        show_in_product_page: req.body.show_in_product_page,
                    });
                    meta.save((err, meta) => {
                        if (err) {
                            res.status(500).json({ code: 'error', msg: err });
                            return;
                        }
                        res.status(200).json({ code: 'success', msg: "Thêm thành công", data: meta });
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
    Meta.findOne({
        code: req.body.code
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info && info._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            Meta.findOne({
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
                        code: req.body.code,
                        slug: req.body.slug,
                        is_multi_value: req.body.is_multi_value,
                        show_in_product_page: req.body.show_in_product_page,
                    };

                    const filter = { _id: req.params.id };
                    Meta.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
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
    Meta.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Meta.findByIdAndDelete(req.params.id, function(err, info) {
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