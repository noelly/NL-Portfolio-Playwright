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
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const DoNotSell = await page.getByText('Do Not Sell or Share My Personal Information').first();

  if (await DoNotSell.isVisible()) {
    await DoNotSell.click();
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'GeolocationA.png' });
});


test('GDPR - privacy Settings EU', async ({ page, context }) => {
  const coords = { latitude: 50.9245541, longitude: 5.2435062 };
  context.setGeolocation(coords);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const DoNotSell = await page.getByText('Do Not Sell or Share My Personal Information').first();
  if (await DoNotSell.isVisible()) {
    await DoNotSell.click();
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'GeolocationB.png' });
});