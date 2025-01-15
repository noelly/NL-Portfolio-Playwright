import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click();
});

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    //await successButton.click();

    //await successButton.waitFor({ state: "attached"});
    //const text = await successButton.textContent();
    //const text = await successButton.allTextContents();

    //expect(text).toEqual('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});


test('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    //__wait for element
    //await page.waitForSelector('.bg-success');

    //__wait for particular response to be complete
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //__wait for all netwarks calls to be completed (not recommended) / if calls dont complete , test qill stall
    await page.waitForLoadState('networkidle');

    //__wait for timeout 
    await page.waitForTimeout(1000);

    const text = await successButton.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
});

// Timme out in tests

// Global Timeouts ( default: no timeout )  - Time limit for entire for the entire test
// Test timeout ( default: 30000 ms) - Time limit for the single test
// _ Action timeout ( default: no timeout ) - Time limit for the action command ei : click()  fill()
// - Navigation timeout ( default: no timeout ) - Time limit for the action command ei : page.goto("/")
// - Expect timeout ( default: 5000 ms) - Time limit for the expect assertions

// action and navigation timeout are  set under use in the configuration


test('Time outs', async ({ page }) => {
    const successButton = page.locator('.bg-success');

    // overirte config time out
    test.setTimeout(15000);

    // override timeout setings
    await successButton.click({ timeout: 20000 });


    //test.slow can be used for flaky tests or slow tests
    test.slow();

    // to change the timeout for whole suite , add time out insde a before each
    // and will apply to every tests

    // overide expect timeout assertion

    // 
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});