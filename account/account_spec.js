/**
 * Created by saranyas on 27-03-2017.
 */
describe('demo app',function() {
    beforeEach(function() {
        browser.get('http://localhost:3006/#/login/');
        it("to test input field", function () {

            element(by.model("login.email")).sendKeys("sarahbecse13@gmail.com");
            element(by.model("login.password")).sendKeys("seyon123");
            element(by.binding("login.email")).getText().then(function (text) {
                element(by.binding("login.password")).getText().then(function (text) {
                    console.log(text);
                    submitButton.click().then(function () {
                        browser.waitForAngular();
                        expect(browser.driver.getCurrentUrl()).toMatch('/success');
                    }, 30000);
                });
            });
        });
    });
    it('to verify page title',function() {
        var list;
        var previousCount;
        beforeEach(function () {
            browser.get('http://localhost:3006/#/accounts');
            list = element.all(by.repeater('account in accounts'));
            list.count().then(function (c) {
                previousCount = c;
                expect(browser.getTitle()).toequal('Accounts');
            });
        });
    });

            it('to verify add account', function () {
                element(by.model('account.name')).sendKeys('IBM');
                //expect(element(by.binding('account.name')).getText()).toEqual('IBM');
                element(by.model('account.revenue')).sendKeys('5');
                //expect(element(by.binding('account.revenue')).getText()).toEqual('5');
                element(by.model('account.employees')).sendKeys('1000');
                //expect(element(by.binding('account.employees')).getText()).toEqual('1000');
                element(by.model('account.website')).sendKeys('www.ibm.co.in');
                //expect(element(by.binding('account.website')).getText()).toEqual('www.ibm.co.in');
                element(by.buttonText('submit')).click();
                expect(list.count()).toEqual(previousCount + 1);

            });
            ít('to verify delete account', function () {
                list.last().element(by.css('.glyphicon-trash')).click();
                expect(list.count()).toEqual(previousCount - 1);
                element(by.model('keyword')).sendKeys('ActionLaser');
                list.last().element(by.css('.glyphicon-trash')).click();
                expect(list.count()).toEqual(previousCount - 2);

            });
            it('it should edit the name field in account', function () {
                element.all(by.repeater("account in accounts")).filter(function (account) {
                    return account.evaluate("account.name").then(function (name) {
                        return name == accountName;
                    });
                }).then(function (accounts) {
                    if (accounts) {  // we have a match - find and click the info button
                        accounts[0].element(by.buttonText("Edit")).click();

                        var inputField, name;
                        name = element(By.id("name.getText"));
                        inputField = element(By.css("input[name='newvalue']"));
                        inputField.clear();
                        inputField.sendKeys("Technosoft");
                        element(By.css("input[name='save_button']")).click();
                        // browser.driver.sleep(2000); This test only works with this sleep added
                        browser.wait(function () {
                            console.log("Waiting for text to change...");
                            return name.getText().then(function (text) {
                                return text === "Technosoft";
                            })
                        });
                    }
                });

                expect(name.getText('value')).toEqual("Technosoft");
            });
        });
