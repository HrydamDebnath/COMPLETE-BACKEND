const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_PUBLIC_KEY,
    privateKey: process.env.IMAGE_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_URL_ENDPOINT,
});

async function uploadFile(buffer) {
    const result = await imagekit.upload({
        file: buffer,
        fileName: "music_" + Date.now(),
        folder: "/complete_backend/music",
    });

    return result;
}

module.exports = { uploadFile };