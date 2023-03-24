const { body, validationResult } = require('express-validator');
const db = require("../../models");
const Product = db.product;
const Post = db.post;
const Slider = db.slider;

exports.all = async(req, res) => {

    const sliders = await Slider.find({ status: true }).sort({ created: -1 });
    const products = await Product.find({ status: true }).sort({ created: -1 }).limit(8);
    const featured = await Product.find({ status: true, featured: true }).sort({ created: -1 }).limit(8);
    const posts = await Post.find({ status: true }).sort({ created: -1 }).limit(6);

    const newSlider = [];
    sliders.forEach(slider => {
        const sl = {
            _id: slider._id,
            title: slider.title,
            url: slider.url,
            image: slider.image
        }
        newSlider.push(sl);
    });

    const newProducts = [];
    products.forEach(product => {
        const pr = {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: {
                regular: product.price.regular,
                sale: product.price.sale,
            },
            image: product.image
        }
        newProducts.push(pr);
    });

    const newFeatured = [];
    featured.forEach(product => {
        const pr = {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: {
                regular: product.price.regular,
                sale: product.price.sale,
            },
            image: product.image
        }
        newFeatured.push(pr);
    });

    const newPost = [];
    posts.forEach(post => {
        const pr = {
            _id: post._id,
            title: post.title,
            slug: post.slug,
            image: post.image,
            content: post.content.substr(0, 180).replace(/<[^>]*>?/gm, '')
        }
        newPost.push(pr);
    });

    const data = {
        sliders: newSlider,
        products: newProducts,
        featureds: newFeatured,
        posts: newPost
    }
    res.status(200).json({ code: 'success', data: data });
};