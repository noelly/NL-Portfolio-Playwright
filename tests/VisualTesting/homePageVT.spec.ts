import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.motortrend.com/');
});

test('Visual testing Homepage', async ({ page }) => {
  await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot();
});

