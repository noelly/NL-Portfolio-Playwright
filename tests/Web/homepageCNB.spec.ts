import { test } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateToCNB();
});

test('Homepage - CNB', async ({ page }) => {
  const pm = new PageManager(page);
  await test.step(`Verify SEO title`, async () => {
    await pm.homepage().verifyPageTitle('Banking, Lending, Wealth Planning & More | City National Bank');
  });
});
