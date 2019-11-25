const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const url = require('url');
const adr = 'http://localhost:8080';
const q = url.parse(adr, true);

exports.home = function (req, res) {
    db.Article.find({}).limit(10)
        .then(function (results) {
            res.render("index", { data: results })
        })
        .catch(function (err) {
            res.json(err);
        });
}
exports.scrape = function (req, res) {
    axios.get("https://www.nytimes.com/section/world").then(function (response) {
        var $ = cheerio.load(response.data);
        $("article div").each(function (i, element) {
            var result = {};
            result.title = $(this)
                .children("h2")
                .children("a")
                .text()
            result.link = `https://www.nytimes.com${$(this)
                .children("h2")
                .children("a")
                .attr('href')}`
            result.summary = $(this)
                .children("p"[0])
                .text()
            db.Article.create(result)
                .then(function (dbArticle) {
                    // console.log(dbArticle);
                })
                .catch(function (err) {
                    // console.log(err);
                });
        });
    }).then(() => {
        res.redirect("back")
    })
}
exports.getOne = function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
}

exports.postNote = function (req, res) {
    // console.log(req.body.messagedata)
    // console.log(req.params.id)
    db.Note.create({ relationID: req.params.id, notebody: req.body.messagedata })
        .then((dbNote) => {
            console.log(dbNote)
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote.notebody } }, { new: true });
        })
        .then(() => {
            res.redirect("back")
        })
        .catch((err) => {
            res.json(err)
        })
}

exports.clearNotes = function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { notes: [] } }, { new: true })
    .then(() => {
        res.redirect("back")
    })
}

exports.notearchive = function (req, res) {
    res.render("note-archive")
}
exports.getoldnotes = function (req, res) {
    db.Note.find({relationID: req.params.id})
    .then(function (results) {
        console.log(results)
        res.render("note-archive", { data: results })
    })
}

exports.save = function (req, res) {
    console.log(req.params.id)
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } })
        .then(() => {
            res.redirect("back")
        })
        .catch(function (err) {
            res.json(err)
        })
}

exports.delete = function (req, res) {
    console.log(req.params.id)
    db.Article.updateOne({ _id: req.params.id }, { $set: { saved: false } })
        .then(() => {
            res.redirect("back")
        })
        .catch(function (err) {
            res.json(err)
        })
}

exports.saved = function (req, res) {
    db.Article.find({ saved: true }).limit(30)
        .then(function (results) {
            res.render("saved", { data: results })
        }).catch(function (err) {
            res.json(err);
        });
}
exports.clear = function (req, res) {
    db.Article.deleteMany()
        .then(() => {
            res.redirect("back")
        })
}