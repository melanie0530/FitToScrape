const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    relationID: {
        type: String,
        required: true
    },
    notebody: {
        type: String,
        required: true
    },
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;