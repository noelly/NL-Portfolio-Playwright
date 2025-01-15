import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.motortrend.com/news');
});

test('Visual test news index', async ({ page }) => {
  await page.waitForTimeout(10000);
  await expect(page).toHaveScreenshot();
});

