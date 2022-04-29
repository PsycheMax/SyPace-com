export default function convertNameToReadable(toConvert) {
    let toReturn = "";
    if (toConvert) {
        toReturn = toConvert;
        while (toReturn.indexOf("-") !== -1) {
            toReturn = toReturn.replace("-", " ");
        }
        toReturn = toReturn.replace(toReturn[0], toReturn[0].toUpperCase());
        let firstSpace = toReturn.indexOf(" ");
        let substring = toReturn.substring(firstSpace);
        while (substring.includes(" ")) {
            firstSpace = substring.indexOf(" ");
            if (firstSpace !== -1) {
                substring = substring.substring(firstSpace + 1);
                let lowcaseSubstring = substring;
                substring = substring.replace(substring[0], substring[0].toUpperCase());
                toReturn = toReturn.replace(lowcaseSubstring, substring);
            }
        }
    }
    return toReturn;
}