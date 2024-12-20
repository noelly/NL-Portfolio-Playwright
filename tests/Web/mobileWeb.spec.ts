import { test, devices } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';
import { subMenus } from '../../data/homepageheadersMT.data';

test.use({
  ...devices['iPhone 14 Pro'],
  locale: 'en-US',
})

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test('Homepage mobile - Hero and headers', async ({ page }) => {
  const pm = new PageManager(page);
  await test.step(`Verify hero section`, async () => {
    await pm.homepage().verifyHeroSection();
  });

  await test.step(`Verify hero article`, async () => {
    await pm.homepage().verifyHeroArticle();
  });

  await test.step(`Verify SEO title`, async () => {
    await pm.homepage().verifyPageTitle('MotorTrend: New Cars - Car News and Expert Reviews');
  });

  await test.step(`Verify all headers`, async () => {
    await pm.homepage().verifyAllheaders(subMenus);
  });
});

test('Homepage mobile - Article and River', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().verifyAllarticles();
  await pm.homepage().getRiverArticles(89);
});
