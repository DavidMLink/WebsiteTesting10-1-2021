// const ivWatchREDIRECTS = require('../../data/redirects/ivWatchRedirects.json');
// const ivWatchREDIRECTS = require('../../data/pages/ivWatchPages.json');
// const ivWatchREDIRECTS = require('data/pages/ivWatchPages.json');
// console.log(ivWatchREDIRECTS)
const fs = require("fs");
const expectchai = require('chai').expect


try {
    const jsonString = fs.readFileSync('data/pages/ivWatchPages.json');
    // const jsonString = fs.readFileSync('ivWatch.json');
    var ivwatchPages = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
    return;
}

function stripValuesJSON(json, valueToStrip) {
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        // THIS IS MODIFYING ORIGINAL JSON FILE. UPDATE THIS PLZ...
        delete json[key][valueToStrip];
    });
    return json;
}


// console.log(stripedJSON)

function json2array(json, valueToGet) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        // console.log(json[key][valueToGet])
        result.push(json[key][valueToGet]);
    });
    return result;
}

function deleteBaseUrl(urlsToLoop) {
    let result = urlsToLoop.map((url) => {
        // console.log("in map function")

        if (url.startsWith('https://www.ivwatch.com')) {
            // console.log("executing replace method")
            return url.replace('https://www.ivwatch.com', '')
        }
        if (url.startsWith('https://www2.ivwatch.com')) {
            return url.replace('https://www2.ivwatch.com', '')
        }
        if (url.startsWith('https://blox.ivwatch.com')) {
            return url.replace('https://blox.ivwatch.com', '')
        }
        if (url.startsWith('https://blox2.ivwatch.com')) {
            return url.replace('https://blox2.ivwatch.com', '')
        }
        if (url.startsWith('https://bloxdirect.com')) {
            return url.replace('https://bloxdirect.com', '')
        }

    })
    return result
}


let stripedJSON = stripValuesJSON(ivwatchPages, 'Title')

let urlsToLoop = json2array(stripedJSON, 'URLs')

urlsToLoop = deleteBaseUrl(urlsToLoop)




