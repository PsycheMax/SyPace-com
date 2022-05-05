# Sy-Pace.com

This is the bespoke solution I have created for a photography portfolio website. You can find it here, http://SyPace.com


## "Backend-ish solutions"

In the project directory, you can run:

### `npm run pre-build`

This command will run the PreOperations.js script. 
This script will: 

- Scan the public/assets/pictures folder for pictures and a description file for every project
- Generate a small thumbnail (via jimp) of every picture, placing it in the public/assets/thumbnails picture
- Extract the EXIF metadata from the .jpgs in the above destination
- Create a .JSON file with the picture EXIF metadata, its URI path, its "project" name, it's author (can be used, in future, for collaborative projects).
- Create a .JSON file with all the found projects' descriptions - in case they are present, they'll be used on the "Collection Page" automatically


The idea is that, instead of manually uploading dozens of pictures to a slow CMS, the art can be simply organized in numbered folders - and properly tagged with EXIF data - so that the NodeJS script can take care of showing them on the frontend in the proper order / with proper names / in the right "projects".

**The sub-folder containing pictures (numbers excluded) gives its name to the project (e.g. /public/assets/pictures/25day-out-in-the-sun becomes "Day Out In The Sun" on the website).**
