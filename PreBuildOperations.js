const path = require('path');
const { join, resolve } = path;
const { readdir } = require('fs').promises;
const fs = require('fs');

const { ExifImage } = require('exif');
const { imageSize } = require('image-size');
const jimp = require('jimp');

let outputFolder = join(__dirname, "src/components/pages/ScrollList/");
let outputFileName = "ListOfPics";
let outputFileExtension = ".json";
let jsonOutput = join(outputFolder, outputFileName + outputFileExtension);

let publicAssetsPicturesFolder = join(__dirname, "public", "assets", "pictures");
let publicAssetsThumbnailsFolder = join(__dirname, "public", "assets", "thumbnails");
console.log("The folder that will be scanned is the default: './public/assets/pictures'");
console.log(publicAssetsPicturesFolder)

let jsonToWrite = [];

async function createThumbnail(source, destination) {
    jimp.read(source, (err, result) => {
        if (err) throw err;
        result
            .resize(350, jimp.AUTO)
            .quality(60)
            .bu
            .write(destination, (err, value) => {
                if (err) throw err;
            })
    })
};

// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

; (async () => {
    console.log("\n\nGenerating the thumbnails, this may take up to 5 minutes depending on your machine\n\n");
    for await (const foundFileCompletePath of getFiles(publicAssetsPicturesFolder)) {
        const folderSeparator = "/";
        let indexOfFilenameSeparator = foundFileCompletePath.lastIndexOf(folderSeparator);
        const filename = foundFileCompletePath.substring(indexOfFilenameSeparator + 1, foundFileCompletePath.length);
        let indexOfFolderSeparator = foundFileCompletePath.lastIndexOf(folderSeparator, indexOfFilenameSeparator - 1);
        const folderName = foundFileCompletePath.substring(indexOfFolderSeparator + 1, indexOfFilenameSeparator);
        let decorativeFolderName = folderName.replace(/[0-9]/g, '');

        // The following TRY-CATCH snipper creates thumbnails for every picture found in the publicAssetsPicturesFolder, and places it in the publicAssetsThumbnailsFolder
        try {
            let projectThumbnailFolder = join(publicAssetsThumbnailsFolder, folderName);
            if (!fs.existsSync(projectThumbnailFolder)) {
                fs.mkdirSync(projectThumbnailFolder);
            }
            const destinationFileName = join(projectThumbnailFolder, "thumb_" + filename)
            createThumbnail(foundFileCompletePath, destinationFileName);
        } catch (error) {
            console.log(error);
        }
        try {
            new ExifImage(foundFileCompletePath, function (error, exifData) {
                if (error) {
                    console.log(error);
                } else {
                    let toAdd = {
                        "uri": `/assets/pictures/${folderName}/${filename}`,
                        "thumb_uri": `/assets/thumbnails/${folderName}/thumb_${filename}`,
                        "title": `${exifData.image.ImageDescription}`,
                        "alt": `${exifData.image.ImageDescription} by ${exifData.image.Artist}`,
                        "_id": `${filename}`,
                        "collection": `${folderName}`,
                        "decorativeCollectionName": `${decorativeFolderName}`,
                        "width": imageSize(foundFileCompletePath).width,
                        "height": imageSize(foundFileCompletePath).height
                    };
                    jsonToWrite.push(toAdd);
                    fs.writeFile(jsonOutput, JSON.stringify(jsonToWrite), "utf-8", (err) => { if (err) { console.log(err) } });
                }

            })
        } catch (error) {
            console.log(error)
        }
    }
})()
console.log("The scan is complete - a JSON file has been created at this path:");
console.log(jsonOutput);