urlsToLoop.forEach((url) => {



    describe('All Page Testing', async () => {

        // console.log(urlsToLoop)

        beforeEach(async function () {
            //create database objects

            // console.log(url)

            console.log('hello!')

            await browser.urlWithCookiesSet(url);
        });



        // console.log(url)

        it.only("Testing Stuff", async () => {

            console.log('is this even running?')

            // await browser.urlWithCookiesSet('/about/')

            console.log(await browser.getUrl())

            // await browser.debug()
        })





        it("Do all redirects work", async () => {
            // Bring in data
            try {
                const jsonString = fs.readFileSync('data/redirects/ivWatchRedirects.json');
                // const jsonString = fs.readFileSync('ivWatch.json');
                var redirects = JSON.parse(jsonString);
            } catch (err) {
                console.log(err);
                return;
            }
            console.log("REDIRECTS");
            console.log(redirects);
            console.log("REDIRECTS");

            var brokenRedirects = []; // This means redirects did not get to end goal.
            let seeBrowserURL = ''


            let iterator1 = 0;
            for (let index = 0; index < redirects.length; index++) {
                try {
                    console.log(redirects[index]['Origin']);
                    await browser.url(redirects[index]['Origin']);
                    seeBrowserURL = await browser.getUrl();
                    seeBrowserURL = seeBrowserURL.replace('https://www.ivwatch.com', '')
                    // console.log(seeBrowserURL)
                    // if (redirects[index]['Format'] == 'regex') {

                    // }
                    if (seeBrowserURL !== redirects[index]['Target']) {
                        throw new Error;
                        // console.log(printBrowserURL)
                        // iterator6 += 1;
                    }
                    iterator1 += 1;
                } catch (error) {
                    if (error) {
                        console.log("ERROR!!!!!")
                        brokenRedirects.push(redirects[index]['Origin'])
                    }
                }
            }

            console.log('There are ' + brokenRedirects.length + ' Broken Redirects')
            console.log('Broken Redirects are: ' + brokenRedirects)


        })
        // AM I CHECKING FOR BROKEN URLS OR STAGING URLS?
        it("Do all Page\'s hyperlinks work and load production site url", async () => {

            // Bring in data
            try {
                const jsonString = fs.readFileSync('data/pages/ivWatchPages.json');
                var pages = JSON.parse(jsonString);
                // console.log(pages)
            } catch (err) {
                console.log(err);
                return;
            }

            let failedPages = [];
            let badPage = 0;
            let checkBadPage = 0;

            for (let index = 0; index < pages.length; index++) {



                // Create Your own Function / Command on browser object
                // See if check for document.onload() and then wrap in waitUntil...



                await browser.url(pages[index]['URLs'])

                // Dont await browser.url and wrap in WaitUntil pageload complete...

                // set a single cookie
                await browser.setCookies({
                    name: 'CookieConsent',
                    value: '{stamp:%27phEim3k5y7/9st8CQvBifQpofQLlyw3wymhyZ7n/8jjJSZ5miw/9QA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1628780171191%2Cregion:%27us%27}'
                    // The below options are optional
                    // path: '/foo', // The cookie path. Defaults to "/"
                    // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context’s active document’s URL domain
                    // secure: true, // Whether the cookie is a secure cookie. Defaults to false
                    // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
                    // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
                })

                await browser.execute(() => {
                    localStorage.setItem('CookieConsentBulkSetting-ce15b3a8-25da-499a-8600-ca86068cf427', '{"resetdomains":["bloxdirect.com"],"bulkconsent":{"ticket":"phEim3k5y7/9st8CQvBifQpofQLlyw3wymhyZ7n/8jjJSZ5miw/9QA==","utc":1628780171191,"expireMonths":12,"preferences":true,"statistics":true,"marketing":true},"expireMonths":12,"serial":"ce15b3a8-25da-499a-8600-ca86068cf427"}');
                })

                await browser.url(pages[index]['URLs'])

                // await browser.pause(4000)

                // Select all urls except header + footer
                let noHeaderFooter = await $$('a:not(header a):not(footer a)');
                // Select all urls
                let anchorList = await $$('a');



                // console.log(anchorList)

                // let buttonList = await $$('button');
                let oneAnchor;
                let oneElement;
                let firstElement;

                let badURLS = [];

                // Iterate through urls
                for (let i = 0; i < noHeaderFooter.length; i++) {

                    // get specific url data from specific url ID
                    oneAnchor = await browser.getElementAttribute(noHeaderFooter[i]['elementId'], 'href')


                    // Test Cases (Also Edge Cases)
                    // oneAnchor.startsWith("https://www.ivwatch.com")
                    // oneAnchor.startsWith("https://blox.ivwatch.com")
                    // oneAnchor == '#'
                    // oneAnchor.startsWith("https://www.bloxdirect.com")


                    // CHECK FOR BROKEN URLS
                    // if (oneAnchor.startsWith("https://www.ivwatch.com") || oneAnchor.startsWith("https://blox.ivwatch.com") || oneAnchor.startsWith("#") || oneAnchor.startsWith("https://www.bloxdirect.com")) {
                    //     // Do Nothing!!
                    // }
                    // else {
                    //     failedPages.push(oneAnchor)
                    // }

                    // CHECK FOR STAGING URLS
                    if (
                        oneAnchor.startsWith("https://www2.ivwatch.com") ||
                        oneAnchor.startsWith("https://blox2.ivwatch.com") ||
                        oneAnchor.startsWith("https://www1.ivwatch.com") ||
                        oneAnchor.startsWith("https://blox1.ivwatch.com") ||
                        oneAnchor.startsWith("https://www0.ivwatch.com") ||
                        oneAnchor.startsWith("https://blox0.ivwatch.com")
                    ) {


                        // failedPages[index]["badURLS"].push(oneAnchor)
                        // failedPages.push(pages[index])
                        console.log(oneAnchor)
                        badURLS.push(oneAnchor);

                        badPage += 1;

                    }


                } //INNER FOR LOOP
                if (checkBadPage != badPage) {
                    failedPages[badPage - 1] = pages[index]
                    failedPages[badPage - 1]["badURLS"] = badURLS
                    checkBadPage = badPage
                }

                // if (badURLS.length != 0) {
                // }

            } // OUTER FOR LOOP

            if (failedPages.length != 0) {
                console.log('bad urls: ' + failedPages)
                throw failedPages;
            }


        })
        it("Check if urls in header and footer are working", async () => {

        })
        it("Do all pages have SSL Certificate", async () => {
        })
        it("Does Custom Method Work?", async () => {
            // await browser.urlWithCustomScripts('/')

            // browser.url('/').then(() => {
            //     console.log("Execute Url")
            // })

            await browser.urlWithCookiesSet('/about/')

            // await browser.setCookiesCustom()
            // await browser.getURLnoWaitUntil('/')
            await browser.debug()
            console.log('Custom Command test complete...')
        })






        xit('Does Page Load', async () => {
            // await browser.url("/")
            await browser.waitUntil(function () {
                const state = browser.execute(function () {
                    return document.readyState;
                });
                //console.log("state:" + state)
                return state === 'complete';
            },
                {
                    timeout: 10000, //10secs
                    timeoutMsg: 'Oops! Check your internet connection'
                });
        })
        xit('Check for Javascript Errors', async () => {
            await browser.url("/")
            let whatever = await browser.waitUntil(async function () {
                // return browser.execute('return window');

                // await browser.url(redirects[0]['Origin'])
                let catchWindowVar = await browser.execute(function () {
                    console.log(window)
                    console.log(window)
                    console.log(window)
                    console.log(window)
                    console.log(window)
                    // return window;
                })
                // .then(function (result) {
                //     console.log(result);
                // });
                console.log(window)
                await browser.debug();

                // browser.execute(function () {
                //     return window;
                // }).then(function (result) {
                //     console.log(result);
                // });

                const state = await browser.execute(function () {
                    // window.onerror = function (error, url, line) {
                    //     console.error('ERR:' + error + ' URL:' + url + ' L:' + line);
                    //     return true;
                    // };

                    console.log("WINDOW");
                    // console.log(window.document);
                    // console.log(window.onerror);
                    browser.debug()

                    return window.document;
                    // return;

                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log(window);
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")
                    console.log("WINDOW")

                    // browser.debug()

                    // return window;
                    // console.log('HELLOOOOOOOOOOOOOOOOOOOOOOO')
                    // console.log('HELLOOOOOOOOOOOOOOOOOOOOOOO')
                    // console.log(window.onerror)
                    // console.log('HELLOOOOOOOOOOOOOOOOOOOOOOO')
                    // console.log('HELLOOOOOOOOOOOOOOOOOOOOOOO')
                    // if (window.onerror) {
                    //     return false;
                    // }
                    return true;
                });
                //console.log("state:" + state)
                // browser.debug();
                console.log("LOOP ONCE")
                return true;
            },
                {
                    timeout: 10000, //10secs
                    timeoutMsg: 'Oops! Check your internet connection'
                });
            // browser.debug();
            console.log(whatever);
            console.log(whatever);
            console.log(whatever);
            console.log(whatever);
            console.log(whatever);
        })




    })

});






// Loop Entire Test (change url hyperlink each time?)

    // Pages
    // Check if all hyperlinks on a page link to production site not staging site.
    // Do all images load and src to something
    // Does page have console.log() errors
    // Does Page have ssl certificate

    // Posts
        // Do all post images load / src to somewhere
        // Do all posts hyperlinks work


        // Attachments / Images
        // Do all images load
        // Do all images go to production site
        // Check for duplicate images?



        // Page Loading tests.
            // Does Page Fully Load within 7 seconds



// 3 Node Applications / Programs

    // Data Sanitization / Delete any extra images being generated.

    // Data getter (Manual)

    // Tests