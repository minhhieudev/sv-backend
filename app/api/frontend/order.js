const express = require('express');
const app = express();

app.get("/:id", async function (req, res) {
  let orderID = req.params.id
  if (orderID) {
    let order = await db.order.findOne({ _id: orderID })
    if (order) {
      return res.json({ success: true, order })
    }
  }

  return res.json({ success: false })
})

app.post("/", async function (req, res) {
  let orderData = req.body

  try {
    let orderItemsCheck = []
    const orderItemIds = orderData.order_items.map(item => item.id)
    let products = await db.product.find({ _id: { $in: orderItemIds } })
    let subtotal_price = 0
    products.forEach(product => {
      let cartItem = orderData.order_items.find(item => item.id == product._id)
      if (cartItem) {
        subtotal_price += product.price.regular * cartItem.qty
        orderItemsCheck.push({
          product: product._id,
          name: product.name,
          sku: product.sku,
          qty: cartItem.qty,
          price: product.price.regular
        })
      }
    });

    orderData.order_items = orderItemsCheck
    orderData.status = 'hold'
    orderData.subtotal_price = subtotal_price

    let order = await db.order.create(orderData)
    if (order) {
      return res.json({
        success: true,
        order
      })
    }
  } catch (error) {
    return res.json({ success: false, status: 'error', message: error.message })
  }
})

module.exports = app;
