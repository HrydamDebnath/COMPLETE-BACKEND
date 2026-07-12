const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");
const userModel = require("../models/user.model"); // Adjust path if needed

async function createMusic(req, res, next) {
    
        const { title } = req.body;
        const file = req.file;
        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            title,
            uri: result.url,
            artist:req.user.id,
        });

        return res.status(201).json({
            music: {
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist
            }
        });
    }


async function createAlbum(req, res, next) {
    
        // Correctly placed outside the authorization validation blocks
        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            musics: musics,      // Expected array of song ObjectIds
            artist:req.user.id    // Links the artist identifier from JWT
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                musics: album.musics,
                artist: album.artist
            }
        });
    } 

async function getAllMusics(req, res) {
    const musics = await musicModel.find().skip(2).limit(3).populate("artist","username email");

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    });
}

async function getAllAlbums(req, res) {
    // Explicitly select ONLY title and artist
    const albums = await albumModel.find()
        .select("title artist") 
        .populate("artist", "username email");

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums,
    });
}

async function getAlbumById(req, res) {
    const { albumId } = req.params;
    const album = await albumModel.findById(albumId)
        .populate("musics", "title uri") // Populate musics with only title and uri
        .populate("artist", "username email"); // Populate artist with username and email

    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    });
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };