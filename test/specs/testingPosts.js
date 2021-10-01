const fs = require("fs");
const expectchai = require('chai').expect

try {
    const jsonString = fs.readFileSync('data/posts/ivWatchPosts.json');
    // const jsonString = fs.readFileSync('ivWatch.json');
    var ivwatchPosts = JSON.parse(jsonString);
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


let stripedJSON = stripValuesJSON(ivwatchPosts, 'Title')

let urlsToLoop = json2array(stripedJSON, 'URLs')

urlsToLoop = deleteBaseUrl(urlsToLoop)


describe('All Post Testing', async () => {

    it.only("Check to see if Header is 'jacked' up for Posts", async () => {

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









    it("Check to see if Footer is 'jacked' up", async () => {

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
                await browser.saveElement(Footer, 'footerElement', {});
                // Check an element
                let checkedElement = await browser.checkElement(await $('footer'), 'footerElement', {
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

})