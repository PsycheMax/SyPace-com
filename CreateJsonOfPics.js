const fs = require('fs');
const path = require('path');

let outputFolder = path.join(__dirname, "src/components/pages/homepage/ScrollList/");
let outputFile = path.join(outputFolder, "ListOfPics.json");

let folderOfPicsPath = path.join(__dirname, "public/assets/pictures");
console.log(folderOfPicsPath)

let jsonToWrite = [];

const picturesFolder = fs.readdir(folderOfPicsPath, (err, files) => {
    if (err) {
        console.log(err);
    }
    // console.log(files);
    files.forEach(foundFile => {

        // let joinedPath = path.join(folderOfPicsPath, foundFile);
        // let relativePath = path.relative(outputFolder, joinedPath);

        let toAdd = {
            "uri": `assets/pictures/${foundFile}`,
            "title": foundFile,
            "alt": `${foundFile} by Syria Pace`,
            "_id": foundFile
        };
        jsonToWrite.push(toAdd);
    });

    console.log(jsonToWrite);

    fs.writeFile(outputFile, JSON.stringify(jsonToWrite), "utf-8", (err) => { console.log(err) });
    return outputFile;
});

console.log(picturesFolder);