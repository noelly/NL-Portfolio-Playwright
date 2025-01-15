import { test, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 14 Pro'],
  locale: 'en-US',
})

test.beforeEach(async ({ page }) => {
  await page.goto('https://motortrend.com');
});

test('Mobile Web', async ({ page }) => {
  await page.goto('https://motortrend.com');

  await page.screenshot({ path: 'MT_Mobile_web.png' });
});
