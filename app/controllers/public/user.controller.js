const { body, validationResult } = require('express-validator');
const db = require("../../models");
const User = db.user;
const Checkout = db.checkout;
const helper = require("../../helpers/user.helper.js");
var bcrypt = require("bcryptjs");


exports.userInfo = (req, res) => {
    let userId = helper.userHelper.getUserIdLogin(req);
    User.findById(userId, { __v: 0, created: 0, status: 0, role: 0, password: 0, _id: 0 }, function(err, user) {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
        } else {
            res.status(200).json({ code: 'success', data: user });
        }
    });
};

exports.updateInfo = (req, res) => {
    let userId = helper.userHelper.getUserIdLogin(req);
    User.findById(userId, function(err, user) {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        } else {
            const upsertData = {
                fullname: req.body.fullname,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
            };

            if (req.body.password != undefined && req.body.password != "")
                upsertData.password = bcrypt.hashSync(req.body.password, 8)

            User.findOneAndUpdate({ _id: userId }, upsertData, { new: false, upsert: true }, (err) => {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Thông tin tài khoản đã được cập nhật' });
                }
            });
        }
    });
};

exports.historyOrder = (req, res) => {
    let userId = helper.userHelper.getUserIdLogin(req);
    Checkout.find({ user: userId }).sort({ created: -1 }).exec((err, info) => {
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