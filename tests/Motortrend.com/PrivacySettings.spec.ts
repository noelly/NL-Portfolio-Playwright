import { test, devices } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test.use({
  geolocation: { latitude: 48.864716, longitude: 2.349014 },
  permissions: ['geolocation'],
})

test('California - Privacy Settings', async ({ page }) => {
  const pm = new PageManager(page);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pm.homepage().verifyPrivacyPolicy();
});

test.use({
  geolocation: { latitude: 50.9245541, longitude: 5.2435062 },
  permissions: ['geolocation'],
})

test('EU - Privacy Settings ', async ({ page, context }) => {
  const pm = new PageManager(page);
  const coords = { latitude: 50.9245541, longitude: 5.2435062 };
  context.setGeolocation(coords);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pm.homepage().verifyPrivacyPolicy();
});
