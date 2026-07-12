const express = require("express");
const { createMusic, createAlbum, getAllMusics, getAllAlbums,getAlbumById } = require("../controller/music.controller");
const multer = require('multer');

// Cleaned up import to include BOTH authArtist and authUser
// NOTE: Kept "middlewires" to match your folder structure, but check for the typo note below!
const { authArtist, authUser } = require("../middlewires/auth.middleware");

// 1. Configure multer to store files temporarily in memory as a buffer
const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

// Summary:
// router.post("/upload") is the terminal gate.
// authArtist is the security guard checking your credentials.
// upload.single("music") is the security scanner that safely checks your luggage.
// createMusic is the captain who flies it to the cloud.

router.post("/upload", authArtist, upload.single("music"), createMusic);

router.post("/album", authArtist, createAlbum);

// authUser is now successfully defined and will not crash the app!
router.get("/", authUser, getAllMusics);

router.get("/albums", authUser,getAllAlbums); 

router.get("/albums/:albumId",authUser,getAlbumById); 

module.exports = router;