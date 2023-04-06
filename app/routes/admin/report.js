
const express = require('express');
const router = express.Router();
const $ = require('../../middlewares/safe-call')

function invalidIP (req) {
  let checkInIP = req.ip.replace('::ffff:', '')
  return globalConfig.app_ip != checkInIP
}

router.post('/checkin', $(async function (req, res) {
  console.log('checkin IP: ', req.ip);

  if (invalidIP(req)) {
    return res.json({ success: true, status: 'error', message: 'Vui lòng dùng đúng mạng của cty để check in. IP: ' + globalConfig.app_ip })
  }

  db.report.create({
    user: req.user._id,
    time: req.body.time || Date.now(),
    type: db.report.REPORT_TYPE.CHECKIN
  })
  res.json({ success: true, status: 'success', message: 'Hoàn tất.' })
}))

router.post('/checkout', $(async function (req, res) {
  if (invalidIP(req)) {
    return res.json({ success: true, status: 'error', message: 'Vui lòng dùng đúng mạng của cty để check in.' })
  }

  db.report.create({
    user: req.user._id,
    time: req.body.time || Date.now(),
    type: db.report.REPORT_TYPE.CHECKOUT
  })
  res.json({ success: true, status: 'success', message: 'Hoàn tất.' })
}))

router.post('/collection', $(async function (req, res) {
  if (req.user.role != db.user.ROLES.ADMIN) {
    req.body.filter = {
      user: req.user._id
    }
  }

  req.body.populate = {
    path: 'user',
    select: 'fullname'
  }
  const rs = await getCollection('report', req.body)
  res.json(rs)
}))

module.exports = express.Router().use(router)