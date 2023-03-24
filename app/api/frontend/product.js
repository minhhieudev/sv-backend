const express = require('express');
const app = express();

app.get("/related-products", async function (req, res) {
  const productID = req.query.productID
  let products = []
  if (productID) {
    let product = await db.product.findOne({ _id: productID }, 'catalogs')
    if (product) {
      products = await db.product.find({ _id: { $ne: product._id },catalogs: { $in: product.catalogs } }).limit(4)
    }
  }

  return res.json({ success: true, products })
})

app.post("/collection", async function (req, res) {
  // let filter = req.body.filter || {}
  // let sort = req.body.sort || {}
  // let pagination = req.body.pagination

  // let limit = 25
  // let page = 1

  // if (pagination) {
  //   if ('page_size' in pagination) {
  //     limit = pagination['page_size'];
  //   }
  //   if ('current_page' in pagination) {
  //     page = pagination['current_page'];
  //   }
  // }

  // let products = await db.product.find(filter).skip((page - 1) * limit).limit(limit).sort(sort).exec()

  let rs = await getCollection('product', req.body)
  return res.json({ success: true, products: rs.data, total: rs.total })
})

app.post("/reviewsCollection", async function (req, res) {
  let {
    product_id,
    view_mode,
    pagination
  } = req.body

  let summary = {}
  let reviews = []
  // todo : load product reviews
  return res.json({ success: true, reviews, summary, pagination })
})

module.exports = app;
