const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const router = require("./router");
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
var dbUrl = `mongodb+srv://jjmateer:${process.env.MONGO_PW}@cluster0-q0kab.mongodb.net/NYT-Scraper?retryWrites=true&w=majority`;
app.use("/", router);

mongoose.connect(dbUrl, err => {
    console.log("Connected to mongoose");
    if (err) {
        console.log(err)
    }
});


app.listen(PORT, () => {
    console.log(`Connected to port: http://localhost:${PORT}`)
})
