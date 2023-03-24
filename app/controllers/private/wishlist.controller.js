const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Wishlist = db.wishlist;
const helper = require('../../helpers/user.helper');


exports.all = (req, res) => {
    Wishlist.find({}).sort({ created: -1 }).exec((err, info) => {
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
    Wishlist.findById(req.params.id).exec((err, info) => {
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
    const userId = helper.userHelper.getUserIdLogin(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Wishlist.findOne({
        user: userId,
        product: req.body._id,
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Bạn đã yêu thích sản phẩm này trước đó" });
            return;
        } else {
            const wishlist = new Wishlist({
                user: userId,
                product: req.body._id,
                created: new Date()
            });
            wishlist.save((err, wishlist) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err });
                    return;
                }
                res.status(200).json({ code: 'success', msg: "Thêm thành công", data: wishlist });
            });
        }
    });
};

exports.delete = (req, res) => {
    Wishlist.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Wishlist.findByIdAndDelete(req.params.id, function(err, info) {
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