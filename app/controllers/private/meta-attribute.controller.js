const { body, validationResult } = require('express-validator');
const db = require("../../models");
const MetaAttribute = db['meta-attribute'];

exports.getCollection = async (req, res) => {
    const rs = await getCollection('meta-attribute', req.body)
    res.json(rs)
}

exports.all = (req, res) => {
   MetaAttribute.find({}).sort({ created: -1 }).exec((err, info) => {
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
    MetaAttribute.findById(req.params.id).exec((err, info) => {
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
    const meta = new MetaAttribute({
        meta_code: req.body.meta_code,
        value: req.body.value,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        seo_title: req.body.seo_title,
        seo_description: req.body.seo_description,
        status: req.body.status,
    });
    meta.save((err, meta) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        res.status(200).json({ code: 'success', msg: "Thêm thành công", data: meta });
    });
};

exports.edit = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }
    const upsertData = {
      meta_code: req.body.meta_code,
      value: req.body.value,
      slug: req.body.slug,
      content: req.body.content,
      image: req.body.image,
      seo_title: req.body.seo_title,
      seo_description: req.body.seo_description,
      status: req.body.status,
    };

    const filter = { _id: req.params.id };
    MetaAttribute.findOneAndUpdate(filter, upsertData, { new: false, upsert: true }, (err) => {
        if (err) {
            res.status(400).json({ code: 'error', msg: err.message });
        } else {
            res.status(200).json({ code: 'success', msg: 'Nội dung đã được cập nhật' });
        }
    });
};

exports.delete = (req, res) => {
    MetaAttribute.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            MetaAttribute.findByIdAndDelete(req.params.id, function(err, info) {
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