const express = require('express');
const app = express();

app.get("/attributes", async function (req, res) {
  let metaAtts = await db['meta-attribute'].find({ code: req.query.code })

  return res.json({ success: true, list: metaAtts })
})

app.get("/", async function (req, res) {
  let metas = await db.meta.find()

  return res.json({ success: true, metas })
})

app.post("/options", async function (req, res) {
  let metaCodes = req.body.codes

  try {
    let data = {}
    for await (let metaCode of metaCodes) {
      let options = await db['meta-attribute'].find({ meta_code: metaCode }).sort({ value: 1 })
      data[metaCode] = options.map(i => ({ value: i._id, label: i.value }))
    }
    return res.json({ success: true, data })
  } catch (error) {
    console.log(error);
  }

  return res.json({ success: false })
})

module.exports = app;
