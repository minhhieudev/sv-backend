const db = require("../../models");
const Order = db.order;

exports.collection = async (req, res) => {
    let rs = await getCollection('order', req.body)
    res.json(rs)
};

exports.detail = (req, res) => {
    Order.findById(req.params.id).exec((err, doc) => {
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

exports.edit = (req, res) => {
    try {
        Order.updateOne({ _id: req.params.id },req.body, (err, doc) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }

            res.status(200).json({ code: 'success', msg: "Cập nhật thành công", data: doc });
        });
    } catch (error) {
        res.status(500).json({ code: 'error', msg: error });
    }
};
