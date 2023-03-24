const express = require('express');
const app = express();


app.post("/collection", async function (req, res) {
  const rs = await getCollection('post', req.body)

  if (rs.code == 'success') {
    return res.json({ success: true, articles: rs.data, total: rs.total })
  }

  return res.json({ success: false })
})

app.get("/last-news", async function (req, res) {
  let articles = await db.post.find({}, 'image title slug').limit(5)

  return res.json({ success: true, articles })
})

app.get("/related", async function (req, res) {
  let articleID = req.query.articleID
  let mainArticle = await db.post.findOne({ _id: articleID }, 'categories')
  let articles = []

  if (mainArticle && mainArticle.categories.length) {
    articles = await db.post.find({ categories: { $in: mainArticle.categories } }, 'image title description slug').limit(3)
  }

  return res.json({ success: true, articles })
})

module.exports = app;
