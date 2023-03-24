const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  name: String,
  sku: { type: String, required: true, min: 1 },
  qty: { type: Number, required: true, min: 1 },
  price: { type: 'Number', required: true, min: 0 }
})

const orderSchema = new mongoose.Schema({
  id: { type: String },
  shipping: { type: Object },
  customer_email: { type: String },
  order_items: [orderItemSchema],
  subtotal_price: { type: 'Number', min: 0, default: 0 }, // sum of product item
  payment_type: { type: String },// cash, transfer
  status: { type: String, enum: ['hold', 'confirmed', 'shipped', 'complete'] }, //Tạm giữ, đã xác nhận, đã gửi hàng, đã giao
  remote_ip: String,
})

orderSchema.set('timestamps', true)

orderSchema.pre('save', async function () {
  if (!this.id) {
    const total = await db.order.countDocuments()
    this.id = "WL-" + (1000 + total + 1)
  }
})

const Order = mongoose.model(
    "order",
    orderSchema
);

module.exports = Order;