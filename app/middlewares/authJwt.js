const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Admin = db.admin;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ code: 'error', message: "Bạn không có quyền truy cập" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ code: 'error', message: "Bạn không có quyền truy cập" });
        }
        req.userId = decoded.id;
        next();
    });
};

verifyRoleAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ code: 'error', message: "Bạn không có quyền truy cập" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ code: 'error', message: "Bạn không có quyền truy cập" });
        }
        var userId = decoded.id;
        req.userId = userId;
        User.findById(userId)
            .exec((err, user) => {
                req.user = user
                next();
            });


    });
};

const authJwt = {
    verifyToken,
    verifyRoleAdmin
};
module.exports = authJwt;