import { test, expect } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test('Verify Homepage hero section', async ({ page }) => {
  const pm = new PageManager(page);
  await test.step(`Verify homepage hero section`, async () => {
    await pm.homepage().verifyHeroSection();
  });

  await test.step(`Verify homepage hero article section`, async () => {
    await pm.homepage().verifyHeroArticle();
  });

  await test.step(`Verify homepage title`, async () => {
    await pm.homepage().verifyPageTitle('MotorTrend: New Cars - Car News and Expert Reviews');
  });
});
