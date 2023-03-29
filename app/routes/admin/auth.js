const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.post("/signin", async (req, res) => {
  db.user.findOne({
    email: req.body.email
  })
    .exec((err, admin) => {
      if (err) {
        res.status(500).json({ code: 'error', msg: err });
        return;
      }
      if (!admin) {
        return res.status(401).json({ code: 'error', msg: "Không tìm thấy tài khoản." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          code: 'error',
          msg: "Tài khoản hoặc mật khẩu không đúng"
        });
      }

      const token = jwt.sign({ id: admin.id }, process.env.SECRET || 'SECRET', {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).json({
        code: 'success',
        data: {
          _id: admin._id,
          fullname: admin.fullname,
          email: admin.email,
          accessToken: token,
          role: admin.role,
        }
      });
    });
});

module.exports = app;