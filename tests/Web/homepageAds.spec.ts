import { test } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test('Homepage - Verify all ads', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.adsPage().scrollThroughAllAds();
  await pm.adsPage().verifyAllAds(12);
  await pm.adsPage().VerifyAdsIDs(12);
});
