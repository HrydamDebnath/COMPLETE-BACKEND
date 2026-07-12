const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // <-- Changed from "user" to "User"
        required: true,
    }
});

const musicModel = mongoose.model('Music', musicSchema, 'musics');

module.exports = musicModel;