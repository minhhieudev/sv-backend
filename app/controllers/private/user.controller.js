const db = require("../../models");
const User = db.user;
const bcrypt = require("bcryptjs");

exports.getCollection = async (req, res) => {
    const rs = await getCollection('user', req.body)
    res.json(rs)
}

exports.all = (req, res) => {
    User.find({}).exec((err, doc) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        if (doc) {
            res.status(200).json({ code: 'success', data: doc });
            return;
        }
    });
};

exports.detail = (req, res) => {
    User.findById(req.params.id).exec((err, doc) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }

        if (doc) {
            res.status(200).json({ code: 'success', data: doc });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy' });
        }
    });
};

exports.add = (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 8)
        }

        User.create(req.body, (err, doc) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }

            res.status(200).json({ code: 'success', msg: "Thêm thành công", data: doc });
        });
    } catch (error) {
        res.status(500).json({ code: 'error', msg: error });
    }
};

exports.edit = (req, res) => {
    try {
        if (req.body.renew_password) {
            req.body.password = bcrypt.hashSync(req.body.renew_password, 8)
        }
        User.updateOne({ _id: req.params.id },req.body, (err, doc) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }

            res.status(200).json({ code: 'success', msg: "Thêm thành công", data: doc });
        });
    } catch (error) {
        res.status(500).json({ code: 'error', msg: error });
    }
};

exports.delete = (req, res) => {
    try {
        User.deleteOne({ _id: req.params.id }, (err, doc) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }

            res.status(200).json({ code: 'success', msg: "Xóa thành công", data: doc });
        });
    } catch (error) {
        res.status(500).json({ code: 'error', msg: error });
    }
};