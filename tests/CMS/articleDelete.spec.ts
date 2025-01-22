import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';

const author = 'QA Automation'; // Don't use generic words like test // user QA Automation to clean up all test pages from th QA Automation author

test.describe('Article', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
  });

  test('Verify deleting articles', async () => {
    await test.step(`Delete articles by author : ${author}`, async () => {
      await pm.webinyMain().navigateToViewArticles();
      await pm.articleList().cleanupPagesByAuthor(author);
    });
  });
});
