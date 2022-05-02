const webp = require('webp-converter');

webp.grant_permission();

export default async function jpgToWebp(inputFilepath, outputFilepath, options) {
    const result = webp.cwebp(inputFilepath, outputFilepath, options, "-v");
    result.then((response) => {
        console.log(response);
        return (response);
    })
}