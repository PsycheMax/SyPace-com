const path = require('path');
const { join, resolve } = path;
const { readdir } = require('fs').promises;
const fs = require('fs');

const { ExifImage } = require('exif');
const { imageSize } = require('image-size');
const jimp = require('jimp');

// This is very contingent: the output folder I decided to use is the following, along with the filenames and .json format.
const outputFolder = join(__dirname, "src/components/pages/ScrollList/");
const outputFileExtension = ".json";
const outputFileNamePictures = "ListOfPics";
const jsonPicturesOutput = join(outputFolder, outputFileNamePictures + outputFileExtension);
const outputFileNameProjectsDescription = "ProjectDescriptions";
const jsonProjectsDescriptionsOutput = join(outputFolder, outputFileNameProjectsDescription + outputFileExtension);

/* Contingent info: the "input" for this process is organized as follows
    ./public/assets/pictures contains folders for every project.
    e.g. 1Project-Name/ , 2Other-Project-Name/
    These folders can be organized (and their display order on the website) by adding a number at the beginning of their name.
    The dashes - will be treated as spaces by the frontend processes, since the folder name will be "converted" by the frontend components to a humanly readable format (with capitalization).

    This pre-build "backend-ish" process will scan the projects folders, find all the pictures it contains, extract EXIF data from them, and create a .JSON file containing their info.
    *IF a .txt file is contained in the folder (e.g. 1Project-Fancy-Name/project-fancy-name-project.txt), its content will be extracted and used as a ProjectDescription by the frontend "Collection" Components.
    The pictures will also be converted to a thumbnail (350px tall, 60% quality) to improve the website performance. The full resolution pictures will still be used on pages showing a single picture.

    In the output jsonPicturesOutput file, the most important piece of information is the "path" key:value - this helps react finding pictures in a programmatic way. 
    The website has virtually no limits on how many pictures it can show, since they'll be all converted in smaller thumbnails and loaded on the homepage. 
    Paging can be added at a later date, if and when necessary.
    
    This whole process is "easy" for the end-user:
    Every picture must be in a folder accurately named, placed in the /public/assets/pictures folder, along with an eventual .txt file containing a project description (accurately named).
*/
const publicAssetsPicturesFolder = join(__dirname, "public", "assets", "pictures");
const publicAssetsThumbnailsFolder = join(__dirname, "public", "assets", "thumbnails");
console.log("The folder that will be scanned is the default: './public/assets/pictures'");
console.log(publicAssetsPicturesFolder)

let jsonPicturesToWrite = [];
let jsonProjectsToWrite = [];

async function createThumbnail(source, destination) {
    jimp.read(source, (err, result) => {
        if (err) throw err;
        result
            .resize(350, jimp.AUTO)
            .quality(60)
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

        switch (filename.substring(filename.lastIndexOf(".") + 1)) {
            case "jpeg":
            case "jpg":
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
                            jsonPicturesToWrite.push(toAdd);
                            fs.writeFile(jsonPicturesOutput, JSON.stringify(jsonPicturesToWrite), "utf-8", (err) => { if (err) { console.log(err) } });
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
                break;

            case "txt":
                // If the filename for a .txt file found contains the string "-project" it'll be treated as a descriptor for this project. 
                // Be mindful not to use multiple .txt files in the same folder
                if (filename.includes("-project")) {
                    fs.readFile(foundFileCompletePath, "utf8", (err, data) => {
                        // To ensure that random .txt files are not used on the website, the ProjectName is inferred by the file - this way, the JSON will still be created
                        // But it will not be utilized by the frontend. It's a quick trick, but effective
                        const projectName = filename.substring(0, filename.lastIndexOf("-project"));
                        let toAdd = {
                            "project": projectName,
                            "description": data
                        }
                        jsonProjectsToWrite.push(toAdd);
                        fs.writeFile(jsonProjectsDescriptionsOutput, JSON.stringify(jsonProjectsToWrite), "utf-8", (err) => { if (err) { console.log(err) } })
                    })
                }
                break;

            default:
                // If the format is not .txt nor .jpg/.jpeg , the file is not processed and an error message is logged to the console
                console.log(`Unexpected file format found at: ${foundFileCompletePath}`)
                break;
        }
    }
})()
console.log("The scan is complete - a JSON file has been created at this path:");
console.log(jsonPicturesOutput);

// If there's not a single .txt file for descriptions, create a dummy json to avoid import issues with React
fs.readFile(jsonProjectsDescriptionsOutput, "utf8", (err, data) => {
    if (err) {
        console.log(err);
        if (err.code === "ENOENT") {
            console.log("ENOENT - the file does not exist");
            let emptyJson = { "project": "none" }
            fs.writeFile(jsonProjectsDescriptionsOutput, JSON.stringify(emptyJson), "utf-8", (err) => { if (err) { console.log(err) } });
        }
    };
})