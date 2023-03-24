const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Comment = db.comment;
const Post = db.post;
const helper = require('../../helpers/user.helper');


exports.all = (req, res) => {
    Comment.find({}).sort({ created: -1 }).exec((err, info) => {
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

exports.add = (req, res) => {
    const userId = helper.userHelper.getUserIdLogin(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    Comment.findOne({
        user: userId,
        content: req.body.content,
        post: req.body._id,
    }).exec(async(err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            res.status(400).json({ code: 'error', msg: "Bạn đã gửi bình luận này trước đó" });
            return;
        } else {
            const comment = new Comment({
                user: userId,
                post: req.body._id,
                content: req.body.content,
                created: new Date()
            });
            const commentData = await comment.save();
            const post = await Post.findById(req.body._id);
            post.comments.push(commentData._id);
            post.save(async(err, info) => {
                if (err) {
                    res.status(500).json({ code: 'error', msg: err });
                    return;
                } else {
                    res.status(200).json({ code: 'success', msg: "Thêm thành công", data: info._id });
                }
            });
            // comment.save(async(err, info) => {
            //     if (err) {
            //         res.status(500).json({ code: 'error', msg: err });
            //         return;
            //     } else {
            //         res.status(200).json({ code: 'success', msg: "Thêm thành công", data: info });
            //     }
            // });
        }
    });
};

exports.delete = (req, res) => {
    Comment.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Comment.findByIdAndDelete(req.params.id, function(err, info) {
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