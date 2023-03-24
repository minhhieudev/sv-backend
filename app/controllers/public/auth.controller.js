const config = require("../../config/auth.config");
const db = require("../../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({ code: 'error', msg: errors.array()[0] });
        return;
    }

    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).json({ code: 'error', msg: err });
            return;
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 864000 // 24 hours
        });

        var refreshToken = jwt.sign({ id: user.id, }, config.refreshSecret, { expiresIn: '10d' });
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        const data = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            verify: user.vefiry,
            accessToken: token,
            role: user.role,
            refreshToken: refreshToken,
        }
        res.json({ code: 'success', msg: "Đăng ký tài khoản thành công", user: data });
    });
};

exports.signin = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).json({ code: 'error', msg: err });
                return;
            }

            if (!user) {
                return res.status(401).json({ code: 'error', msg: "Tài khoản hoặc mật khẩu không đúng" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).json({
                    code: 'error',
                    msg: "Tài khoản hoặc mật khẩu không đúng"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var refreshToken = jwt.sign({ id: user.id, }, config.refreshSecret, { expiresIn: '10d' });
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                code: 'success',
                data: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    verify: user.vefiry,
                    accessToken: token,
                    role: user.role,
                    refreshToken: refreshToken,
                }
            });
        });
};

// exports.refresh = (req, res) => {
//     if (req.cookies.jwt) {
//         const refreshToken = req.cookies.jwt;
//         jwt.verify(refreshToken, config.refreshSecret,
//             (err, decoded) => {
//                 if (err) {
//                     return res.status(406).json({ code: 'error', msg: 'Unauthorized' });
//                 } else {
//                     const accessToken = jwt.sign({
//                         username: userCredentials.username,
//                         email: userCredentials.email
//                     }, process.env.ACCESS_TOKEN_SECRET, {
//                         expiresIn: '10m'
//                     });
//                     return res.json({ accessToken });
//                 }
//             })
//     } else {
//         return res.status(406).json({ code: 'error', msg: 'Unauthorized' });
//     }
// };