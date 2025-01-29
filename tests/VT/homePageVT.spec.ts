import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.motortrend.com/');
});

test('Visual testing Homepage', async ({ page }, testInfo) => {
  await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot();

  const homeScreenshot = await page.screenshot();
  testInfo.attach('Homepagescreenshot', {
    body: homeScreenshot,
    contentType: 'image/png',
  });
});

