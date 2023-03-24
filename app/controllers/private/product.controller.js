const { body, validationResult } = require('express-validator');
const { catalog } = require('../../models');

const db = require("../../models");
const Product = db.product;
const Catalog = db.catalog;
const Brand = db.brand;
const Location = db.location;
const Region = db.region;
const Capacity = db.capacity;
const Abv = db.abv;
const Vintage = db.vintage;
const Rank = db.rank;
const Oak = db.oak;
const Old = db.old;
const Smell = db.smell;
const Pairing = db.pairing;

const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'products',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
};


exports.getCollection = async (req, res) => {
    const rs = await getCollection('product', req.body)
    res.json(rs)
}

exports.all = async(req, res) => {
    Product.find({}).sort({ createdAt: -1 }).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        if (info) {
            res.status(200).json({ code: 'success', data: info });
            return;
        }
    });

    // const options = {
    //     select: '_id name slug image price.regular price.sale',
    //     sort: { created: -1 },
    //     limit: 1,
    // };

    // Product.paginate(query, options, function(err, result) {
    //     res.status(200).json({ code: 'success', data: result });
    // });
};

exports.detail = (req, res) => {
    Product.findById(req.params.id, { __v: 0 })
        .exec((err, info) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err.message });
                return;
            }
            if (info) {
                res.status(200).json({ code: 'success', data: info });
                return;
            } else {
                res.status(500).json({ code: 'error', msg: 'Không tồn tại sản phẩm này' });
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

    // todo: validate
    const product = new Product(req.body);

    product.save((err, product) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        res.status(200).json({ code: 'success', msg: "Thêm sản phẩm thành công", data: { id: product._id, name: product.name } });
    });
};

exports.edit = (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) {
            res.status(400).json({ code: 'error', msg: err.message });
        } else {
            res.status(200).json({ code: 'success', msg: 'Sản phẩm đã được cập nhật' });
        }
    });
};

exports.delete = (req, res) => {
    Product.findById(req.params.id).exec((err, info) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err.message });
            return;
        }
        if (info) {
            Product.findByIdAndDelete(req.params.id, function(err, info) {
                if (err) {
                    res.status(400).json({ code: 'error', msg: err.message });
                } else {
                    res.status(200).json({ code: 'success', msg: 'Xoá sản phẩm thành công' });
                }
            });
        } else {
            res.status(400).json({ code: 'error', msg: 'Không tìm thấy bài viết này' });
        }
    });
};

exports.attr = async(req, res) => {
    // const catalogs = await Catalog.find({ status: true }, { _id: true, title: true, parent: true }).sort({ created: -1 });
    const brands = await Brand.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const locations = await Location.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const regions = await Region.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const capacities = await Capacity.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const abvs = await Abv.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const vintage = await Vintage.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const ranks = await Rank.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const oaks = await Oak.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const olds = await Old.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const smells = await Smell.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });
    const pairings = await Pairing.find({ status: true }, { _id: true, title: true }).sort({ created: -1 });

    const catalogs = await Catalog.aggregate([{
            $project: { _id: 1, title: 1, parent: 1 }
        },
        {
            $graphLookup: {
                from: 'catalogs',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parent',
                as: 'childrens'
            },
        },
        {
            $match: {
                parent: null
            }
        }
    ]);


    data = {
        catalogs: catalogs,
        brand: brands,
        location: locations,
        region: regions,
        capacity: capacities,
        abv: abvs,
        vintage: vintage,
        rank: ranks,
        oak: oaks,
        old: olds,
        smells: smells,
        pairings: pairings,
    }
    res.status(200).json({ code: 'success', data: data });
};