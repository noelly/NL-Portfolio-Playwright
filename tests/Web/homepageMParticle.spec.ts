import { test, expect } from '@playwright/test';

test('Verify MParticle call is triggered for Motortrend', async ({ page }) => {
  await page.route(/mparticle.com\/*\/.*/, async (route, request) => {
    console.log('Request URL:', request.url());
    await route.continue();
  });

  await page.goto('https://www.motortrend.com/');


  page.on('response', async (response) => {
    if (response.url() === 'https://jssdks.mparticle.com/v3/JS/*/events') {
      const data = await response.json();
      expect(await data).toBeDefined();
      // Add more assertions as needed
    }
  });
});
