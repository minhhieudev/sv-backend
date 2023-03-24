const { body, validationResult } = require('express-validator');
const { catalog } = require('../../models');
const helper = require('../../helpers/website.helper');
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


exports.all = async(req, res) => {
    let condition = { status: true }
    const { name, catalog, brand, sku, barcode, abv, grape, region, location, capacity, vintage, old, rank, oak, pairing, smell } = req.query;

    if (name != undefined)
        condition.name = { '$regex': name, '$options': 'i' }

    if (catalog != undefined && catalog !== '') {
        const objectCatalog = helper.websiteHelper.stringToObject(catalog);
        condition.catalog = { $in: objectCatalog }
    }

    if (brand != undefined && brand !== '') {
        condition.brand = brand
    }
    if (sku != undefined && sku !== '') {
        condition.sku = sku
    }
    if (barcode != undefined && barcode !== '') {
        condition.barcode = barcode
    }
    if (location != undefined && location !== '') {
        condition.location = location
    }
    if (region != undefined && region !== '') {
        condition.region = region
    }
    if (abv != undefined && abv !== '') {
        condition.abv = abv
    }
    if (grape != undefined && grape !== '') {
        const objectGrape = helper.websiteHelper.stringToObject(grape);
        condition.grape = { $in: objectGrape }
    }
    if (capacity != undefined && capacity !== '') {
        condition.capacity = capacity
    }
    if (vintage != undefined && vintage !== '') {
        condition.vintage = vintage
    }
    if (old != undefined && old !== '') {
        condition.old = old
    }
    if (rank != undefined && rank !== '') {
        condition.rank = rank
    }
    if (oak != undefined && oak !== '') {
        condition.oak = oak
    }
    if (pairing != undefined && pairing !== '') {
        const objectPairing = helper.websiteHelper.stringToObject(pairing);
        condition.pairing = { $in: objectPairing }
    }
    if (smell != undefined && smell !== '') {
        const objectSmell = helper.websiteHelper.stringToObject(smell);
        condition.smell = { $in: objectSmell }
    }

    Product.find(condition, { _id: 1, name: 1, slug: 1, image: 1, "price.regular": 1, "price.sale": 1, catalog: 1 })
        .sort({ created: -1 })
        .exec((err, posts) => {
            if (err) {
                res.status(200).json({ code: 'success', data: [] });
                return;
            }
            if (posts) {
                res.status(200).json({ code: 'success', data: posts });
                return;
            }
        });
};

exports.detail = (req, res) => {
    Product.findById(req.params.id, { __v: 0 })
        .populate('catalog', '_id title slug')
        .populate('location', '_id title slug')
        .populate('region', '_id title slug')
        .populate('brand', '_id title slug')
        .populate('abv', '_id title slug')
        .populate('grape', '_id title slug')
        .populate('capacity', '_id title slug')
        .populate('vintage', '_id title slug')
        .populate('old', '_id title slug')
        .populate('rank', '_id title slug')
        .populate('oak', '_id title slug')
        .populate('pairing', '_id title slug')
        .populate('smell', '_id title slug')
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