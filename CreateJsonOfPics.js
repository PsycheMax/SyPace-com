const fs = require('fs');
const path = require('path');

const { ExifImage } = require('exif');

let outputFolder = path.join(__dirname, "src/components/pages/homepage/ScrollList/");
let outputFile = path.join(outputFolder, "ListOfPics.json");

let folderOfPicsPath = path.join(__dirname, "public/assets/pictures");
console.log(folderOfPicsPath)

let jsonToWrite = [];

const picturesFolder = fs.readdir(folderOfPicsPath, (err, files) => {
    if (err) {
        console.log(err);
    }
    files.forEach(foundFile => {

        let fileWithLocation = path.join(folderOfPicsPath, foundFile);
        try {
            new ExifImage(fileWithLocation, function (error, exifData) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Found!");
                    let toAdd = {
                        "uri": `assets/pictures/${foundFile}`,
                        "title": `${exifData.image.ImageDescription}`,
                        "alt": `${exifData.image.ImageDescription} by ${exifData.image.Artist}`,
                        "_id": foundFile,
                        "width": exifData.image.ImageWidth,
                        "height": exifData.image.ImageHeight,
                        "camera": exifData.image.Model
                    };
                    jsonToWrite.push(toAdd);
                    console.log(jsonToWrite);
                    fs.writeFile(outputFile, JSON.stringify(jsonToWrite), "utf-8", (err) => { console.log(err) });
                    return outputFile;

                }
            })
        } catch (error) {
            console.log("Error: " + error.message);
        }
    });

});

console.log(picturesFolder);