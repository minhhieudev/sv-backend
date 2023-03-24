const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const logger = require('morgan');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

const methods = require('./app/helpers/methods')
global.getCollection = methods.getCollection

const db = require("./app/models");
global.db = db
global.APP_DIR = __dirname

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let monoPath = `mongodb+srv://kimtrongdev2:HUYyfu1ovSqkxJde@cluster0.vawtbzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
if (process.env.MONGO_URL) {
    monoPath = `mongodb://${process.env.MONGO_URL || 'localhost:27017'}/${process.env.MONGO_NAME || 'wl-test'}`
}
db.mongoose
    .connect(monoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Đã kết nối tới Mongodb.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// routes


app.use("/upload", express.static('public'));

app.use('/api/frontend', require('./app/api/frontend'));
app.use('/api/v1/public', require('./app/routes/public'));
app.use('/api/v1/private', require('./app/routes/private'));
app.use('*', (req, res) => {
    res.json({ status: 'error', msg: 'Not Route, call admin' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.use(logger('dev'));

app.listen(PORT, async () => {
    let adminDefaultUser = await db.admin.findOne({ email: 'test@gmail.com' })
    if (!adminDefaultUser) {
        db.admin.create({ fullname: 'test', role: 'admin', email: 'test@gmail.com', password: bcrypt.hashSync('123456789', 8) })
    }
    console.log(`Server is running on port ${PORT}.`);
});