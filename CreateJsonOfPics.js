const { resolve, join } = require('path');
const { readdir } = require('fs').promises;
const fs = require('fs');

const { ExifImage } = require('exif');

let outputFolder = join(__dirname, "src/components/pages/homepage/ScrollList/");
let outputFileName = "ListOfPics";
let outputFileExtension = ".json";
let jsonOutput = join(outputFolder, outputFileName + outputFileExtension);

let publicAssetsPicturesFolder = join(__dirname, "public", "assets", "pictures");
console.log("The folder that will be scanned is the default: './public/assets/pictures'");
console.log(publicAssetsPicturesFolder)

let jsonToWrite = [];

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
    for await (const foundFileCompletePath of getFiles(publicAssetsPicturesFolder)) {

        const folderSeparator = "/";
        let indexOfFilenameSeparator = foundFileCompletePath.lastIndexOf(folderSeparator);
        const filename = foundFileCompletePath.substring(indexOfFilenameSeparator + 1, foundFileCompletePath.length);
        let indexOfFolderSeparator = foundFileCompletePath.lastIndexOf(folderSeparator, indexOfFilenameSeparator - 1);
        const folderName = foundFileCompletePath.substring(indexOfFolderSeparator + 1, indexOfFilenameSeparator);
        try {
            new ExifImage(foundFileCompletePath, function (error, exifData) {
                if (error) {
                    console.log(error);
                } else {
                    let toAdd = {
                        "uri": `/assets/pictures/${folderName}/${filename}`,
                        "title": `${exifData.image.ImageDescription}`,
                        "alt": `${exifData.image.ImageDescription} by ${exifData.image.Artist}`,
                        "_id": `${filename}`,
                        "collection": `${folderName}`
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