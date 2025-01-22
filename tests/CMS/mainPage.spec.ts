import { test } from '@playwright/test';
import { PageManager } from '../../pages/webinyPageManager.Page';

test.describe('Main menu', () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.webinyMain().navigateToCMS();
  });

  test('Navigate to the articles list', async () => {
    await pm.webinyMain().navigateToViewArticles();
  });

  test('Navigate to the article creation page', async () => {
    await pm.webinyMain().navigateToCreateArticle();
  });
});
