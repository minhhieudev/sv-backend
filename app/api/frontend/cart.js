var express = require('express');
const app = express();

function getSummaryFromItems (productItems, cartItems) {
  const summary = {
    items: [],
    subtotal: 0
  }

  cartItems.forEach(cartItem => {
    let item = productItems.find(pItem => pItem._id == cartItem.id)
    if (item) {
      Object.assign(cartItem, item.toObject())
      cartItem.price = cartItem.price.regular
      cartItem.subtotal = cartItem.qty * cartItem.price
      summary.subtotal += cartItem.subtotal
    } else {
      // mark error item on cart
    }
  });

  summary.items = cartItems

  return summary
}

app.post("/add", async function (req, res) {
  
  return res.json({ success: true })
})

app.post("/update", async function (req, res) {
  
  return res.json({ success: true })
})

app.post("/load-cart-items", async function (req, res) {
  let local_cart_items = req.body.local_cart_items
  let productItems = []
  let cartItems = []

  if (local_cart_items) {
    cartItems = local_cart_items
    const pids = cartItems.map(item => item.id)
    productItems = await db.product.find({ $in: pids }).exec().catch(err => [])
  } else {
    // load cart from quote customer db
  }

  res.json({ success: true, summary: getSummaryFromItems(productItems, cartItems) })
});

app.get("/remove", async function (req, res) {

  res.json({ success: true })
});

module.exports = app;