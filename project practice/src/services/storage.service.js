const ImageKit = require("@imagekit/nodejs"); //  Change this line


const imagekit = new ImageKit({

    privateKey:process.env.IMAGE_PRIVATE_KEY,
    publicKey:process.env.IMAGE_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGE_URL_ENDPOINT

})

async function uploadFile(buffer) {

    console.log(buffer);
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    });
    return result;

}
module.exports = uploadFile