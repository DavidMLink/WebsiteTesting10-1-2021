// // const ivWatchREDIRECTS = require('../../data/redirects/ivWatchRedirects.json');
// // const ivWatchREDIRECTS = require('../../data/pages/ivWatchPages.json');
// // const ivWatchREDIRECTS = require('data/pages/ivWatchPages.json');
// // console.log(ivWatchREDIRECTS)
// const fs = require("fs");
// const expectchai = require('chai').expect


// try {
//     const jsonString = fs.readFileSync('data/redirects/ivWatchRedirects.json');
//     // const jsonString = fs.readFileSync('ivWatch.json');
//     var ivwatchPages = JSON.parse(jsonString);
// } catch (err) {
//     console.log(err);
//     return;
// }

// function stripValuesJSON(json, valueToStrip) {
//     var keys = Object.keys(json);
//     keys.forEach(function (key) {
//         // THIS IS MODIFYING ORIGINAL JSON FILE. UPDATE THIS PLZ...
//         delete json[key][valueToStrip];
//     });
//     return json;
// }


// // console.log(stripedJSON)

// function json2array(json, valueToGet) {
//     var result = [];
//     var keys = Object.keys(json);
//     keys.forEach(function (key) {
//         // console.log(json[key][valueToGet])
//         result.push(json[key][valueToGet]);
//     });
//     return result;
// }

// function deleteBaseUrl(urlsToLoop) {
//     let result = urlsToLoop.map((url) => {
//         // console.log("in map function")

//         if (url.startsWith('https://www.ivwatch.com')) {
//             // console.log("executing replace method")
//             return url.replace('https://www.ivwatch.com', '')
//         }
//         if (url.startsWith('https://www2.ivwatch.com')) {
//             return url.replace('https://www2.ivwatch.com', '')
//         }
//         if (url.startsWith('https://blox.ivwatch.com')) {
//             return url.replace('https://blox.ivwatch.com', '')
//         }
//         if (url.startsWith('https://blox2.ivwatch.com')) {
//             return url.replace('https://blox2.ivwatch.com', '')
//         }
//         if (url.startsWith('https://bloxdirect.com')) {
//             return url.replace('https://bloxdirect.com', '')
//         }

//     })
//     return result
// }


// let stripedJSON = stripValuesJSON(ivwatchPages, 'Title')

// let urlsToLoop = json2array(stripedJSON, 'URLs')

// urlsToLoop = deleteBaseUrl(urlsToLoop)




// urlsToLoop.forEach((url) => {



//     describe('All Page Testing', async () => {

//         // console.log(urlsToLoop)

//         beforeEach(async function () {
//             //create database objects

//             // console.log(url)

//             console.log('hello!')

//             await browser.urlWithCookiesSet(url);
//         });


//         xit("Do all redirects work", async () => {
//             // Bring in data
//             try {
//                 const jsonString = fs.readFileSync('data/redirects/ivWatchRedirects.json');
//                 // const jsonString = fs.readFileSync('ivWatch.json');
//                 var redirects = JSON.parse(jsonString);
//             } catch (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log("REDIRECTS");
//             console.log(redirects);
//             console.log("REDIRECTS");

//             var brokenRedirects = []; // This means redirects did not get to end goal.
//             let seeBrowserURL = ''


//             let iterator1 = 0;
//             for (let index = 0; index < redirects.length; index++) {
//                 try {
//                     console.log(redirects[index]['Origin']);
//                     await browser.url(redirects[index]['Origin']);
//                     seeBrowserURL = await browser.getUrl();
//                     seeBrowserURL = seeBrowserURL.replace('https://www.ivwatch.com', '')
//                     // console.log(seeBrowserURL)
//                     // if (redirects[index]['Format'] == 'regex') {

//                     // }
//                     if (seeBrowserURL !== redirects[index]['Target']) {
//                         throw new Error;
//                         // console.log(printBrowserURL)
//                         // iterator6 += 1;
//                     }
//                     iterator1 += 1;
//                 } catch (error) {
//                     if (error) {
//                         console.log("ERROR!!!!!")
//                         brokenRedirects.push(redirects[index]['Origin'])
//                     }
//                 }
//             }

//             console.log('There are ' + brokenRedirects.length + ' Broken Redirects')
//             console.log('Broken Redirects are: ' + brokenRedirects)


//         })

//     })

// });