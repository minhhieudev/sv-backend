const { check } = require('express-validator');
const db = require("../models");
const Post = db.post;

let validateAdd = (req, res, next) => {
    return [
        check('_id', 'Bạn phải chọn bài viết').not().isEmpty(),
        check('content', 'Nội dung không được bỏ trống').not().isEmpty(),
        check('content', 'Nội dung bình luận phải từ 10 - 250 ký tự').isLength({ min: 10, max: 250 }),
    ];

}

let checkDataAdd = (req, res, next) => {
    Post.findById(req.body._id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (!info) {
            res.status(400).json({ code: 'error', msg: "Bài viết này không tồn tại" });
            return;
        } else {
            next();
        }
    });
}

let validate = {
    validateAdd,
    checkDataAdd
};
module.exports = { validate };