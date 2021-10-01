const ivWatchPAGES = require('./data/pages/ivWatchPages.json');
const ivWatchPOSTS = require('./data/posts/ivWatchPosts.json');
const jsonConcat = require('json-concat');

// COMBINE JSON POST AND PAGE FILES

// an array of filenames to concat
const files = [];

// const theDirectory = __dirname; // or whatever directory you want to read
// fs.readdirSync(theDirectory).forEach((file) => {
// you may want to filter these by extension, etc. to make sure they are JSON files
files.push(ivWatchPAGES);
files.push(ivWatchPOSTS);
// })

// pass the "files" to json concat
jsonConcat({
    src: files,
    dest: "./result.json"
}, function (json) {
    console.log(json);
});

// END OF COMBINE JSON POST AND PAGE FILES

// GET DATA                 (Not Manually) (Especially for images.. No way, to remember what images were used...)
// RUN TESTS WITH DATA

// See if you can open wp-cli and run a plugin / query to get all that data. That would be nice.

// Get all media (attachment) urls

// Clean up media urls (extra responsive urls should be deleted...)