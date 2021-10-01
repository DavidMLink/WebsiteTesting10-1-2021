// Adding Timeout for Debug Scenarios
var timeout = process.env.DEBUG ? 99999999 : 99999999;
const { join } = require('path')
const dotenv = require('dotenv')
// dotenv.config({ path: process.cwd() + '/.env.prod/' })

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'silent',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'https://www.ivwatch.com',

    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['chromedriver'],

    services: [
        ['chromedriver'],
        ['image-comparison',
            {
                baselineFolder: join(process.cwd(), './test/visualRegressionBaseline/'),
                formatImageName: '{tag}',
                screenshotPath: join(process.cwd(), './test/visualRegressionDiff/'),
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
                clearRuntimeFolder: true,
                disableCSSAnimation: true
            }]
    ],

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec'],

    reporters: [['allure', {
        outputDir: 'allure-results',
        // disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        // timeout: 60000
        timeout: timeout,
        // disableMochaHooks: true,
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },


    before: async function (capabilities, specs) {


        browser.addCommand("setCookiesCustom", async function () {
            // set a single cookie
            browser.setCookies({
                name: 'CookieConsent',
                value: '{stamp:%27phEim3k5y7/9st8CQvBifQpofQLlyw3wymhyZ7n/8jjJSZ5miw/9QA==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1628780171191%2Cregion:%27us%27}'
                // The below options are optional
                // path: '/foo', // The cookie path. Defaults to "/"
                // domain: '.example.com', // The domain the cookie is visible to. Defaults to the current browsing context’s active document’s URL domain
                // secure: true, // Whether the cookie is a secure cookie. Defaults to false
                // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
                // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
            })

            browser.execute(() => {
                console.log('Execute Local Storage Cookie')
                localStorage.setItem('CookieConsentBulkSetting-ce15b3a8-25da-499a-8600-ca86068cf427', '{"resetdomains":["bloxdirect.com"],"bulkconsent":{"ticket":"phEim3k5y7/9st8CQvBifQpofQLlyw3wymhyZ7n/8jjJSZ5miw/9QA==","utc":1628780171191,"expireMonths":12,"preferences":true,"statistics":true,"marketing":true},"expireMonths":12,"serial":"ce15b3a8-25da-499a-8600-ca86068cf427"}');
                console.log('Execute Local Storage Cookie')
            })
        })


        browser.addCommand("urlWithCookiesSet", async function (relativePath) {

            browser.url(relativePath);
            // await browser.url(relativePath);

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
                console.log('Execute Local Storage Cookie')
                localStorage.setItem('CookieConsentBulkSetting-ce15b3a8-25da-499a-8600-ca86068cf427', '{"resetdomains":["bloxdirect.com"],"bulkconsent":{"ticket":"phEim3k5y7/9st8CQvBifQpofQLlyw3wymhyZ7n/8jjJSZ5miw/9QA==","utc":1628780171191,"expireMonths":12,"preferences":true,"statistics":true,"marketing":true},"expireMonths":12,"serial":"ce15b3a8-25da-499a-8600-ca86068cf427"}');
                console.log('Execute Local Storage Cookie')
            })

            await browser.url(relativePath);
        })




        browser.addCommand("getURLnoWaitUntil", async function (relativePath) {
            await browser.url(relativePath);

            let completedStatus = await browser.execute(() => {
                return new Promise((resolve, reject) => {
                    var checkStatus = [];

                    console.log('Inside execute function')
                    // NEED LISTENER or a LOOP encasing switch statement...
                    // window.onerror = function (error, url, line) {
                    //     console.log('ERR:' + error + ' URL:' + url + ' L:' + line);
                    // };

                    // window.addEventListener('load', (event) => {
                    //     log.textContent = log.textContent + 'load\n';
                    // });

                    // window.addEventListener('DOMContentLoaded', (event) => {
                    //     console.log('DOM fully loaded and parsed');
                    // });

                    // while(document.readyState != ){

                    // }

                    // getEventListeners(document);

                    // console.log(getEventListeners)


                    document.addEventListener('readystatechange', event => {
                        console.log('AddEventListener Executing!')
                        // console.log(event)
                        switch (event.target.readyState) {
                            case "loading":
                                // The document is still loading.
                                checkStatus.push("Still Loading")
                                console.log("Still Loading!")
                                break;
                            case "interactive":
                                // The document has finished loading. We can now access the DOM elements.
                                // But sub-resources such as images, stylesheets and frames are still loading.
                                checkStatus.push("interactive portion")
                                console.log("interactive portion")
                                break;
                            case "complete":
                                // The page is fully loaded.
                                checkStatus.push("complete portion")
                                console.log("complete portion")
                                console.log("The first CSS rule is: " + document.styleSheets[0].cssRules[0].cssText);
                                console.log(checkStatus)
                                return checkStatus;
                                break;
                            default:
                                console.log('Executing default')
                                console.log(event.target.readyState)
                        }
                    });

                    // console.log(completedStatus)

                    console.log('Inside execute function')
                    console.log(checkStatus)

                    if (checkStatus) {
                        console.log('return from inside execute function')
                        return resolve(checkStatus);
                    }
                }) // Return Execute Promise
            }).then(function (res) {
                if (res.value) {
                    console.log('return from inside waituntil function')
                    console.log('executePromise: ', res.value)
                    return res.value;
                }
                // return res.value;
            }); //End of execute function

        })

        browser.addCommand("urlWithCustomScripts", async function (relativePath) {
            // `this` is return value of $(selector)

            browser.url(relativePath); // DO NOT AWAIT




            // wait until       document.readyStatus == completed.
            let waitUntilPromise = await browser.waitUntil(() => {
                console.log('Inside waitUntil function')
                console.log('Inside waitUntil function alternate')

                return new Promise(async (resolve, reject) => {


                    let completedStatus = await browser.execute(() => {
                        return new Promise((resolve, reject) => {
                            var checkStatus = [];

                            console.log('Inside execute function')
                            // NEED LISTENER or a LOOP encasing switch statement...
                            // window.onerror = function (error, url, line) {
                            //     console.log('ERR:' + error + ' URL:' + url + ' L:' + line);
                            // };

                            // window.addEventListener('load', (event) => {
                            //     log.textContent = log.textContent + 'load\n';
                            // });

                            // window.addEventListener('DOMContentLoaded', (event) => {
                            //     console.log('DOM fully loaded and parsed');
                            // });

                            // while(document.readyState != ){

                            // }

                            // getEventListeners(document);

                            // console.log(getEventListeners)


                            document.addEventListener('readystatechange', event => {
                                console.log('AddEventListener Executing!')
                                // console.log(event)
                                switch (event.target.readyState) {
                                    case "loading":
                                        // The document is still loading.
                                        checkStatus.push("Still Loading")
                                        console.log("Still Loading!")
                                        break;
                                    case "interactive":
                                        // The document has finished loading. We can now access the DOM elements.
                                        // But sub-resources such as images, stylesheets and frames are still loading.
                                        checkStatus.push("interactive portion")
                                        console.log("interactive portion")
                                        break;
                                    case "complete":
                                        // The page is fully loaded.
                                        checkStatus.push("complete portion")
                                        console.log("complete portion")
                                        console.log("The first CSS rule is: " + document.styleSheets[0].cssRules[0].cssText);
                                        console.log(checkStatus)
                                        // return checkStatus;
                                        break;
                                    default:
                                        console.log('Executing default')
                                        console.log(event.target.readyState)
                                }
                                // return checkStatus;
                            });

                            // console.log(completedStatus)

                            console.log('Inside execute function')
                            // console.log(checkStatus)

                            if (checkStatus) {
                                console.log('return from inside execute function')
                                return resolve(checkStatus);
                            }

                            // switch (document.readyState) {
                            //     case "loading":
                            //         // The document is still loading.
                            //         break;
                            //     case "interactive":
                            //         // The document has finished loading. We can now access the DOM elements.
                            //         // But sub-resources such as images, stylesheets and frames are still loading.
                            //         var span = document.createElement("span");
                            //         span.textContent = "A <span> element.";
                            //         document.body.appendChild(span);
                            //         break;
                            //     case "complete":
                            //         // The page is fully loaded.
                            //         console.log("The first CSS rule is: " + document.styleSheets[0].cssRules[0].cssText);
                            //         return true
                            //         break;
                            // }

                        }) // Return Execute Promise
                    }).then(function (res) {
                        if (res.value) {
                            console.log('return from inside waituntil function')
                            console.log('executePromise: ', res.value)
                            return res.value;
                        }
                        // return res.value;
                    }); //End of execute function

                    return resolve(completedStatus);

                }) //Return waitUntil Promise

                // if (outerpromise) {
                //     return true;
                // }

            }, {
                timeout: 200000,
            }).then(function (res) {
                return res.value;
            }); //End of execute function // end of waitUntil

            if (waitUntilPromise) {
                console.log('waitUntilPromise: ', waitUntilPromise) //Console.log
                return;
            }


        }) // End of custom method


    }, //End of before optional / hook


    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },





    // beforeCommand: function (commandName, args) {

    // },





    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: async function (test, context) {
        await browser.maximizeWindow();
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        // setTimeout(() => {
        // }, 7000);
        // await browser.pause(7000)
        // await browser.takeScreenshot();
        if (result) {
        }
        if (error) {
            await browser.takeScreenshot();
        }
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
