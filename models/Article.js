const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    notes: {
        type: Array,
        ref: "Note",
        required: false
    },
    saved: {
        type: Boolean,
        required: true,
        default:false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;