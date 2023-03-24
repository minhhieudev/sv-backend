var express = require('express');
const app = express();

app.post("/match", async function (req, res) {
  let path = req.body.path
  let pagination = { current_page: 1 }

  if (req.body.pagination && req.body.pagination.current_page) {
    pagination.current_page = req.body.pagination.current_page
  }
  
  let product = await db.product.findOne({ slug: path })
  if (product) {
    const metas = await db.meta.find({ show_in_product_page: true })
    const metaAttCodes = metas.map(meta => ({ path: `meta_${meta.code}`, strictPopulate: false }))

    product = await product.populate(metaAttCodes)

    if (product.meta_paring) {
      await product.populate({ path: 'meta_paring', select: 'image slug value' })
    }

    product = product.toObject()
    product.price = product.price.regular

    if (product) {
      let breadcrumb = []
      let catalogs = await db.catalog.find({ _id: { $in: product.catalogs } }).sort({ parent: 1 })
      catalogs.forEach(catalog => {
        breadcrumb.push([catalog.slug, catalog.title])
      });

      if (breadcrumb.length) {
        product.breadcrumb = breadcrumb
      }

      return res.json({
        type: 'product',
        entity: product,
        metas,
        success: true
      })
    }
  }

  const cat = await db.catalog.findOne({ slug: path })
  if (cat) {
    let filter = { catalogs: { $in: [cat._id] } }
    let rs = await getCollection('product', { filter, pagination: { page_size: 16, current_page: pagination.current_page } })
    let products = rs.data

    return res.json({
      paging: { total: rs.total },
      products,
      type: 'category',
      entity: cat,
      success: true
    })
  }

  const article = await db.post.findOne({ slug: path }).populate('user')
  if (article) {
    return res.json({
      type: 'article',
      entity: article,
      success: true
    })
  }

  const articleCat = await db.category.findOne({ slug: path })
  if (articleCat) {
    let articles = await db.post.find({ categories: { $in: [articleCat._id] } }).limit(16)

    return res.json({
      type: 'article-category',
      entity: articleCat,
      articles,
      success: true
    })
  }

  path = path.split('/').pop()
  const metaAtt = await db['meta-attribute'].findOne({ slug: path })
  if (metaAtt) {
    let filter = {}
    filter['meta_' + metaAtt.meta_code] = { $in: [metaAtt._id] }
    let rs = await getCollection('product', { filter, pagination: { page_size: 16, current_page: pagination.current_page } })
    let products = rs.data

    return res.json({
      paging: { total: rs.total },
      products,
      type: 'meta',
      entity: metaAtt,
      success: true
    })
  }

  res.json({ success: false })
});

module.exports = app;