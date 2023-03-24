const { check } = require('express-validator');
const db = require("../models");
const Project = db.project;
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");

let validateAdd = (req, res, next) => {
    // let token = req.headers["x-access-token"];
    return [
        check('name', 'Tên dự án là bắt buộc').not().isEmpty(),
        check('website', 'Website không đúng định dạng').not().isEmpty(),
        check('hl', 'Bạn chưa chọn quốc gia').not().isEmpty(),
        check('gl', 'Bạn chưa chọn ngôn ngữ').not().isEmpty(),
    ];
}

let checkDuplicate = (req, res, next) => {
    let token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    var userId = decoded.id

    Project.findOne({
        name: req.body.name,
        user: userId
    }).exec((err, project) => {
        if (err) {
            res.status(500).json({ msg: err });
            return;
        }
        if (project) {
            res.status(400).json({ code: 'error', msg: "Tên dự án đã tồn tại, vui lòng đặt tên mới" });
            return;
        }
        // Website
        Project.findOne({
            website: req.body.website,
            user: userId
        }).exec((err, project) => {
            if (err) {
                res.status(500).json({ message: err });
                return;
            }
            if (project) {
                res.status(400).json({ code: 'error', msg: "Bạn đã thêm website này ở dự án khác" });
                return;
            }
            next();
        });
    });
}




let validate = {
    validateAdd,
    checkDuplicate
};


module.exports = { validate };