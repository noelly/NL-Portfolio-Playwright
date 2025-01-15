import { test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://motortrend.com/video-hub');
});
test('geolocation', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByText('Do Not Sell or Share My Personal Information').click();
    await page.screenshot({ path: 'GeolocationA.png' });
});

test.use({
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ['geolocation'],
})

test('geolocationB', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByText('Do Not Sell or Share My Personal Information').click();
    await page.screenshot({ path: 'GeolocationB.png' });
});
