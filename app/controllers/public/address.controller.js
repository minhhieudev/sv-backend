const fs = require('fs');
const { body, validationResult } = require('express-validator');
const db = require("../../models");
const address = require("../../assets/address.json");
const Abv = db.abv;



exports.address = (req, res) => {
    // const addressFile = '../../assets/address.json';
    // let rawdata = fs.readFileSync(addressFile);
    // let address = JSON.parse(rawdata);
    let a = address.filter(function(b) {
        return b.code = 1;
    })
    res.json(a);
};