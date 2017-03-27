exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //directConnect: true,

    capabilities: {
        'browserName': 'chrome'
    },

    specs: ['account_spec.js'],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeOutInterval: 30000
    },
    onPrepare: function() {
        browser.driver.manage().timeouts().implicitlyWait(60000);
    }

};
