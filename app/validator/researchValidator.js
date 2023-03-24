const { check } = require('express-validator');

let validateAdd = (req, res, next) => {
    return [
        check('keyword', 'Từ khoá là bắt buộc').not().isEmpty(),
        check('hl', 'Ngôn ngữ là bắt buộc').not().isEmpty(),
        check('gl', 'Quốc gia là bắt buộc').not().isEmpty()
    ];
}
let validateWebsite = (req, res, next) => {
    return [
        check('url', 'Liên kết là bắt buộc').not().isEmpty()
    ];
}

let validateKeyword = (req, res, next) => {
    return [
        check('domain', 'Tên miền là bắt buộc').not().isEmpty()
    ];
}

let validate = {
    validateAdd,
    validateWebsite,
    validateKeyword
};
module.exports = { validate };