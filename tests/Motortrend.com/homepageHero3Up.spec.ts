import { test } from '@playwright/test'
import { PageManager } from '../../pages/pageManager.Page';

test.beforeEach(async ({ page }) => {
  const pm = new PageManager(page);
  await pm.homepage().navigateTo();
  await pm.accessDeniedPage().isAccessDenied("Motortrend");
});

test('Homepage - Hero 3 up section', async ({ page }) => {
  const pm = new PageManager(page);
  await test.step(`Verify hero3up section`, async () => {
    await pm.homepage().verifyHero3UpSection();
    await pm.homepage().verifyHero3UpURls();
  });

  await test.step(`select hero artcile and verify the article`, async () => {
    await pm.homepage().selectHeroArticle();
  })
});
