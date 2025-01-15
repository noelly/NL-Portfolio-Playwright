import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.motortrend.com/');
});

test('Visual tes Homepage', async ({ page }) => {
  await page.waitForTimeout(10000);
  await expect(page).toHaveScreenshot();
});
