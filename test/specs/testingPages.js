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

// urlsToLoop = deleteBaseUrl(urlsToLoop)












// urlsToLoop.forEach((url) => {

describe('All Page Testing', async () => {

    // console.log(urlsToLoop)

    // i = 0;

    // beforeEach(async function () {
    //     //create database objects

    //     // console.log(url)

    //     console.log('Execute this before each Test!')

    //     await browser.urlWithCookiesSet(url);
    //     // i += 1;
    // });



    it.only("Check to see if Header is 'jacked' up for Pages", async () => {

        let failedPages = [];

        for (let i = 0; i < urlsToLoop.length; i++) {
            await browser.urlWithCookiesSet(urlsToLoop[i]);

            // browser.pause('3000')

            let Header = await $$('header');

            if (Header) {
                // Save an element
                await browser.saveElement($('header'), 'headerElement', {});
                // Check an element
                let checkedElement = await browser.checkElement(await $('header'), 'headerElement', {
                    ignoreAntialiasing: true,

                })
                // Test Element
                // await expect(checkedElement).toEqual(0);
                if (checkedElement != 0) {
                    console.log(`Should be zero. Score is: ${checkedElement}`)
                    failedPages.push(urlsToLoop[i]);
                }
            }
        }
        // Out Of URL LOOP
        if (failedPages.length != 0) {
            console.log('bad pages: ', failedPages)
            // failedPages = JSON.stringify(failedPages, null, '4');
            failedPages = JSON.stringify(failedPages, null, '    ');
            console.log(failedPages)
            expectchai(failedPages, `These Pages Have Broken URLS: ${failedPages}`).to.be.empty;
        }
    })






    // console.log(url)

    it("Testing Stuff", async () => {
        urlsToLoop.forEach(async (url) => {
            await browser.urlWithCookiesSet(url);




            console.log('is this even running?')

            // await browser.urlWithCookiesSet('/about/')

            console.log(await browser.getUrl())

            // await browser.debug()




        })
    })

    // Checking for staging urls on production site on every page minus header/footer.
    it("Do all Page's hyperlinks work and load production site url", async () => {

        let badURLS = [];
        let failedPages = [];
        let badPage = 0;
        let checkBadPage = 0;

        for (let i = 0; i < urlsToLoop.length; i++) {
            // console.log('foreach')
            await browser.urlWithCookiesSet(urlsToLoop[i]);

            // Select all urls except header + footer
            let noHeaderFooter = await $$('a:not(header a):not(footer a)');



            // console.log(noHeaderFooter)
            // Select all urls
            // let anchorList = await $$('a');

            let oneAnchor;



            // Iterate through urls

            for (let i = 0; i < noHeaderFooter.length; i++) {
                oneAnchor = await browser.getElementAttribute(noHeaderFooter[i]['elementId'], 'href')
                // console.log('OneAnchor: ', oneAnchor)
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
                    // console.log('evil hyperlink', oneAnchor)
                    badURLS.push(oneAnchor);

                    badPage += 1;
                    // return true;
                }
            }
            //IN ForEach LOOP
            if (checkBadPage != badPage) {
                console.log('BAD PAGE DETECTED')
                failedPages.push({
                    "WebPage": urlsToLoop[i],
                    "badURLS": badURLS
                })
                // failedPages[badPage - 1]["WebPage"] = urlsToLoop[i] // Add Failed Pages to Dictionary
                // failedPages[badPage - 1]["badURLS"] = badURLS // Add the Evil Urls caught on Failed Pages
                checkBadPage = badPage // make the checkBadPage = to accumlator of badPages
            }
        }
        // Out Of ForEach LOOP
        if (failedPages.length != 0) {
            console.log('bad urls: ', failedPages)
            // failedPages = JSON.stringify(failedPages, null, '4');
            failedPages = JSON.stringify(failedPages, null, '    ');
            console.log(failedPages)
            expectchai(failedPages, `These Pages Have Broken URLS: ${failedPages}`).to.be.empty;
        }
    })
    it("Check if urls in header and footer are working", async () => {

        let badURLS = [];
        let failedPages = [];
        let badPage = 0;
        let checkBadPage = 0;

        for (let i = 0; i < urlsToLoop.length; i++) {
            await browser.urlWithCookiesSet(urlsToLoop[i]);


            // Select all urls except header + footer
            // let Header = await $$('header');
            // let Header = await browser.findElements('tag name', 'header');
            let Header = await $$('header a');
            // console.log(Header)
            // console.log(Header.length)
            let Footer = await $$('footer a');
            // console.log(Footer.length)
            // console.log(Footer)
            // let combinedLength = Header.length + Footer.length;
            let bothHeaderFooter = []
            for (let i = 0; i < Header.length; i++) {
                bothHeaderFooter.push(Header[i])
            }
            // console.log(bothHeaderFooter)
            for (let i = 0; i < Footer.length; i++) {
                bothHeaderFooter.push(Footer[i])
            }
            // console.log(bothHeaderFooter)




            let oneAnchor;
            // console.log(Header)
            for (let i = 0; i < bothHeaderFooter.length; i++) {
                oneAnchor = await browser.getElementAttribute(bothHeaderFooter[i]['elementId'], 'href')
                // console.log('OneAnchor: ', oneAnchor)
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
                    // console.log('evil hyperlink', oneAnchor)
                    badURLS.push(oneAnchor);

                    badPage += 1;
                    // return true;
                }
            }
            //IN URL LOOP
            if (checkBadPage != badPage) {
                console.log('BAD PAGE DETECTED')
                failedPages.push({
                    "WebPage": urlsToLoop[i],
                    "badURLS": badURLS
                })
                // failedPages[badPage - 1]["WebPage"] = urlsToLoop[i] // Add Failed Pages to Dictionary
                // failedPages[badPage - 1]["badURLS"] = badURLS // Add the Evil Urls caught on Failed Pages
                checkBadPage = badPage // make the checkBadPage = to accumlator of badPages
            }
        }
        // Out Of URL LOOP
        if (failedPages.length != 0) {
            console.log('bad urls: ', failedPages)
            // failedPages = JSON.stringify(failedPages, null, '4');
            failedPages = JSON.stringify(failedPages, null, '    ');
            console.log(failedPages)
            expectchai(failedPages, `These Pages Have Broken URLS: ${failedPages}`).to.be.empty;
        }
    })
    xit("Take Necessary Screenshots", async () => {

    })

    it("Check to see if Footer is 'jacked' up", async () => {

        // before(async () => {
        //     await browser.emulateDevice({
        //         viewport: {
        //             width: 1440,
        //             height: 900
        //         },
        //         // userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
        //     })
        //     await browser.setWindowSize('400', '400')
        // })


        // await browser.debug()



        let failedPages = [];

        for (let i = 0; i < urlsToLoop.length; i++) {
            await browser.urlWithCookiesSet(urlsToLoop[i]);

            browser.pause('5000')

            let Footer = await $('footer');

            await Footer.scrollIntoView()

            browser.pause('3000')

            // await $('footer').waitForDisplayed({ timeout: 10000 })


            if (Footer) {
                // Save an element
                let savedElement = await browser.saveElement(Footer, 'footerElementWork', {});
                console.log(savedElement);
                // Check an element
                let checkedElement = await browser.checkElement(await $('footer'), 'footerElementWork', {
                    ignoreAntialiasing: true,

                })
                // Test Element
                // await expect(checkedElement).toEqual(0);
                if (checkedElement != 0) {
                    console.log(`Should be zero. Score is: ${checkedElement}`)
                    failedPages.push(urlsToLoop[i]);
                }
            }
        }
        // Out Of URL LOOP
        if (failedPages.length != 0) {
            console.log('bad pages: ', failedPages)
            // failedPages = JSON.stringify(failedPages, null, '4');
            failedPages = JSON.stringify(failedPages, null, '    ');
            console.log(failedPages)
            expectchai(failedPages, `These Pages Have Broken URLS: ${failedPages}`).to.be.empty;
        }
    })
    xit("Do all pages have SSL Certificates", async () => {
        let failedPages = [];

        for (let i = 0; i < urlsToLoop.length; i++) {
            await browser.urlWithCookiesSet(urlsToLoop[i]);

            let baseURL = await browser.getUrl()
            if (!(baseURL.startsWith('https'))) {
                failedPages.push(baseURL);
            }
        }
        failedPages = JSON.stringify(failedPages, null, '    ');
        console.log(failedPages)
        expectchai(failedPages, `These Pages Have Broken URLS: ${failedPages}`).to.be.empty;
    })
    xit("Does Custom Method Work?", async () => {
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






    it('Does Page Load', async () => {

        for (let i = 0; i < urlsToLoop.length; i++) {
            await browser.urlWithCookiesSet(urlsToLoop[i]);
            let baseURL = await browser.getUrl()

            let waited = await browser.waitUntil(async function () {
                let state = await browser.execute(function () {
                    return document.readyState;
                });
                //console.log("state:" + state)
                if (state === 'complete') {
                    return true;
                }
            },
                {
                    timeout: 10000, //10secs
                    timeoutMsg: `${baseURL} Took More Than 10 seconds to load...`
                });
            console.log(waited)
            expectchai(waited).to.be.true;
        }
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

// });






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




// New Test Check for Regular Expression Permalink Structure