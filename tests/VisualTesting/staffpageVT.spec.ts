import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.motortrend.com/staff');
});

test('Visual test news index', async ({ page }) => {
  await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot();
});
