const { body, validationResult } = require('express-validator');
const helper = require('../../helpers/user.helper');
const mongoose = require('mongoose');
const db = require("../../models");
const Cart = db.cart;
const Product = db.product;



exports.all = async(req, res) => {
    const userId = helper.userHelper.getUserIdLogin(req);

    Cart.findOne({ user: userId }, { _id: 1, product: 1 })
        .populate('product.item', '_id name slug price.regular price.sale')
        .exec(async(err, info) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }
            if (info) {
                const total = await Cart.aggregate(
                    [{
                            $match: {
                                _id: info._id
                            }
                        },
                        {
                            $project: {
                                count: {
                                    $sum: '$product.quanty'
                                }
                            }
                        }
                    ]);
                totalProduct = total[0].count;
                const data = {
                    _id: info._id,
                    total: totalProduct,
                    products: info.product,
                }
                res.status(200).json({ code: 'success', data: data });
            } else {
                res.status(200).json({ code: 'error', msg: 'Không có giỏ hàng' });
            }
        });
};

exports.add = async(req, res) => {
    const userId = helper.userHelper.getUserIdLogin(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Cart.findOne({
        user: userId
    }).exec(async(err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            //Đã có giỏ hàng, tiến hành thêm sản phẩm hoặc cập nhật số lượng
            const total = await Cart.find({
                _id: info._id,
                "product.item": req.body._id,
            }).count();

            if (total > 0) {
                if (req.body.quanty > 0) {
                    db.cart.updateOne({
                        _id: info._id,
                        "product.item": req.body._id
                    }, {
                        $set: {
                            "product.$.item": req.body._id,
                            "product.$.quanty": req.body.quanty,
                            "product.$.updated": new Date(),
                            updated: new Date(),
                        }
                    }).exec();
                } else {
                    db.cart.updateOne({
                        _id: info._id
                    }, {
                        $pull: {
                            "product": { _id: req.body._id }
                        }
                    }).exec();
                }

                res.status(200).json({ code: 'success', msg: "Giỏ hàng đã được cập nhật" });

            } else {
                if (req.body.quanty > 0) {
                    db.cart.updateOne({
                        _id: info._id
                    }, {
                        $set: {
                            updated: new Date()
                        },
                        $push: {
                            product: {
                                item: req.body._id,
                                quanty: req.body.quanty,
                                created: new Date(),
                                updated: null
                            }
                        }
                    }).exec();
                    res.status(200).json({ code: 'success', msg: "Giỏ hàng đã được cập nhật" });
                } else {
                    res.status(500).json({ code: 'error', msg: "Số lượng không hợp lệ" });
                }
            }

        } else {
            if (req.body.quanty > 0) {
                const cart = new Cart({
                    user: userId,
                    product: {
                        item: req.body._id,
                        quanty: req.body.quanty,
                        created: new Date()
                    }
                });
                cart.save((err, cart) => {
                    if (err) {
                        res.status(500).json({ code: 'error', msg: err });
                        return;
                    } else {
                        res.status(200).json({ code: 'success', msg: "Thêm giỏ hàng thành công" });
                    }
                });
            } else {
                res.status(500).json({ code: 'error', msg: "Số lượng không hợp lệ" });
            }
        }
    });
};


exports.delete = (req, res) => {
    const userId = helper.userHelper.getUserIdLogin(req);
    Cart.findOne({
        user: userId
    }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            console.log(info)
            Cart.findByIdAndDelete(info._id, function(err, info) {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Xoá thành công' });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: 'Bạn không thể xoá giỏ hàng này' });
        }
    });
};