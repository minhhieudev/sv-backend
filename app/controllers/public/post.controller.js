const { body, validationResult } = require('express-validator');

const db = require("../../models");
const Post = db.post;
const Category = db.category;
const Comment = db.comment;



exports.all = (req, res) => {
    Post.find({}, { __v: 0, category: 0, description: 0, status: 0, updated: 0, comments: 0 }).sort({ created: -1 }).exec((err, posts) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (posts) {
            res.status(200).json({ code: 'success', data: posts });
            return;
        }
    });
};

exports.detail = async(req, res) => {
    Post.findById(req.params.id, { __v: 0, status: 0 })
        .populate('category', '_id title slug')
        .populate('comments.user')
        .populate('comments', '_id user content created')
        .exec(async(err, posts) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err.message });
                return;
            }
            if (posts) {
                res.status(200).json({ code: 'success', data: posts });
                return;
            } else {
                res.status(500).json({ code: 'error', msg: 'Không tồn tại bài viết này' });
                return;
            }
        });
};

exports.add = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }

    categories = req.body.categories;
    categoryArray = categories.split(",");
    categoryArray = [...new Set(categoryArray)]

    const post = new Post({
        title: req.body.title,
        slug: req.body.slug,
        category: categoryArray,
        content: req.body.content,
        image: req.body.image,
        status: req.body.status ? req.body.status : 1,
        seo_description: req.body.description ? req.body.description : null,
    });

    post.save((err, post) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        res.status(200).json({ code: 'success', msg: "Thêm bài viết thành công" });
    });
};

exports.edit = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }

    categories = req.body.categories;
    categoryArray = categories.split(",");
    categoryArray = [...new Set(categoryArray)]

    const upsertData = {
        title: req.body.title,
        slug: req.body.slug,
        category: categoryArray,
        content: req.body.content,
        image: req.body.image,
        status: req.body.status ? req.body.status : 1,
        description: req.body.description ? req.body.description : null,
        updated: Date()
    };
    const filter = { _id: req.params.id };
    Post.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
        if (err) {
            res.status(400).json({ code: 'error', msg: err.message });
        } else {
            res.status(200).json({ code: 'success', msg: 'Bài viết đã được cập nhật' });
        }
    });
};

exports.delete = (req, res) => {
    Post.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Post.findByIdAndDelete(req.params.id, function(err, info) {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Xoá bài viết thành công' });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy bài viết này' });
        }
    });
};