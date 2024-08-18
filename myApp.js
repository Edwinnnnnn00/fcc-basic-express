let express = require('express');
const req = require('express/lib/request');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();


app.use((req, res, next) => {
    msg = req.method + " " + req.path + " - " + req.ip;
    console.log(msg);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    // res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
})

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({ "message": "HELLO JSON" });
    } else {
        res.json({ "message": "Hello json" });
    }
})

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({ time: req.time });
})

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word });
})

app.route("/name").get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
}).post((req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
})

module.exports = app;