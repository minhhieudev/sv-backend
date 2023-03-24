const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Supplier = db.supplier;

exports.getCollection = async (req, res) => {
    const rs = await getCollection('supplier', req.body)
    res.json(rs)
}

exports.all = (req, res) => {
    Supplier.find({}).sort({ created: -1 }).exec((err, info) => {
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
    Supplier.findById(req.params.id).exec((err, info) => {
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
    Supplier.findOne({
        title: req.body.title
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            const supplier = new Supplier({
                title: req.body.title,
                address: req.body.address,
                phone: req.body.phone,
                sale: req.body.sale
            });
            supplier.save((err, supplier) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err });
                    return;
                }
                res.status(200).json({ code: 'success', msg: "Thêm thành công", data: supplier });
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
    Supplier.findOne({
        title: req.body.title
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ msg: err.message });
            return;
        }
        if (info && info._id != req.params.id) {
            res.status(400).json({ code: 'error', msg: "Tên đã tồn tại" });
            return;
        } else {
            const upsertData = {
                title: req.body.title,
                address: req.body.address,
                phone: req.body.phone,
                sale: req.body.sale,
                status: req.body.status
            };

            const filter = { _id: req.params.id };
            Supplier.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Nội dung đã được cập nhật' });
                }
            });
        }
    });
};

exports.delete = (req, res) => {
    Supplier.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Supplier.findByIdAndDelete(req.params.id, function(err, info) {
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