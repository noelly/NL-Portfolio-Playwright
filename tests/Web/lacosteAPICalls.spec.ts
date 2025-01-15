import { test } from '@playwright/test'

test('log the network apis for Lacoste', async ({ page }) => {
  // Intercept network requests
  await page.route(/.*\/api\/.*/, async (route, request) => {
    console.log('Request URL:', request.url());
    await route.continue();
  });
  await page.goto('https://www.lacoste.com/');
})


test('log the network apis for CNN', async ({ page }) => {
  // Intercept network requests
  await page.route(/.*\/*\/.*/, async (route, request) => {
    console.log('Request URL:', request.url());
    await route.continue();
  });
  await page.goto('https://www.cnn.com/');
})
